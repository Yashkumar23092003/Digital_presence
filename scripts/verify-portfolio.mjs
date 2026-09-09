import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { chromium, expect } from "@playwright/test";

const url = process.env.PREVIEW_URL || "http://127.0.0.1:8080";
const output = join(tmpdir(), "yash-portfolio-review");
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const errors = [];
try {
  const context = await browser.newContext({
    permissions: ["clipboard-read", "clipboard-write"],
  });
  const page = await context.newPage();
  page.on("pageerror", (error) => errors.push(error.message));

  for (const [width, height] of [
    [1440, 1000],
    [1920, 1080],
    [768, 1024],
    [390, 844],
    [320, 740],
  ]) {
    await page.setViewportSize({ width, height });
    await page.goto(url, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Yash Kumar.",
    );
    assert.equal(await page.locator(".work-item").count(), 6);
    await expect(page.locator(".experience-row").first()).toContainText(
      "Superb Capital",
    );
    await expect(page.locator(".experience-row").first()).toContainText(
      "Investment Analyst",
    );
    await expect(
      page.locator(".work-company").filter({ hasText: /^Superb Capital$/ }),
    ).toHaveCount(3);
    const overflow = await page.evaluate(() => ({
      page: document.documentElement.scrollWidth > window.innerWidth,
      elements: Array.from(
        document.querySelectorAll(
          "main h1, main h2, main h3, main p, main button, .email-row, .work-item",
        ),
      )
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return (
            !el.classList.contains("sr-only") &&
            r.width > 0 &&
            (r.right > window.innerWidth + 1 ||
              r.left < -1 ||
              el.scrollWidth > el.clientWidth + 2)
          );
        })
        .map((el) => el.textContent.slice(0, 70)),
    }));
    assert.equal(overflow.page, false, `Page overflow at ${width}`);
    assert.deepEqual(overflow.elements, [], `Element overflow at ${width}`);
    await page.locator(".about-photo img").scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        page
          .locator("img")
          .evaluateAll((imgs) =>
            imgs.every((img) => img.complete && img.naturalWidth > 0),
          ),
      )
      .toBe(true);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({ path: join(output, `viewport-${width}.png`) });
    await page.screenshot({
      path: join(output, `portfolio-${width}.png`),
      fullPage: true,
    });
    await page
      .getByRole("button", { name: /Read case study:/ })
      .first()
      .click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.evaluate(() =>
      Promise.all(
        document
          .getAnimations()
          .map((animation) => animation.finished.catch(() => {})),
      ),
    );
    const dialog = await page.getByRole("dialog").boundingBox();
    assert.ok(
      dialog.x >= 0 && dialog.x + dialog.width <= width + 1,
      `Dialog width at ${width}`,
    );
    assert.ok(
      dialog.y >= 0 && dialog.y + dialog.height <= height + 1,
      `Dialog height at ${width}`,
    );
    await page.screenshot({ path: join(output, `case-${width}.png`) });
    await page.getByRole("button", { name: "Close", exact: true }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
    if (width < 761) {
      await page.getByRole("button", { name: "Open navigation" }).click();
      await expect(
        page.getByRole("navigation", { name: "Mobile navigation" }),
      ).toBeVisible();
      await page
        .getByRole("navigation", { name: "Mobile navigation" })
        .getByRole("link", { name: "Experience" })
        .click();
      await expect(
        page.getByRole("navigation", { name: "Mobile navigation" }),
      ).toHaveCount(0);
      assert.equal(new URL(page.url()).hash, "#experience");
    }
    console.log(
      `PASS ${width}x${height}: content, images, overflow, dialog${width < 761 ? ", mobile navigation" : ""}`,
    );
  }

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(url);
  for (const category of [
    "Company building",
    "Research & investment support",
    "Community",
  ]) {
    const filter = page.getByRole("button", {
      name: new RegExp(`^${category}`),
    });
    await filter.click();
    await expect(filter).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".work-item")).toHaveCount(2);
    for (const label of await page
      .locator(".work-meta > span:first-child")
      .allTextContents())
      assert.equal(label, category);
  }
  await page.getByRole("button", { name: /^All work/ }).click();
  await expect(page.locator(".work-item")).toHaveCount(6);
  for (const trigger of await page
    .getByRole("button", { name: /Read case study:/ })
    .all()) {
    await trigger.click();
    await expect(
      page.getByRole("dialog").getByRole("heading", { name: "What I owned" }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
  }
  const resume = await context.request.get(`${url}/pdf/Yash_Kumar_IITD.pdf`);
  assert.equal(resume.status(), 200);
  assert.ok(resume.headers()["content-type"].includes("application/pdf"));
  assert.equal((await resume.body()).subarray(0, 4).toString(), "%PDF");
  await page.getByRole("button", { name: "Copy email address" }).click();
  await expect(
    page.getByRole("button", { name: "Email copied" }),
  ).toBeVisible();
  assert.equal(
    await page.evaluate(() => navigator.clipboard.readText()),
    "yash9704.iitd@gmail.com",
  );
  for (const href of await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links
        .map((link) => link.getAttribute("href"))
        .filter((href) => href !== "#"),
    )) {
    assert.equal(await page.locator(href).count(), 1, `Anchor target ${href}`);
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  assert.equal(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
    "auto",
  );
  assert.deepEqual(errors, [], "Browser runtime errors");
  console.log(
    "PASS filters, all case studies, keyboard focus, resume PDF, copy email, anchors, reduced motion; no runtime errors",
  );
  console.log(`Screenshots: ${output}`);
} finally {
  await browser.close();
}

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { trackSpotlight } from "@/lib/spotlight";

type OwnedItem = {
  title: string;
  problem: string;
  action: string;
  outcome: string;
  signal: string;
};

type CompanyBlock = {
  company: string;
  focus: string;
  period: string;
  location: string;
  tags: string[];
  items: OwnedItem[];
};

const experiences: CompanyBlock[] = [
  {
    company: "Superb Realty",
    focus: "Founder's Office · Product & Tech",
    period: "Aug 2025 - Present",
    location: "Mumbai",
    tags: ["AI", "Full-Stack", "0->1"],
    items: [
      {
        title: "Superb OS & Superb Genie",
        problem:
          "The org had no system to track team performance. Decisions were gut-driven with no real-time visibility into what was actually working.",
        action:
          "Scoped the need myself, designed the product logic, and built two internal platforms - Superb OS and Superb Genie - end-to-end with no spec and no PM above me.",
        outcome: "Real-time performance monitoring embedded into daily operations across the org.",
        signal:
          "0->1 product ownership inside a founder's office - defined the problem, built the system, shipped it.",
      },
      {
        title: "AI Deck -> One-Pager Tool",
        problem:
          "The investment team was spending hours manually reading startup decks with no consistent format or way to compare quickly.",
        action:
          "Spotted the gap without being asked. Designed and built an AI-powered tool that parses raw startup decks and outputs structured one-pager summaries.",
        outcome: "Reduced deck analysis time by 50%.",
        signal:
          "Self-initiated product thinking - no brief, no ask. Saw the inefficiency, owned the build, delivered measurable ROI.",
      },
      {
        title: "AI-Driven Market Research",
        problem:
          "Marketing was spending without targeting precision. No clear picture of who the highest-value customer segments were.",
        action:
          "Owned the full research loop - defined the brief, ran AI-assisted synthesis, segmented the market - and surfaced 3 high-potential customer profiles.",
        outcome: "20% increase in quality leads from campaigns that followed.",
        signal:
          "Strategy and execution in one person - didn't just hand off a report, drove it from question to outcome.",
      },
      {
        title: "Enterprise Vendor Evaluation",
        problem:
          "No procurement framework existed. The team was evaluating tools ad hoc with no scoring system, wasting time and money.",
        action:
          "Built the evaluation framework from scratch, ran calls across 10+ enterprise vendors, and made the final recommendation.",
        outcome: "Rs6L saved annually.",
        signal:
          "Chief-of-staff thinking - operated on a problem no one assigned me, delivered a decision the founder could act on.",
      },
    ],
  },
  {
    company: "Homescanner.ai",
    focus: "Co-founder",
    period: "Dec 2024 - Aug 2025",
    location: "IIT Delhi",
    tags: ["PropTech", "AI Agent", "NLP"],
    items: [
      {
        title: "AI Agent for Home Discovery",
        problem:
          "Home search was time-consuming and fragmented - users couldn't find relevant homes efficiently and dropped off before shortlisting.",
        action:
          "Designed and built an AI agent using NLP to surface personalised, high-relevance listings - translating discovery friction into an automated matching layer.",
        outcome: "Reduced home discovery time by 70%.",
        signal:
          "Took a user problem and turned it into a shipped AI feature - owned the NLP design and the product decision as co-founder.",
      },
      {
        title: "Engagement via User Research & A/B Testing",
        problem:
          "Engagement was low despite a functional product - users weren't discovering value fast enough to stick.",
        action:
          "Ran 150+ user interviews to surface the root causes of low engagement, then designed and executed A/B tests to validate solutions before committing to any direction.",
        outcome: "Boosted engagement by 25%.",
        signal:
          "Product thinking grounded in evidence - didn't guess, ran the tests, and let data drive the calls.",
      },
      {
        title: "Roadmap, Team & KPI Ownership",
        problem:
          "A 7-member cross-functional team across design and engineering had no formal PM layer, no shared definition of success, and no structured communication cadence.",
        action:
          "Owned the 6-month agile roadmap end-to-end, led sprint cycles for the full team, defined product KPIs (activation, shortlist rate), and ran weekly structured updates to keep business, design, and tech aligned.",
        outcome:
          "Live product reaching 10,000+ users and Rs40K in early revenue - shipped with full cross-functional alignment throughout.",
        signal:
          "Ran the operating rhythm of the company - roadmap, metrics, and communication all owned by one person.",
      },
    ],
  },
  {
    company: "Zeko AI",
    focus: "Product Management Intern",
    period: "May 2024 - Jul 2024",
    location: "Noida",
    tags: ["HR-Tech", "AI/ML", "JIRA"],
    items: [
      {
        title: "Prompt Engineering for Production",
        problem:
          "The product relied on LLMs but outputs were inconsistent and unreliable - no structured approach to prompt engineering existed.",
        action:
          "Engineered prompts across 5+ production use cases including auto-report generation and resume grading. Iterated with engineering to stabilise outputs for live users.",
        outcome: "5+ AI-powered features shipped to production with reliable outputs.",
        signal:
          "Product thinking applied to AI - understood that prompts are a product surface, not just a dev task.",
      },
      {
        title: "Product Bug Triage System",
        problem:
          "60+ product issues were piling up without clear ownership or severity mapping - no structured triage process existed.",
        action:
          "Audited the product end-to-end, documented all issues, built a priority matrix with design and dev, and drove resolution cycles.",
        outcome: "60+ product issues systematically mapped, prioritised, and routed to the right owners.",
        signal:
          "Operated as a PM who owned quality - not just finding bugs but building the system to fix them.",
      },
    ],
  },
  {
    company: "ZenMind",
    focus: "Founder & CEO",
    period: "May 2023 - Jan 2024",
    location: "IIT Delhi",
    tags: ["Mental Health", "AI Companion", "Hackathon Winner"],
    items: [
      {
        title: "AI Companion for College Mental Health",
        problem:
          "Rising college suicides with no accessible, stigma-free support available outside counselling hours - the existing system wasn't reaching students in time.",
        action:
          "Researched the root causes of the college mental health crisis, then built an AI companion designed to enhance counselling system effectiveness and provide 24/7 support when counsellors weren't available.",
        outcome: "Top 100 of Samsung Solve for Tomorrow. Top 25 of 1,000+ teams at IIT Delhi FITT.",
        signal:
          "Problem-first founder - started with a documented crisis, not an idea, and built toward a real structural gap.",
      },
      {
        title: "MVP Validation with Licensed Counselors",
        problem:
          "No evidence that licensed counsellors would trust or adopt an AI tool in their practice - without clinical buy-in, the product had no credibility.",
        action:
          "Onboarded 8+ licensed counsellors onto the platform and conducted 25+ interactive counselling sessions to validate the product in a real clinical context with domain experts.",
        outcome: "Live MVP validated by licensed professionals - not just users, but the hardest critics in the room.",
        signal:
          "Went to the most demanding validators first - if counsellors trusted it, the market would follow.",
      },
      {
        title: "Market Research & Competitive Positioning",
        problem:
          "No clear picture of where the product sat in the market or whether demand was real enough to justify continued building.",
        action:
          "Conducted structured market research and competitor analysis to map the landscape, validate demand, and refine MVP positioning before scaling.",
        outcome:
          "Clear, evidence-backed positioning with validated demand - entered hackathons and pitches with a defensible market narrative.",
        signal:
          "PM discipline from day one - treated positioning as a product decision, not an afterthought.",
      },
    ],
  },
];

const ExperienceTimeline = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 55%"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
  <section className="px-6 py-24" id="experience">
    <div className="mx-auto max-w-6xl">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20 text-center font-syne text-4xl font-bold md:text-5xl"
      >
        Where I've <span className="text-primary">Operated</span>
      </motion.h2>

      <div ref={timelineRef} className="relative">
        <div className="absolute bottom-0 left-0 top-0 hidden w-px bg-border/70 md:block" />
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute bottom-0 left-0 top-0 hidden w-px origin-top bg-gradient-to-b from-primary via-primary/70 to-primary/25 shadow-[0_0_10px_hsl(var(--primary)/0.5)] md:block"
        />

        <div className="space-y-12 md:pl-10">
          {experiences.map((exp, i) => (
            <motion.article
              key={exp.company}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              onMouseMove={trackSpotlight}
              className="spotlight-card relative rounded-lg border border-border bg-card/70 p-6 shadow-2xl shadow-black/20 backdrop-blur-sm md:p-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ type: "spring", stiffness: 320, damping: 16, delay: 0.2 + i * 0.08 }}
                className="absolute -left-[47px] top-9 hidden h-3.5 w-3.5 rounded-full border-2 border-background bg-primary shadow-[0_0_14px_hsl(var(--primary)/0.9)] md:block"
              />

              <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/50" />
                    <h3 className="font-syne text-2xl font-bold text-foreground">
                      {exp.company}
                    </h3>
                  </div>
                  <p className="font-mono text-sm font-medium text-primary">{exp.focus}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    {exp.period} - {exp.location}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 md:justify-end">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-primary/25 bg-primary/5 px-3 py-1.5 font-mono text-xs text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.36em] text-muted-foreground/60">
                Work I Owned
              </p>

              <Accordion type="single" collapsible className="space-y-4">
                {exp.items.map((item, index) => (
                  <AccordionItem
                    key={item.title}
                    value={`${exp.company}-${index}`}
                    className="overflow-hidden rounded-lg border border-border/90 bg-background/25"
                  >
                    <AccordionTrigger className="px-5 py-4 font-mono text-sm font-semibold text-foreground/85 hover:no-underline">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="px-0 pb-0 pt-0">
                      <div className="space-y-7 border-t border-border px-5 py-5">
                        <div>
                          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.42em] text-muted-foreground/55">
                            Problem
                          </p>
                          <p className="max-w-4xl font-mono text-sm leading-7 text-muted-foreground">
                            {item.problem}
                          </p>
                        </div>

                        <div>
                          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.42em] text-muted-foreground/55">
                            Action
                          </p>
                          <p className="max-w-4xl font-mono text-sm leading-7 text-muted-foreground">
                            {item.action}
                          </p>
                        </div>

                        <div>
                          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.42em] text-primary">
                            Outcome
                          </p>
                          <p className="max-w-4xl font-mono text-sm font-medium leading-7 text-foreground/90">
                            {item.outcome}
                          </p>
                        </div>

                        <div className="rounded-md border border-primary/25 bg-primary/5 p-4">
                          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.42em] text-primary">
                            Signal
                          </p>
                          <p className="font-mono text-sm font-medium leading-7 text-primary">
                            {item.signal}
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  </section>
  );
};

export default ExperienceTimeline;

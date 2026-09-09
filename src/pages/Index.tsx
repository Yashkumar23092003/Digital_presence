import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  FileText,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  categories,
  experience,
  profile,
  work,
  type Category,
  type Work,
} from "@/data/portfolio";
import portrait from "@/logo/Yash.png";
import iitLogo from "@/logo/IITD.png";

function WorkCard({ item, index }: { item: Work; index: number }) {
  return (
    <article className="work-item">
      <div className="work-meta">
        <span>{item.category}</span>
        <span className="work-number">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <p className="work-company">{item.company}</p>
      <h3>{item.title}</h3>
      <p className="work-summary">{item.summary}</p>
      <div className="work-bottom">
        <div>
          <strong>{item.metric}</strong>
          <span>{item.metricLabel}</span>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <button
              className="case-link"
              aria-label={`Read case study: ${item.title}`}
            >
              Read the story <ArrowUpRight size={16} />
            </button>
          </DialogTrigger>
          <DialogContent className="case-dialog">
            <p className="eyebrow">{item.category}</p>
            <DialogTitle className="case-title">{item.title}</DialogTitle>
            <DialogDescription className="case-description">
              {item.company} / {item.role}
              <br />
              {item.period}
            </DialogDescription>
            <div className="case-section">
              <h3>The context</h3>
              <p>{item.context}</p>
            </div>
            <div className="case-section">
              <h3>What I owned</h3>
              <ul>
                {item.actions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
            </div>
            <div className="case-result">
              <h3>The outcome</h3>
              <p>{item.result}</p>
            </div>
            <div className="case-actions">
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-link"
                >
                  {item.linkLabel} <ArrowUpRight size={16} />
                </a>
              )}
              <a
                href={`mailto:${profile.email}?subject=${encodeURIComponent(`Let's talk about ${item.company}`)}`}
                className="text-link"
              >
                Discuss this work <Mail size={16} />
              </a>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </article>
  );
}

export default function Index() {
  const [category, setCategory] = useState<Category>("All work");
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const filtered = work.filter(
    (item) => category === "All work" || item.category === category,
  );

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2500);
    return () => window.clearTimeout(timer);
  }, [copied]);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [menuOpen]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setCopyFailed(false);
    } catch {
      setCopyFailed(true);
    }
  };

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="shell header-inner">
          <a className="wordmark" href="#" aria-label="Yash Kumar, home">
            yk<span>.</span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#work">Selected work</a>
            <a href="#experience">Experience</a>
            <a href="#about">About</a>
          </nav>
          <div className="header-actions">
            <a className="header-contact" href={`mailto:${profile.email}`}>
              Let's talk <ArrowUpRight size={16} />
            </a>
            <button
              className="menu-toggle"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav
            id="mobile-nav"
            className="mobile-nav shell"
            aria-label="Mobile navigation"
          >
            {[
              ["#work", "Selected work"],
              ["#experience", "Experience"],
              ["#about", "About"],
              ["#contact", "Contact"],
            ].map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                {label}
                <ArrowUpRight size={16} />
              </a>
            ))}
          </nav>
        )}
      </header>

      <main id="main">
        <section className="intro shell" aria-labelledby="intro-title">
          <div className="intro-top">
            <div className="intro-identity">
              <img src={portrait} alt="Yash Kumar" width="56" height="56" />
              <p>
                Investment Analyst
                <br />
                <span>Superb Capital / IIT Delhi</span>
              </p>
            </div>
            <p className="availability">
              <span />
              Open to opportunities in venture
            </p>
          </div>
          <h1 id="intro-title">
            Yash Kumar<span className="name-period">.</span>
          </h1>
          <div className="intro-bottom">
            <div>
              <h2>
                A founder's perspective.
                <br />
                An operator's follow-through.
              </h2>
              <p className="intro-copy">
                At Superb Capital, I evaluate startups, work with portfolio
                founders, and build investment tools. I bring a builder's
                perspective from co-founding Homescanner and working in the
                Founder's Office at Superb Realty.
              </p>
              <div className="intro-actions">
                <a className="button button-dark" href="#work">
                  Explore my work <ArrowDown size={16} />
                </a>
                <a
                  className="button button-outline"
                  href={profile.resume}
                  target="_blank"
                  rel="noreferrer"
                >
                  View resume <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
            <div className="intro-note">
              <span className="eyebrow">Where I add value</span>
              <p>
                Founder support & execution
                <br />
                Investment research & deal support
                <br />
                Founder programs & community
              </p>
              <span className="location">Mumbai-based / Flexible on location</span>
            </div>
          </div>
        </section>

        <div className="proof-band">
          <div className="shell proof-grid">
            <div className="proof-education">
              <img src={iitLogo} alt="" width="36" height="36" />
              <div>
                <strong>IIT Delhi</strong>
                <span>B.Tech + Minor in Entrepreneurship</span>
              </div>
            </div>
            <div>
              <strong>15+ startups</strong>
              <span>Evaluated at Superb Capital</span>
            </div>
            <div>
              <strong>10+ founders</strong>
              <span>Portfolio relationships re-engaged</span>
            </div>
            <div>
              <strong>7-person team</strong>
              <span>Led at Homescanner.ai</span>
            </div>
          </div>
        </div>

        <section id="work" className="section shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span className="section-index">01 /</span> Selected work
              </p>
              <h2>Ownership, in practice.</h2>
            </div>
            <p>
              From the first question to the work that follows.
              <br className="desktop-break" /> A selection of problems I've
              taken on.
            </p>
          </div>
          <div
            className="work-filters"
            role="group"
            aria-label="Filter selected work"
          >
            {categories.map((value) => (
              <button
                key={value}
                aria-pressed={category === value}
                onClick={() => setCategory(value)}
              >
                {value}
                <span>
                  {value === "All work"
                    ? work.length
                    : work.filter((item) => item.category === value).length}
                </span>
              </button>
            ))}
          </div>
          <p className="sr-only" role="status">
            {filtered.length} case studies shown for {category}
          </p>
          <div className="work-grid">
            {filtered.map((item) => (
              <WorkCard key={item.id} item={item} index={work.indexOf(item)} />
            ))}
          </div>
          <div className="other-work">
            <span>Also built & managed</span>
            <div>
              <a
                href="https://www.superbrealty.in/"
                target="_blank"
                rel="noreferrer"
              >
                Superb Realty <ArrowUpRight size={14} />
              </a>
              <a
                href="https://www.taterworld.in/"
                target="_blank"
                rel="noreferrer"
              >
                Tater World <ArrowUpRight size={14} />
              </a>
              <a
                href="https://www.superbcapital.in/"
                target="_blank"
                rel="noreferrer"
              >
                Superb Capital <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </section>

        <section className="contribution-band">
          <div className="shell">
            <p className="eyebrow">The work I want to do next</p>
            <h2>
              Close to founders.
              <br />
              <span>Useful to the team.</span>
            </h2>
            <div className="contribution-grid">
              <div>
                <span className="contribution-number">01</span>
                <h3>Founder support & execution</h3>
                <p>
                  Work closely with founders, turn ambiguous priorities into a plan, and stay with the details through delivery.
                </p>
                <span className="role-label">Founder's Office</span>
              </div>
              <div>
                <span className="contribution-number">02</span>
                <h3>Investment research & deal support</h3>
                <p>
                  Find and evaluate promising companies, structure the research, and make the investment team's work easier.
                </p>
              </div>
              <div>
                <span className="contribution-number">03</span>
                <h3>Founder programs & community</h3>
                <p>
                  Build engaging founder experiences and own the coordination, communication, and follow-through behind them.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="section shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span className="section-index">02 /</span> Experience
              </p>
              <h2>Built by doing.</h2>
            </div>
            <a
              className="text-link"
              href={profile.resume}
              download="Yash_Kumar_IITD.pdf"
            >
              Download resume <ArrowDownToLine size={16} />
            </a>
          </div>
          <div className="experience-list">
            {experience.map((item) => (
              <article className="experience-row" key={item.company}>
                <div className="experience-date">
                  <span>{item.period}</span>
                  <span>{item.location}</span>
                </div>
                <div className="experience-main">
                  <h3>
                    {item.company}
                    {item.period.endsWith("Present") && (
                      <span className="current-label">Current</span>
                    )}
                  </h3>
                  <p className="experience-role">{item.role}</p>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="about-section">
          <div className="shell about-grid">
            <div className="about-photo">
              <img
                src={portrait}
                alt="Yash Kumar on a suspension bridge in the mountains"
                width="640"
                height="640"
                loading="lazy"
              />
              <p>Yash Kumar / Mumbai, India</p>
            </div>
            <div className="about-copy">
              <p className="eyebrow">
                <span className="section-index">03 /</span> A little context
              </p>
              <h2>
                Engineering roots.
                <br />
                Entrepreneurial instinct.
              </h2>
              <p>
                I studied engineering at IIT Delhi, with a minor in
                entrepreneurship. Along the way, I co-founded Homescanner, built
                an earlier venture called ZenMind, and worked with the campus
                entrepreneurship community.
              </p>
              <p>
                At Superb Capital, I work as an Investment Analyst across
                startup evaluation, investment memos, portfolio relationships,
                and acquisition execution. Alongside that, I work in the
                Founder's Office at Superb Realty, building internal products
                and improving operational workflows.
              </p>
              <p>
                Working on both sides of the table shapes how I approach
                venture: understand the business, stay close to the founder, and
                follow through on the work behind a decision.
              </p>
              <div className="about-education">
                <FileText size={18} />
                <div>
                  <strong>Indian Institute of Technology Delhi</strong>
                  <span>
                    B.Tech, 2021 - 2025
                    <br />
                    Minor in Entrepreneurship, 2023 - 2025
                  </span>
                </div>
              </div>
              <div className="about-links">
                <a
                  className="text-link"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn <ArrowUpRight size={15} />
                </a>
                <a
                  className="text-link"
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          className="recognition shell"
          aria-label="Selected recognition"
        >
          <p className="eyebrow">Along the way</p>
          <div>
            <strong>Top 25 / 1,000+ teams</strong>
            <span>IIT Delhi FITT Hackathon</span>
          </div>
          <div>
            <strong>Top 100</strong>
            <span>Samsung Solve for Tomorrow</span>
          </div>
          <div>
            <strong>Business Head</strong>
            <span>Infinity Hyperloop / IIT Delhi</span>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="shell">
            <div className="contact-top">
              <p className="eyebrow">Let's work together</p>
              <span>Mumbai-based / Flexible on location</span>
            </div>
            <div className="contact-main">
              <div>
                <h2>
                  Good teams need
                  <br />
                  people who follow through.
                </h2>
                <p>
                  I'm looking for a role in a venture team where I can
                  contribute
                  <br className="desktop-break" /> across company building,
                  research, and founder support.
                </p>
                <a
                  href={`mailto:${profile.email}`}
                  className="button button-mint"
                >
                  Start a conversation <ArrowUpRight size={17} />
                </a>
                <a
                  href={profile.calendar}
                  target="_blank"
                  rel="noreferrer"
                  className="calendar-link"
                >
                  Or book a 1:1 <ArrowRight size={15} />
                </a>
              </div>
              <div className="contact-details">
                <span className="eyebrow">Reach me directly</span>
                <div className="email-row">
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                  <button
                    onClick={copyEmail}
                    className="copy-button"
                    aria-label={copied ? "Email copied" : "Copy email address"}
                    title={copied ? "Copied" : "Copy email address"}
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
                <span className="copy-status" role="status">
                  {copied
                    ? "Email copied"
                    : copyFailed
                      ? "Please select the email address to copy it."
                      : "Usually responds within 24 hours"}
                </span>
                <div className="contact-socials">
                  <a href={profile.linkedin} target="_blank" rel="noreferrer">
                    <Linkedin size={16} />
                    LinkedIn
                    <ArrowUpRight size={14} />
                  </a>
                  <a href={profile.github} target="_blank" rel="noreferrer">
                    <Github size={16} />
                    GitHub
                    <ArrowUpRight size={14} />
                  </a>
                  <a href={profile.resume} target="_blank" rel="noreferrer">
                    <FileText size={16} />
                    Resume
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
            <footer className="site-footer">
              <a className="wordmark" href="#" aria-label="Back to top">
                yk<span>.</span>
              </a>
              <span>Yash Kumar / Built with care.</span>
              <a href="#">
                Back to top <ArrowUpRight size={14} />
              </a>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}

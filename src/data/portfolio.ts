export const profile = {
  email: "yash9704.iitd@gmail.com",
  linkedin: "https://www.linkedin.com/in/yash-iitd/",
  github: "https://github.com/Yashkumar23092003",
  calendar: "https://cal.com/yash-kumar-fcml81/1-1-meeting",
  resume: "/pdf/Yash_Kumar_IITD.pdf",
};

export const categories = [
  "All work",
  "Company building",
  "Research & investment support",
  "Community",
] as const;
export type Category = (typeof categories)[number];
export type Work = {
  id: string;
  category: Exclude<Category, "All work">;
  company: string;
  title: string;
  summary: string;
  metric: string;
  metricLabel: string;
  role: string;
  period: string;
  context: string;
  actions: string[];
  result: string;
  link?: string;
  linkLabel?: string;
};

export const work: Work[] = [
  {
    id: "startup-evaluation",
    category: "Research & investment support",
    company: "Superb Capital",
    title: "Turning startup research into an investment view.",
    summary:
      "Evaluated startups across market, team, traction, and economics. Wrote investment memos for partner review.",
    metric: "15+ startups",
    metricLabel: "evaluated for the investment team",
    role: "Investment Analyst",
    period: "Apr 2025 - Present",
    context:
      "An investment team needs a clear view of a company's opportunity and risks. My work at Superb Capital connects company research with the questions that matter for a partner's decision.",
    actions: [
      "Evaluated more than 15 startups across market opportunity, founding team, traction, and business economics.",
      "Synthesized the findings into investment memos for partner review.",
      "Worked across company research and investment analysis to support the team's evaluation process.",
    ],
    result:
      "Delivered investment memos that brought the market, team, traction, and economics into a structured view for partner review.",
    link: "https://www.superbcapital.in/",
    linkLabel: "Visit Superb Capital",
  },
  {
    id: "portfolio-support",
    category: "Community",
    company: "Superb Capital",
    title: "Staying close to founders, through the details.",
    summary:
      "Re-engaged portfolio founders, strengthened portfolio tracking, and managed a portfolio startup acquisition end to end.",
    metric: "10+ founders",
    metricLabel: "portfolio relationships re-engaged",
    role: "Investment Analyst",
    period: "Apr 2025 - Present",
    context:
      "Portfolio support depends on consistent relationships and reliable execution. At Superb Capital, my responsibilities extend beyond evaluating companies to working with founders and coordinating transactions.",
    actions: [
      "Re-established engagement with more than ten portfolio founders.",
      "Strengthened portfolio tracking and management processes.",
      "Managed a portfolio startup acquisition end to end, including stakeholder communication, documentation, and transaction execution.",
    ],
    result:
      "Combined founder engagement and portfolio tracking with hands-on responsibility for acquisition execution.",
    link: "https://www.superbcapital.in/",
    linkLabel: "Visit Superb Capital",
  },
  {
    id: "homescanner",
    category: "Company building",
    company: "Homescanner.ai",
    title: "From a search problem to a live startup.",
    summary:
      "Co-founded an AI home-discovery product. Owned user research, the product roadmap, and delivery with a seven-person team.",
    metric: "150+",
    metricLabel: "user interviews conducted",
    role: "Co-founder / Product",
    period: "Sep 2024 - Aug 2025",
    context:
      "Home search was fragmented. People struggled to turn their preferences into a useful shortlist, and a functional product alone wasn't enough to keep them engaged.",
    actions: [
      "Conducted 150+ user interviews to understand discovery friction and inform product priorities.",
      "Identified that 70% of drop-offs occurred at the shortlist stage and redesigned the discovery flow.",
      "Owned a six-month roadmap, sprint planning, and weekly updates across a seven-person design and engineering team.",
      "Defined activation and shortlist metrics, and ran A/B tests to evaluate changes to the experience.",
    ],
    result:
      "Improved shortlist conversion by 50% through the redesigned discovery flow. My responsibilities spanned customer discovery, product decisions, and coordination through delivery.",
    link: "https://homescanner.ai",
    linkLabel: "Visit Homescanner.ai",
  },
  {
    id: "investment-tool",
    category: "Research & investment support",
    company: "Superb Capital",
    title: "Making startup decks easier to evaluate.",
    summary:
      "Shipped a RAG-powered pitch-deck analyser that reduced analyst review time and increased deal throughput.",
    metric: "90% less time",
    metricLabel: "spent on analyst review",
    role: "Investment Analyst",
    period: "Apr 2025 - Present",
    context:
      "The investment team was spending time manually reviewing startup decks. Inconsistent presentation made it harder to compare companies quickly.",
    actions: [
      "Identified the repetitive review workflow and proposed a structured summary format.",
      "Built a retrieval-augmented generation (RAG) tool to analyse startup pitch decks and produce structured summaries.",
      "Focused the output on making information easier for the investment team to scan and compare.",
    ],
    result:
      "Cut analyst review time by 90% and tripled deal throughput for the investment team.",
  },
  {
    id: "operations",
    category: "Company building",
    company: "Superb Realty",
    title: "Building the systems behind daily operations.",
    summary:
      "Took internal performance tracking from an undefined need to two platforms: Superb OS and Superb Genie.",
    metric: "2 platforms",
    metricLabel: "built from problem definition to delivery",
    role: "Founder's Office / Product & Tech",
    period: "Aug 2025 - Present",
    context:
      "The team lacked a shared system for monitoring performance. Scattered information made it difficult to understand what was working day to day.",
    actions: [
      "Scoped the operational need and translated it into product requirements.",
      "Designed the product logic and built Superb OS and Superb Genie end to end.",
      "Used AI-assisted development to move quickly from the initial problem to working internal tools.",
    ],
    result:
      "Launched Superb OS and Superb Genie, with real-time performance tracking adopted daily by five teams.",
    link: "https://superb-os.lovable.app/",
    linkLabel: "View Superb OS",
  },
  {
    id: "founder-community",
    category: "Community",
    company: "Entrepreneurship Development Cell / IIT Delhi",
    title: "Bringing the founder ecosystem onto campus.",
    summary:
      "Managed the Campus Ambassador Program and helped run events and conversations with startup co-founders.",
    metric: "End to end",
    metricLabel: "campus ambassador program ownership",
    role: "Executive / eDC",
    period: "Oct 2022 - Aug 2023",
    context:
      "Entrepreneurship programs depend on the work between the idea and the event: coordinating people, communicating clearly, and following through on execution.",
    actions: [
      "Managed planning and execution for the Campus Ambassador Program.",
      "Co-hosted events and Q&A sessions with unicorn co-founders.",
      "Created social content and supported security and hospitality at large events.",
    ],
    result:
      "Built hands-on experience in program coordination, founder-event execution, and communication within the IIT Delhi entrepreneurship ecosystem.",
  },
];

export const experience = [
  {
    company: "Superb Capital",
    role: "Investment Analyst",
    period: "Apr 2025 - Present",
    location: "Venture capital",
    description:
      "Evaluated 15+ startups and wrote investment memos for partner review. Re-engaged 10+ portfolio founders, built a RAG-powered pitch-deck analyser, and managed a portfolio startup acquisition through stakeholder coordination, documentation, and execution.",
  },
  {
    company: "Superb Realty",
    role: "Founder's Office / Product & Tech",
    period: "Aug 2025 - Present",
    location: "Mumbai",
    description:
      "Launched internal platforms used daily by five teams. Built an AI KYC verification agent and evaluated 10+ enterprise vendors, aligning stakeholders and negotiating onboarding for three.",
  },
  {
    company: "Homescanner.ai",
    role: "Co-founder / Product",
    period: "Sep 2024 - Aug 2025",
    location: "IIT Delhi",
    description:
      "AI home discovery, customer research, product strategy, and delivery with a seven-person team.",
  },
  {
    company: "Zeko AI",
    role: "Product Management Intern",
    period: "May - Jul 2024",
    location: "Noida",
    description:
      "Prompt design across five production use cases and a prioritization framework for 60+ product issues.",
  },
  {
    company: "ZenMind",
    role: "Founder & CEO",
    period: "May 2023 - Jan 2024",
    location: "IIT Delhi",
    description:
      "An AI companion MVP, market and competitor research, and product feedback with licensed counsellors.",
  },
];

// Content for Launched Products & Sites, Mentorship & Guided Projects, and Speaking / Jury Events.
import veltechLecture from '../assets/img/events/veltech-guest-lecture-2026.jpeg';

/**
 * Products, SaaS platforms, and client websites designed, built, and launched.
 */
export const launchedGroups = [
  {
    group: 'Independent Products & Platforms (Built & Operated End-to-End)',
    items: [
      {
        id: 'portfolio-manager',
        kind: 'Live SaaS Platform',
        status: 'Live in Production',
        isLive: true,
        title: 'Portfolio Manager',
        tagline: 'Multi-tenant headless CMS for personal & professional websites',
        description:
          'A complete content and operations platform where each account manages its profile, structured collections, media delivery, visitor analytics, contact inbox, and automated backups—connecting to any frontend through a publishable key and lightweight SDK. This website is powered by it.',
        highlights: [
          'Multi-account workspace with publishable API keys & session-cached SDK',
          'Built-in analytics, contact & endorsement workflows, and one-click backups',
        ],
        link: 'https://admin.abishek.in',
        linkLabel: 'Visit Live Platform',
      },
      {
        id: 'family-finance',
        kind: 'Live Web & Mobile App',
        status: 'Live in Production',
        isLive: true,
        title: 'Family Finance',
        tagline: 'Collaborative household & personal finance platform',
        description:
          'Brings shared family accounts and private personal ledgers together under one roof, with role-based access (Admin, Member, Viewer), budget tracking, category insights, and real-time dashboards across web (PWA) and mobile.',
        highlights: [
          'Shared household ledgers alongside private personal accounts',
          'Role-based permissions, installable PWA & companion mobile app',
        ],
        link: 'https://finance.abishek.in',
        linkLabel: 'Visit Live Platform',
      },
      {
        id: 'subscription-manager',
        kind: 'Product in Build',
        status: 'In Active Build',
        isLive: false,
        title: 'Service Subscription Manager',
        tagline: 'Recurring spend visibility & renewal intelligence',
        description:
          'Consolidates every recurring subscription and service contract in one place—tracking billing cycles, upcoming renewal dates, and total run-rate spend while sending proactive alerts before charges hit.',
        highlights: [
          'Unified renewal calendar and monthly/annual spend breakdown',
          'Automated pre-renewal notifications to prevent unwanted charges',
        ],
        link: '',
        linkLabel: '',
      },
    ],
  },
  {
    group: 'Client Websites, Enterprise Portals & Commercial Launches',
    items: [
      {
        id: 'daat-platforms',
        kind: 'SaaS & EdTech Platforms',
        status: 'Launched for DAAT',
        isLive: true,
        title: 'DAAT — SaaS Platform, Student Management & Brand Sites',
        tagline: 'High-traffic operational platforms and ground-up web rebuilds',
        description:
          'Spearheaded the modernization and launch of legacy client websites alongside core operational workflows for a high-traffic SaaS product and a comprehensive Student Management System. Also architected an internal project management platform to run team delivery.',
        highlights: [
          'Rebuilt legacy websites and modernized customer-facing UI/UX',
          'Shipped production workflows for SaaS and Student Management platforms',
        ],
        link: 'https://daat.group/',
        linkLabel: 'View Organization',
      },
      {
        id: 'rook-launches',
        kind: 'Brand Sites & Client Apps',
        status: 'Launched at ROOK',
        isLive: true,
        title: 'ROOK — Brand Websites & Custom Client Platforms',
        tagline: 'Consumer-facing web applications from discovery to launch',
        description:
          'Designed, built, and deployed internal brand websites and bespoke client web applications—driving each product from initial market and feasibility research through architecture, interface modernization, and live production release.',
        highlights: [
          'End-to-end delivery of custom client websites and brand portals',
          'Modernized web interfaces for faster performance and user conversion',
        ],
        link: 'https://rookhq.com/',
        linkLabel: 'View Organization',
      },
      {
        id: 'madras-defence-academy',
        kind: 'EdTech Portal Launch',
        status: 'Client Launch',
        isLive: false,
        title: 'Madras Defence Academy — Learning & Administration Platform',
        tagline: 'Digital campus for student administration, study materials & community',
        description:
          'Built and launched an end-to-end educational management platform for the academy, centralizing student onboarding, course material distribution, and a dedicated student discussion forum.',
        highlights: [
          'Streamlined student administration and digital study material delivery',
          'Built an interactive forum connecting students and instructors',
        ],
        link: '',
        linkLabel: '',
      },
      {
        id: 'fineques-web',
        kind: 'Corporate Web Presence',
        status: 'Client Launch',
        isLive: false,
        title: 'Fineques — Brand Website Modernization',
        tagline: 'Refreshed web architecture and brand presence',
        description:
          'Delivered and maintained brand websites with modernized layouts, responsive user flows, and reliable day-to-day operation.',
        highlights: [
          'Redesigned and maintained core brand web properties',
        ],
        link: '',
        linkLabel: '',
      },
    ],
  },
];

/**
 * Mentorship initiatives, developer guidance, and flagship guided/innovation projects.
 */
export const mentorshipPillars = [
  {
    role: 'Engineering Team Mentor',
    title: 'Mentoring Junior Developers in Production',
    org: 'DAAT & Independent Advisory',
    period: '2022 – Present',
    description:
      'Guided junior engineers from writing isolated features to owning end-to-end production services. Co-built a live internal project management platform alongside mentees so they could learn architecture, code reviews, and release discipline on real software.',
    outcomes: [
      'Mentored junior developers across backend architecture, debugging, and production delivery',
      'Turned an internal product build into a hands-on engineering residency for the team',
    ],
  },
  {
    role: 'Hackathon Jury & Project Advisor',
    title: 'Evaluating & Guiding Student Engineering Teams',
    org: 'Engineering Colleges across Chennai',
    period: '2024 – Present',
    description:
      'Invited as a jury member and technical mentor at college hackathons to evaluate prototypes, challenge assumptions, and guide student teams on scoping, system architecture, and turning raw ideas into deployable products.',
    outcomes: [
      'Advised dozens of student teams on architecture, feasibility, and real-world problem fit',
      'Selected and mentored top-performing teams advancing to national rounds',
    ],
  },
  {
    role: 'Workshop Lead & Peer Trainer',
    title: 'Web Engineering & Product Launching Bootcamp',
    org: 'Rajalakshmi Institute of Technology',
    period: 'Community Initiative',
    description:
      'Designed and led practical engineering sessions teaching peers how to design interfaces in Figma, structure web applications, collaborate with Git & GitHub, and launch live websites to production.',
    outcomes: [
      'Helped students ship and publish their first live websites end to end',
      'Organized and led AI Horizon 2022, a campus-wide symposium on applied AI',
    ],
  },
];

/**
 * Guided & flagship problem-solving builds (no resume-style tech stack pills).
 */
export const guidedProjects = [
  {
    kind: 'National Winner · Smart India Hackathon',
    title: 'GrantBase — National Research Grant Intelligence Platform',
    org: 'Ministry of Education & AICTE, Government of India',
    idea: 'Researchers across India were spending weeks manually checking dozens of fragmented government portals for funding opportunities and missing critical deadlines.',
    motive: 'Create a single intelligence platform that aggregates live grant calls nationwide, matches them to a researcher’s domain, and sends proactive deadline alerts.',
    built: 'Led the architecture and delivery of automated multi-portal grant harvesters and a domain-matching recommendation engine—winning the Smart India Hackathon.',
    link: 'https://github.com/abishekvp/SIH_DR715',
  },
  {
    kind: 'Industrial Analytics Build',
    title: 'SetConnect — Warranty Claim & Fault-Pattern Intelligence',
    org: 'SetConnect',
    idea: 'Recurring spare-part warranty claims were costing money, but operations teams could only see individual claims rather than where the underlying defects originated.',
    motive: 'Trace recurring part failures back to the specific production wing and failure sequence so defects could be eliminated at the source.',
    built: 'Designed a fault-pattern analysis pipeline over historical warranty claims that identified sequential failure chains and ranked production wings by root-cause impact.',
    link: '',
  },
  {
    kind: 'Institutional Workflow Automation',
    title: 'OASIS Portal — Zero-Touch Academic Records Automation',
    org: 'Rajalakshmi Institute of Technology',
    idea: 'Faculty and department staff were spending hundreds of hours manually re-typing thousands of student records from spreadsheets into the university’s OASIS web portal.',
    motive: 'Give that time back to educators and eliminate human transcription errors from official academic records.',
    built: 'Built and deployed an automated ingestion and browser-orchestration tool that validates spreadsheet records and populates the university portal unattended.',
    link: 'https://github.com/abishekvp/Web-Automation-Streamlining-OASIS-Web-Portal',
  },
  {
    kind: 'LegalTech Platform',
    title: 'LegalTech — Case-History Advocate Matching & Digital Files',
    org: 'Legal Practice Initiative',
    idea: 'Clients struggle to identify advocates with proven experience in their specific type of dispute, while many independent practices still rely on paper case files.',
    motive: 'Connect clients with the right legal representation based on verified case history while modernizing day-to-day case record management for lawyers.',
    built: 'Engineered a dual-sided platform featuring digital case file management for advocates and a historical case-similarity discovery engine for clients.',
    link: 'https://github.com/abishekvp/legaltech',
  },
];

/** Talks and jury invitations, newest first. */
export const events = [
  {
    role: 'Guest Lecture',
    title: 'Multithreading & Collections: Building Scalable Concurrent Enterprise Systems',
    host: 'Department of CSE (AI & ML) with Tekhne Club',
    venue: 'Vel Tech High Tech Dr. Rangarajan Dr. Sakunthala Engineering College',
    place: 'Avadi, Chennai',
    date: '26 Sep 2026',
    description:
      'Delivered an industry session on how production enterprise systems handle concurrency at scale: thread pools, lock contention, race conditions, deadlock prevention, and choosing concurrent data structures with real-world architectural case studies.',
    images: [veltechLecture],
  },
  {
    role: 'Jury Member & Mentor',
    title: 'Internal Hackathon 2026',
    venue: 'Rajalakshmi Institute of Technology',
    place: 'Chennai',
    date: '2026',
    description:
      'Evaluated student engineering teams on problem clarity, system architecture, and execution feasibility—mentoring builders on how to scope and ship their prototypes and selecting the teams advancing to the next stage.',
    images: [],
  },
  {
    role: 'Jury Member & Mentor',
    title: 'Internal Hackathon 2024',
    venue: 'St. Joseph College of Engineering',
    place: 'Chennai',
    date: '2024',
    description:
      'Reviewed live prototypes and technical pitches, providing actionable architectural feedback and product guidance to student teams building software solutions.',
    images: [],
  },
];

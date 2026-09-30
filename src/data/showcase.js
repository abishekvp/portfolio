// Content for the Products, Education and Events sections. These sections have no
// collection in the admin yet, so they live here. To add an event photo, put the image in
// src/assets/img/events/, import it below and add it to that event's `images`.
import veltechLecture from '../assets/img/events/veltech-guest-lecture-2026.jpeg';

/** Products I designed, built and run in production. `link` empty = no public URL yet. */
export const products = [
  {
    id: 'portfolio-manager',
    title: 'Portfolio Manager',
    tagline: 'Headless CMS for personal websites',
    description:
      'Multi-account content platform: each account manages its profile, collections, media, analytics, contact inbox and backups, and connects any website through a publishable API key and an embeddable SDK. This site is one of its clients.',
    tags: ['Node.js', 'Express', 'React', 'PostgreSQL', 'Vercel'],
    link: 'https://admin.abishek.in',
  },
  {
    id: 'family-finance',
    title: 'Family Finance',
    tagline: 'Household money, managed together',
    description:
      'Shared family accounts alongside private personal ones, with role-based membership (Admin, Member, Viewer), transactions, categories and dashboards. Ships as an installable PWA and a companion mobile app, secured with rotating refresh tokens.',
    tags: ['TypeScript', 'React', 'Express', 'Prisma', 'PostgreSQL'],
    link: 'https://finance.abishek.in',
  },
  {
    id: 'credentials',
    title: 'Credentials',
    tagline: 'Zero-knowledge password vault',
    description:
      'Credentials are encrypted on the user’s device before they are sent, so the server only ever holds ciphertext. Available as a web vault, a browser extension for autofill and a mobile app.',
    tags: ['Node.js', 'React', 'Client-side encryption', 'Browser extension', 'Mobile'],
    link: 'https://credentials.abishek.in',
  },
  {
    id: 'subscription-manager',
    title: 'Service Subscription Manager',
    tagline: 'Every recurring charge in one place',
    description:
      'Tracks subscriptions and recurring services with their billing cycles, renewal dates and total spend, and sends a reminder before the next charge.',
    tags: [],
    link: '',
  },
];

/** Degree shown when the admin has no education entry. */
export const degree = {
  institution: 'Rajalakshmi Institute of Technology',
  degree: 'Bachelor of Engineering',
  field_of_study: 'Computer Science Engineering',
  location: 'Chennai, Tamil Nadu',
  start_date: '2020',
  end_date: '2024',
};

/**
 * What I did during college, grouped for the Education section.
 * Projects carry `idea` (where it came from), `motive` (why it mattered) and `built`.
 */
export const academics = [
  {
    group: 'Internship & industry work',
    items: [
      {
        kind: 'Internship',
        title: 'Software Engineering Intern',
        org: 'Madras Defence Academy',
        description:
          'Internship with Madras Defence Academy, building software for the academy alongside my coursework.',
      },
      {
        kind: 'Big data project',
        title: 'Fault-pattern analysis for spare-part claims',
        org: 'SetConnect',
        idea: 'The same spare parts kept coming back as warranty claims, but nobody could say where the faults started.',
        motive: 'Trace recurring faults to the production wing that caused them, so they are fixed at the source instead of claim by claim.',
        built:
          'Analysed the claim history to find which wing produced parts that were claimed most often or failed in sequence, and ranked the wings by fault pattern.',
        tags: ['Big Data', 'Python', 'Data analysis'],
      },
    ],
  },
  {
    group: 'Hackathon & college projects',
    items: [
      {
        kind: 'Winner · Smart India Hackathon 2022',
        title: 'GrantBase — research grant intelligence',
        org: 'Ministry of Education & AICTE, Government of India',
        date: '2022',
        idea: 'Researchers were spending weeks checking dozens of government portals for grants, each with its own format and deadlines.',
        motive: 'One place that finds the grants that fit a researcher’s domain and warns them before a deadline passes.',
        built:
          'Scrapers that pull live grant data from multiple portals, and a Django backend that matches grants to research domains and sends alerts.',
        tags: ['Django', 'BeautifulSoup4', 'SQL'],
        link: 'https://github.com/abishekvp/SIH_DR715',
      },
      {
        kind: 'College project',
        title: 'OASIS portal data-entry automation',
        org: 'Rajalakshmi Institute of Technology',
        idea: 'Department staff were re-typing student records from Excel sheets into the university’s OASIS portal, one form at a time.',
        motive: 'Give that time back to the staff and remove typing mistakes from official records.',
        built:
          'A Django tool that reads the Excel sheets with Pandas and fills the portal automatically with Selenium.',
        tags: ['Django', 'Selenium', 'Pandas'],
        link: 'https://github.com/abishekvp/Web-Automation-Streamlining-OASIS-Web-Portal',
      },
      {
        kind: 'College project',
        title: 'LegalTech — advocates and case records',
        org: 'Rajalakshmi Institute of Technology',
        idea: 'People find it hard to choose an advocate who has handled cases like theirs, and many lawyers still keep case records on paper.',
        motive: 'Match clients with the right advocate using real case history, and give lawyers a secure digital case file.',
        built:
          'A platform where lawyers manage their case records and clients search for advocates by past cases.',
        tags: ['Django', 'Selenium', 'SQL'],
        link: 'https://github.com/abishekvp/legaltech',
      },
    ],
  },
  {
    group: 'Leadership on campus',
    items: [
      {
        kind: 'Event lead',
        title: 'AI Horizon 2022',
        org: 'Rajalakshmi Institute of Technology',
        date: '2022',
        description:
          'Organised and led AI Horizon 2022, a college event on advances in artificial intelligence, from planning the programme to running it on the day.',
      },
      {
        kind: 'Trainer',
        title: 'Placement training for my batch',
        org: 'Rajalakshmi Institute of Technology',
        description:
          'Ran placement training sessions for my batchmates on HTML, CSS and JavaScript, Figma, Git and GitHub, and publishing sites with GitHub Pages.',
      },
    ],
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
      'How industrial Java products handle concurrency: threads and thread pools, synchronization and locks, race conditions and deadlocks, and picking the right concurrent collections, with examples from enterprise software.',
    images: [veltechLecture],
  },
  {
    role: 'Jury Member',
    title: 'Internal Hackathon 2026',
    venue: 'Rajalakshmi Institute of Technology',
    place: 'Chennai',
    date: '2026',
    description:
      'Judged student teams on problem understanding, technical depth and feasibility, and helped choose the teams that went forward.',
    images: [],
  },
  {
    role: 'Jury Member',
    title: 'Internal Hackathon 2024',
    venue: 'St. Joseph College of Engineering',
    place: 'Chennai',
    date: '2024',
    description:
      'Evaluated student prototypes and pitches and gave each team feedback on architecture and scope.',
    images: [],
  },
];

// Showcase data: Projects, Skills, and Talks & Community
import veltechLecture from '../assets/img/events/veltech-guest-lecture-2026.jpeg';

/**
 * Projects (replaces Launched Products & Sites and Guided Builds)
 */
export const projects = [
  {
    id: 'portfolio-manager',
    title: 'Portfolio Manager',
    badge: 'Live',
    isLive: true,
    description:
      'Multi-account headless CMS: each account manages its profile, content collections, media, visitor analytics and contact inbox, and connects to any frontend through a publishable API key and a small SDK. This website runs on it.',
    tech: ['Node.js', 'React'],
    links: [
      { label: 'admin.abishek.in', url: 'https://admin.abishek.in', type: 'live' },
      { label: 'GitHub', url: 'https://github.com/abishekvp/portfolio-admin', type: 'github' },
    ],
  },
  {
    id: 'family-finance',
    title: 'Family Finance',
    badge: 'Live',
    isLive: true,
    description:
      'Shared household ledgers alongside private personal accounts, with Admin / Member / Viewer roles, budgets and category insights. Installable as a PWA.',
    tech: ['Node.js', 'React'],
    links: [
      { label: 'finance.abishek.in', url: 'https://finance.abishek.in', type: 'live' },
      { label: 'GitHub', url: 'https://github.com/abishekvp/family-finance', type: 'github' },
    ],
  },
  {
    id: 'grantbase',
    title: 'GrantBase',
    badge: 'Academic · SIH 2022 winner',
    isLive: false,
    description:
      'Collects research grant calls from several government portals, matches them to a researcher\'s field and sends deadline alerts.',
    tech: ['Django', 'BeautifulSoup'],
    links: [
      { label: 'GitHub', url: 'https://github.com/abishekvp/SIH_DR715', type: 'github' },
    ],
  },
  {
    id: 'oasis-automation',
    title: 'OASIS records automation',
    badge: 'Academic',
    isLive: false,
    description:
      'Reads student records from Excel, validates them and fills the college\'s OASIS portal automatically, replacing manual data entry.',
    tech: ['Django', 'Selenium', 'BeautifulSoup', 'Pandas'],
    links: [
      { label: 'GitHub', url: 'https://github.com/abishekvp/Web-Automation-Streamlining-OASIS-Web-Portal', type: 'github' },
    ],
  },
  {
    id: 'legaltech',
    title: 'LegalTech',
    badge: 'Academic',
    isLive: false,
    description:
      'Case-record management for lawyers, plus advocate search for clients based on past case history.',
    tech: ['Django', 'Selenium', 'SQL'],
    links: [
      { label: 'GitHub', url: 'https://github.com/abishekvp/legaltech', type: 'github' },
    ],
  },
];

/**
 * Technical skills grouped by category
 */
export const skillsGroups = [
  {
    category: 'Strong',
    icon: '⚡',
    skills: ['Python', 'Django', 'PostgreSQL'],
  },
  {
    category: 'Languages (also used)',
    icon: '💻',
    skills: ['Go', 'Java', 'Ruby', 'JavaScript', 'C', 'C++'],
  },
  {
    category: 'Backend & data',
    icon: '⚙️',
    skills: ['REST API design', 'Node.js', 'MongoDB', 'SQL'],
  },
  {
    category: 'Identity',
    icon: '🛡️',
    skills: ['Active Directory', 'Microsoft Entra ID', 'Google Workspace', 'Just-In-Time access'],
  },
  {
    category: 'DevOps & secrets',
    icon: '🔧',
    skills: ['Terraform provider', 'Jenkins', 'Ansible', 'Chef and Puppet plugin development', 'Git'],
  },
  {
    category: 'Frontend',
    icon: '🎨',
    skills: ['React', 'Ember', 'HTML', 'CSS'],
  },
  {
    category: 'Automation',
    icon: '🤖',
    skills: ['Selenium', 'Playwright', 'BeautifulSoup'],
  },
];

/**
 * Talks & Community (replaces Mentorship, Speaking and Jury sections)
 */
export const talksCommunity = [
  {
    date: '26 Sep 2026',
    role: 'Guest Lecture',
    title: 'Multithreading & Collections: Building Scalable Concurrent Enterprise Systems',
    venue: 'Vel Tech High Tech Dr. Rangarajan Dr. Sakunthala Engineering College',
    host: 'Dept. of CSE (AI & ML) with Tekhne Club',
    place: 'Avadi, Chennai',
    description:
      'Guest lecture to 40 students on multithreading and concurrent collections in enterprise systems: thread pools, lock contention, race conditions, deadlock prevention, and choosing concurrent data structures.',
    images: [veltechLecture],
  },
  {
    date: '2026',
    role: 'Jury Member',
    title: 'Internal Hackathon 2026',
    venue: 'Rajalakshmi Institute of Technology',
    place: 'Chennai',
    description:
      'Jury member evaluating student engineering prototypes, system architecture, and execution feasibility.',
    images: [],
  },
  {
    date: '26 Feb 2024',
    role: 'Jury Member',
    title: 'Internal Hackathon 2024',
    venue: 'St. Joseph College of Engineering',
    place: 'Chennai',
    description:
      'Jury member reviewing technical pitches, validating prototype implementation, and providing architectural feedback.',
    images: [],
  },
  {
    date: '2022',
    role: 'National Winner',
    title: 'Smart India Hackathon 2022 (Software Edition)',
    venue: 'Ministry of Education & AICTE, Govt. of India',
    place: 'National',
    description:
      'National winner for GrantBase — an automated platform collecting research grant calls across government portals with domain matching and deadline alerts.',
    images: [],
  },
  {
    date: '2020 – 2024',
    role: 'Peer Trainer',
    title: 'Web Engineering & Git Peer Training',
    venue: 'Rajalakshmi Institute of Technology',
    place: 'Chennai',
    description:
      'Peer trainer: taught 600+ students web development, Git/GitHub, and deploying live production sites.',
    images: [],
  },
];

// Backwards-compatibility aliases if needed
export const launchedGroups = [{ group: 'Projects', items: projects }];
export const events = talksCommunity;

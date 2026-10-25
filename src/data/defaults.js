// Default copy and configuration for sections.
import heroImage from '../assets/img/abi.jpg';

export const hero = {
  badge: '// SOFTWARE ENGINEER · PRODUCT BUILDER · MENTOR',
  nameFirst: 'Abishek',
  nameAccent: 'VP',
  tagline: 'Architecting enterprise security systems, launching live software products, and mentoring builders.',
  description:
    'I engineer privileged access, identity, and secrets infrastructure at Securden, design and operate my own live SaaS and web platforms end to end, and mentor developers and student teams from architecture to launch.',
  highlights: [
    { icon: '🚀', value: 'Products & Sites', label: 'Designed, launched & operating' },
    { icon: '🔐', value: 'Enterprise PAM', label: 'Identity, access & CI/CD secrets' },
    { icon: '🧭', value: 'Mentor & Jury', label: 'Guiding devs & hackathons' },
  ],
  primaryCta: { label: 'Explore Launched Products & Sites', href: '#projects' },
  secondaryCta: { label: 'Mentorship & Guided Builds', href: '#mentorship' },
  terminalLabel: 'Launch Terminal CLI',
  portrait: heroImage,
  portraitTag: 'Software Engineer · Builder · Mentor',
  floatingBadges: [
    { icon: '🚀', title: 'Products & Sites', text: 'SaaS · Headless CMS · Client Platforms' },
    { icon: '🧭', title: 'Mentorship & Advisory', text: 'Team Mentor · Speaker · Jury' },
  ],
};

/** Short facts under the About bio (no job-seeker stack lists). */
export const aboutFacts = [
  { label: 'Focus', value: 'Products · Security · Mentorship' },
  { label: 'Shipping Since', value: '2020 — Present' },
  { label: 'Base', value: 'Chennai, India' },
];

export const testimonials = {
  badge: '// 06. ENDORSEMENTS',
  sectionTitle: 'What People <span class="gradient-text">Say</span>',
  sectionSubtitle: 'Colleagues, founders, clients, and mentees I have collaborated with.',
  items: [],
};

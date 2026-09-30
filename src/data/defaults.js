// Offline fallbacks for sections that are not in portfolio.json. Used only when the
// admin API (admin.abishek.in) cannot be reached and nothing is cached in the session.
import heroImage from '../assets/img/abi.jpg';

export const hero = {
  badge: '// SOFTWARE ENGINEER · IDENTITY & PLATFORM SECURITY',
  nameFirst: 'Abishek',
  nameAccent: 'VP',
  tagline: 'I build the identity, access and secrets infrastructure enterprises run on.',
  description:
    'At Securden I engineer privileged access management, self-service password reset and DevOps secrets integrations for enterprise IT teams. Outside work I design, ship and operate my own software products end to end.',
  highlights: [
    { icon: '🏢', value: 'Since 2020', label: 'Shipping production software' },
    { icon: '🚀', value: '4 Products', label: 'Designed, built and run' },
    { icon: '🎤', value: 'Speaker & Jury', label: 'Engineering colleges' },
  ],
  primaryCta: { label: 'Explore My Products', href: '#projects' },
  resumeLabel: 'Download Resume',
  terminalLabel: 'Launch Terminal CLI',
  portrait: heroImage,
  portraitTag: 'Software Engineer · Securden',
  floatingBadges: [
    { icon: '🔐', title: 'Identity & Access', text: 'PAM · SSPR · AD · Entra ID' },
    { icon: '⚙️', title: 'Secrets in CI/CD', text: 'Terraform · Jenkins · Ansible' },
  ],
};

/** Short facts under the About bio (kept distinct from the hero numbers). */
export const aboutFacts = [
  { label: 'Currently', value: 'Securden, Chennai' },
  { label: 'Domain', value: 'IAM · PAM · DevSecOps' },
  { label: 'Works in', value: 'Python · Node.js · Java' },
];

export const testimonials = {
  badge: '// 07. PEER_ENDORSEMENTS',
  sectionTitle: 'What People <span class="gradient-text">Say</span>',
  sectionSubtitle: 'Colleagues, clients and students I have worked with.',
  items: [],
};

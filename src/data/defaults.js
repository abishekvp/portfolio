// Default copy and configuration for sections.
import heroImage from '../assets/img/abi.jpg';

export const hero = {
  badge: '// SOFTWARE ENGINEER · BACKEND & SECURITY',
  nameFirst: 'Abishek',
  nameAccent: 'V',
  tagline: 'I build identity, privileged access and secrets infrastructure for enterprise security software.',
  description:
    'Software Engineer at Securden since 2024. I built a Self-Service Password Reset platform from scratch, connected it to Active Directory, Microsoft Entra ID and Google Workspace, and shipped secrets plugins for Terraform, Puppet and Chef with 3,900+ public downloads. Open to backend and security engineering roles.',
  highlights: [
    { icon: '🛡️', value: 'Identity & PAM', label: 'Password self-service, JIT access APIs, directory sync' },
    { icon: '⚙️', value: 'DevOps Secrets Plugins', label: 'Terraform · Puppet · Chef · Jenkins · Ansible' },
    { icon: '🚀', value: 'Live Side Projects', label: 'Portfolio Manager · Family Finance' },
  ],
  primaryCta: { label: 'View Experience', href: '#experience' },
  secondaryCta: { label: 'Download Resume', href: '/Abishek_V_Software_Engineer.pdf' },
  terminalLabel: 'Launch Terminal CLI',
  portrait: heroImage,
  portraitTag: 'Software Engineer · Backend & Security',
  floatingBadges: [
    { icon: '🛡️', title: 'Identity & PAM', text: 'SSPR · JIT Access · Entra Delta Sync' },
    { icon: '⚙️', title: '3,900+ Downloads', text: 'Terraform · Puppet · Chef Plugins' },
  ],
};

/** Stat strip under the About bio (replaces FOCUS / SHIPPING SINCE / BASE) */
export const aboutFacts = [
  { label: 'EXPERIENCE', value: '2.5+ yrs full-time · Securden' },
  { label: 'EDUCATION', value: 'B.E. CSE · RIT · 2024' },
  { label: 'PLUGIN DOWNLOADS', value: '3,900+' },
  { label: 'BASE', value: 'Chennai · Open to relocation' },
];

export const testimonials = {
  badge: '// ENDORSEMENTS',
  sectionTitle: 'What People <span class="gradient-text">Say</span>',
  sectionSubtitle: 'Colleagues and collaborators.',
  items: [],
  visible: false,
};

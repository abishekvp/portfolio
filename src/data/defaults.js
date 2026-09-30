// Offline fallbacks for sections that are not in portfolio.json. Used only when the
// admin API (admin.abishek.in) cannot be reached and nothing is cached in the session.
import heroImage from '../assets/img/abi.jpg';

export const hero = {
  badge: '// SENIOR PLATFORM & SECURITY ENGINEER',
  nameFirst: 'Abishek',
  nameAccent: 'VP',
  tagline: 'Backend Architecture • Enterprise Integrations • IdP • DevOps',
  description:
    'Senior Software Engineer specializing in high-throughput backend architecture, enterprise DevOps integrations, Identity Provider management, and automated tooling at Securden.',
  highlights: [
    { icon: '🛡️', value: '4+ Years', label: 'Security Engineering' },
    { icon: '🏆', value: 'SIH Winner', label: 'Smart India Hackathon' },
    { icon: '⚡', value: 'DevOps', label: 'Terraform, Ansible, Jenkins, etc,...' },
  ],
  primaryCta: { label: 'View Architecture & Projects', href: '#projects' },
  resumeLabel: 'Download CV',
  terminalLabel: 'Launch Terminal CLI',
  portrait: heroImage,
  portraitTag: 'Software Engineer at Securden',
  floatingBadges: [
    { icon: '🛡️', title: 'Security Platform', text: 'PAM, Vault, Password Self-Serv...' },
    { icon: '⚙️', title: 'IDP and DevOps', text: 'AD, Entra ID, Ansible, Jenkins, Ter...' },
  ],
};

export const achievements = {
  badge: '// HONORS_AND_CREDENTIALS',
  sectionTitle: 'Achievements & <span class="gradient-text">Recognition</span>',
  sectionSubtitle: 'Milestones, hackathon triumphs, and academic contributions',
  items: [
    { icon: '🏆', title: 'SIH 2022 Winner', description: 'Winner of Smart India Hackathon 2022, a nationwide initiative to provide students a platform to solve some of the pressing problems we face in our daily lives.' },
    { icon: '🎤', title: 'AI Horizon 2022', description: 'Orchestrated AI Horizon 2022, leading the organization and execution of the event focused on Artificial Intelligence advancements.' },
    { icon: '👨‍🏫', title: 'Peer Mentorship', description: 'Conducted placement training for batchmates covering Web Development (HTML, CSS, JS), Figma designing, Git/GitHub, and hosting static websites with GitHub Pages.' },
    { icon: '⚖️', title: 'Jury Member', description: 'Served as a Jury member for St. Thomas College Internal Hackathon 2024, evaluating innovative projects and selecting teams for the national level.' },
  ],
};

export const testimonials = {
  badge: '// 06. PEER_ENDORSEMENTS',
  sectionTitle: 'Testimonials & <span class="gradient-text">Feedback</span>',
  sectionSubtitle: 'What colleagues, students, and professionals say about my platform guidance and security engineering.',
  items: [],
};

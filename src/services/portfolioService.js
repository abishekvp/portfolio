/**
 * Portfolio content store.
 *
 * All sections are driven by the Portfolio Manager admin API (admin.abishek.in)
 * with local defaults as an instant initial state / offline fallback:
 *   01. Engineering Philosophy & Advisory (#about)
 *   02. Products & Sites Launched (#projects)
 *   03. Enterprise Systems & Leadership (#experience)
 *   04. Mentorship & Guided Projects (#mentorship)
 *   05. Talks, Jury & Events (#events)
 *   06. Endorsements (#testimonials)
 *   07. Contact (#contact)
 *   + Hero (#home), Developer Terminal (#terminal-section), Education & Skills
 */
import { reactive } from 'vue';
import localData from '../data/portfolio.json';
import * as defaults from '../data/defaults.js';
import * as showcase from '../data/showcase.js';

// The SDK keeps one cache per API key (same name as in portfolio_manager.js).
const API_KEY = (import.meta.env.VITE_PORTFOLIO_KEY || '').trim();
const SDK_CACHE_KEY = 'pm_portfolio_cache_v2' + (API_KEY ? '_' + API_KEY.slice(-12) : '');

// Contact types this theme shows as social buttons.
const SOCIAL_TYPES = new Set([
  'linkedin',
  'github',
  'twitter',
  'instagram',
  'youtube',
  'medium',
  'dribbble',
  'behance',
  'stackoverflow',
  'leetcode',
  'telegram',
  'website',
]);

const CONTACT_TYPE_ICONS = {
  email: '📧',
  phone: '📱',
  whatsapp: '💬',
  location: '📍',
  website: '🌐',
  linkedin: '💼',
  github: '🐙',
  twitter: '🐦',
  instagram: '📸',
  youtube: '▶️',
  medium: '✍️',
  dribbble: '🏀',
  behance: '🎨',
  stackoverflow: '📚',
  leetcode: '🧩',
  discord: '🎮',
  telegram: '✈️',
  other: '🔗',
};

function fromLocal() {
  return {
    source: 'local',
    loaded: false,
    profile: {
      name: 'Abishek VP',
      headline: defaults.hero.tagline,
      summary: (localData.about?.bio?.paragraphs || []).join('\n\n'),
      email: 'contact@abishek.in',
      location: 'Chennai, India',
      availability: defaults.hero.badge,
      avatar: defaults.hero.portrait,
      resumeUrl: '',
      resumeFilename: '',
    },
    hero: { ...defaults.hero },
    about: {
      ...localData.about,
      badge: '// 01. PHILOSOPHY & ADVISORY',
      roleBadge: 'SOFTWARE ENGINEER · BUILDER · MENTOR',
      facts: defaults.aboutFacts,
      visible: true,
    },
    projects: {
      ...localData.projects,
      badge: '// 02. LAUNCHED PRODUCTS & SITES',
      groups: showcase.launchedGroups,
      visible: true,
    },
    experience: {
      ...localData.experience,
      badge: '// 03. ENTERPRISE SYSTEMS & LEADERSHIP',
      visible: true,
    },
    mentorship: {
      badge: '// 04. MENTORSHIP & GUIDED BUILDS',
      sectionTitle: 'Mentorship &amp; <span class="gradient-text">Guided Projects</span>',
      sectionSubtitle: 'Coaching developers, advising student teams, and leading problem-driven builds from idea to impact',
      pillarsHeading: 'Mentorship, Coaching & Technical Advisory',
      guidedHeading: 'Guided & Flagship Problem-Solving Builds',
      pillars: showcase.mentorshipPillars,
      guidedProjects: showcase.guidedProjects,
      visible: true,
    },
    events: {
      badge: '// 05. SPEAKING & JURY',
      sectionTitle: 'Talks, Jury &amp; <span class="gradient-text">Events</span>',
      sectionSubtitle: 'Guest lectures and hackathon jury invitations at engineering institutions',
      items: showcase.events,
      visible: true,
    },
    testimonials: { ...defaults.testimonials, visible: true },
    contact: {
      ...localData.contact,
      badge: '// 07. CONNECT',
      formHeading: 'Start a conversation',
      formSubheading: 'Tell me about what you are building, an upcoming event, or how we can collaborate.',
      footerText: 'Designed, built, and operated by Abishek VP.',
      visible: true,
    },
    terminal: {
      visible: true,
      badge: '$ /bin/zsh - interactive CLI',
      sectionTitle: 'Developer <span class="gradient-text">Terminal</span>',
      sectionSubtitle: 'Prefer the command line? Explore my work with a few commands.',
      welcomeSubtitle: 'Securden • Creator of Portfolio Manager & Family Finance • Engineering Mentor & Speaker.',
    },
    education: {
      badge: '// EDUCATION',
      sectionTitle: 'Academic <span class="gradient-text">Foundation</span>',
      sectionSubtitle: 'Computer Science & Engineering at Rajalakshmi Institute of Technology',
      degrees: [
        {
          degree: 'B.E.',
          field_of_study: 'Computer Science and Engineering',
          institution: 'Rajalakshmi Institute of Technology',
          location: 'Chennai, India',
          start_date: 'Aug 2020',
          end_date: 'May 2024',
          grade: 'CGPA: 8.43',
          description: '',
        },
      ],
      groups: [],
      visible: true,
    },
    skills: {
      ...(localData.skills || {}),
      badge: '// TECHNICAL EXPERTISE',
      visible: true,
    },
  };
}

/** Map all sections and content from the admin.abishek.in portfolio bundle. */
function fromApi(d) {
  const local = fromLocal();
  const p = d.profile || {};
  const c = d.custom || {};
  const ch = c.hero || {};
  const ca = c.about || {};
  const cp = c.projects || {};
  const ce = c.experience || {};
  const cm = c.mentorship || {};
  const cev = c.events || {};
  const ct = c.testimonials || {};
  const cc = c.contact || {};
  const cterm = c.terminal || {};

  // Split full_name into first + accent fallback
  const nameParts = (p.full_name || '').trim().split(/\s+/).filter(Boolean);
  const defaultFirst = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : nameParts[0] || local.hero.nameFirst;
  const defaultAccent = nameParts.length > 1 ? nameParts[nameParts.length - 1] : local.hero.nameAccent;

  // About paragraphs & expertise
  const summaryParagraphs = (p.summary || '')
    .split(/\n\s*\n/)
    .map((s) => s.trim())
    .filter(Boolean);

  const expertiseItems =
    Array.isArray(ca.expertise) && ca.expertise.length
      ? ca.expertise
          .map((it) => (typeof it === 'string' ? it : [it.title, it.description].filter(Boolean).join(': ')))
          .filter(Boolean)
      : local.about.whatIDo.items;

  // Projects grouped by category
  const projectGroups = [];
  const projectGroupMap = new Map();
  for (const pr of d.projects || []) {
    const groupName = pr.category || 'Launched Products & Sites';
    if (!projectGroupMap.has(groupName)) {
      const bucket = { group: groupName, items: [] };
      projectGroupMap.set(groupName, bucket);
      projectGroups.push(bucket);
    }
    projectGroupMap.get(groupName).items.push({
      id: pr.id,
      kind: pr.kind || pr.category || 'Product',
      status: pr.status || (pr.is_live ? 'Live' : ''),
      isLive: Boolean(pr.is_live),
      title: pr.title,
      tagline: pr.tagline || '',
      description: pr.description || '',
      highlights: Array.isArray(pr.highlights) ? pr.highlights : [],
      link: pr.project_url || '',
      linkLabel: pr.link_label || '',
      githubUrl: pr.github_url || '',
      tags: Array.isArray(pr.technologies) ? pr.technologies : [],
      image: pr.image_url || '',
    });
  }

  // Experience jobs
  const jobs =
    Array.isArray(d.experience) && d.experience.length
      ? d.experience.map((e) => {
          const endLabel = e.is_current ? 'Present' : e.end_date || '';
          const period = [e.start_date, endLabel].filter(Boolean).join(' – ');
          return {
            id: e.id,
            title: e.job_title,
            job_title: e.job_title,
            company: e.company,
            companyUrl: e.company_url || '',
            location: e.location || '',
            period,
            start_date: e.start_date,
            end_date: e.end_date,
            is_current: e.is_current,
            roleTag: e.role_tag || '',
            description: e.description || '',
            achievements: Array.isArray(e.achievements) ? e.achievements : [],
            technologies: Array.isArray(e.technologies) ? e.technologies : [],
          };
        })
      : local.experience.jobs;

  // Mentorship pillars & guided builds
  const mentorshipRows = Array.isArray(d.mentorship) ? d.mentorship : [];
  const pillars = mentorshipRows
    .filter((m) => m.section !== 'guided')
    .map((m) => ({
      id: m.id,
      role: m.role || '',
      title: m.title,
      org: m.org || '',
      period: m.period || '',
      description: m.description || '',
      outcomes: Array.isArray(m.outcomes) ? m.outcomes : [],
    }));
  const guidedProjects = mentorshipRows
    .filter((m) => m.section === 'guided')
    .map((m) => ({
      id: m.id,
      kind: m.role || '',
      role: m.role || '',
      title: m.title,
      org: m.org || '',
      idea: m.idea || '',
      motive: m.motive || '',
      built: m.built || '',
      link: m.link || '',
    }));

  // Speaking & Jury Events
  const eventItems =
    Array.isArray(d.events) && d.events.length
      ? d.events.map((ev) => ({
          id: ev.id,
          role: ev.role || '',
          title: ev.title,
          host: ev.host || '',
          venue: ev.venue || '',
          place: ev.place || '',
          date: ev.date || '',
          description: ev.description || '',
          link: ev.link || '',
          images: [ev.image_url].filter(Boolean),
        }))
      : local.events.items;

  // Contacts
  const contacts = (d.contacts || []).map((item) => ({
    type: item.type,
    name: item.label,
    icon: item.icon || CONTACT_TYPE_ICONS[item.type] || '🔗',
    value: item.value || item.label,
    link: item.link,
  }));

  // Education & Skills
  const degrees =
    Array.isArray(d.education) && d.education.length
      ? d.education.map((ed) => ({
          id: ed.id,
          degree: ed.degree,
          field_of_study: ed.field_of_study,
          institution: ed.institution,
          location: ed.location,
          start_date: ed.start_date,
          end_date: ed.end_date,
          grade: ed.grade,
          description: ed.description,
        }))
      : local.education.degrees;

  const skillCategories =
    Array.isArray(d.skill_categories) && d.skill_categories.length
      ? d.skill_categories.map((cat) => ({
          name: cat.category,
          icon: cat.icon || '⚡',
          skills: (cat.items || []).map((sk) => ({
            name: sk.name,
            learned: sk.learned || '',
            implemented: sk.implemented || '',
          })),
        }))
      : local.skills.categories;

  return {
    ...local,
    source: 'api',
    loaded: true,
    profile: {
      name: p.full_name || local.profile.name,
      headline: p.headline || local.profile.headline,
      summary: p.summary || local.profile.summary,
      email: p.email || local.profile.email,
      phone: p.phone || '',
      location: p.location || local.profile.location,
      availability: p.availability || local.profile.availability,
      avatar: p.photo_url || local.hero.portrait,
      resumeUrl: p.resume_url || '',
      resumeFilename: p.resume_filename || '',
    },
    hero: {
      ...local.hero,
      badge: ch.badge || p.availability || local.hero.badge,
      nameFirst: ch.name_first || defaultFirst,
      nameAccent: ch.name_accent || defaultAccent,
      tagline: ch.tagline || p.headline || local.hero.tagline,
      description: ch.description || local.hero.description,
      highlights:
        Array.isArray(ch.highlights) && ch.highlights.length ? ch.highlights : local.hero.highlights,
      primaryCta: {
        label: ch.primary_cta_label || local.hero.primaryCta.label,
        href: ch.primary_cta_href || local.hero.primaryCta.href,
      },
      secondaryCta: {
        label: ch.secondary_cta_label || local.hero.secondaryCta.label,
        href: ch.secondary_cta_href || local.hero.secondaryCta.href,
      },
      terminalLabel: ch.terminal_label || local.hero.terminalLabel,
      portrait: p.photo_url || local.hero.portrait,
      portraitTag: ch.portrait_tag || p.location || local.hero.portraitTag,
      floatingBadges:
        Array.isArray(ch.floating_badges) && ch.floating_badges.length
          ? ch.floating_badges
          : local.hero.floatingBadges,
    },
    about: {
      ...local.about,
      visible: ca.visible !== undefined ? Boolean(ca.visible) : local.about.visible,
      badge: ca.badge || local.about.badge,
      sectionTitle: ca.section_title || local.about.sectionTitle,
      sectionSubtitle: ca.section_subtitle || local.about.sectionSubtitle,
      roleBadge: ca.role_badge || local.about.roleBadge,
      whatIDo: {
        title: ca.expertise_title || local.about.whatIDo.title,
        items: expertiseItems,
      },
      bio: {
        title: ca.bio_title || p.headline || local.about.bio.title,
        paragraphs: summaryParagraphs.length ? summaryParagraphs : local.about.bio.paragraphs,
      },
      facts: Array.isArray(ca.facts) && ca.facts.length ? ca.facts : local.about.facts,
    },
    projects: {
      ...local.projects,
      visible: cp.visible !== undefined ? Boolean(cp.visible) : local.projects.visible,
      badge: cp.badge || local.projects.badge,
      sectionTitle: cp.section_title || local.projects.sectionTitle,
      sectionSubtitle: cp.section_subtitle || local.projects.sectionSubtitle,
      groups: projectGroups.length ? projectGroups : local.projects.groups,
    },
    experience: {
      ...local.experience,
      visible: ce.visible !== undefined ? Boolean(ce.visible) : local.experience.visible,
      badge: ce.badge || local.experience.badge,
      sectionTitle: ce.section_title || local.experience.sectionTitle,
      sectionSubtitle: ce.section_subtitle || local.experience.sectionSubtitle,
      jobs,
    },
    mentorship: {
      ...local.mentorship,
      visible: cm.visible !== undefined ? Boolean(cm.visible) : local.mentorship.visible,
      badge: cm.badge || local.mentorship.badge,
      sectionTitle: cm.section_title || local.mentorship.sectionTitle,
      sectionSubtitle: cm.section_subtitle || local.mentorship.sectionSubtitle,
      pillarsHeading: cm.pillars_heading || local.mentorship.pillarsHeading,
      guidedHeading: cm.guided_heading || local.mentorship.guidedHeading,
      pillars: pillars.length ? pillars : local.mentorship.pillars,
      guidedProjects: guidedProjects.length ? guidedProjects : local.mentorship.guidedProjects,
    },
    events: {
      ...local.events,
      visible: cev.visible !== undefined ? Boolean(cev.visible) : local.events.visible,
      badge: cev.badge || local.events.badge,
      sectionTitle: cev.section_title || local.events.sectionTitle,
      sectionSubtitle: cev.section_subtitle || local.events.sectionSubtitle,
      items: eventItems,
    },
    testimonials: {
      ...local.testimonials,
      visible: ct.visible !== undefined ? Boolean(ct.visible) : local.testimonials.visible,
      badge: ct.badge || local.testimonials.badge,
      sectionTitle: ct.section_title || local.testimonials.sectionTitle,
      sectionSubtitle: ct.section_subtitle || local.testimonials.sectionSubtitle,
      items: (d.testimonials || []).map((t) => ({
        name: t.name,
        title: [t.role, t.company].filter(Boolean).join(' at ') || 'Colleague / Collaborator',
        text: t.content,
        rating: t.rating || 5,
        photo: t.photo_url,
        featured: t.is_featured,
      })),
    },
    contact: {
      ...local.contact,
      visible: cc.visible !== undefined ? Boolean(cc.visible) : local.contact.visible,
      badge: cc.badge || local.contact.badge,
      sectionTitle: cc.section_title || local.contact.sectionTitle,
      sectionSubtitle: cc.section_subtitle || local.contact.sectionSubtitle,
      intro: cc.intro || local.contact.intro,
      roles: Array.isArray(cc.roles) && cc.roles.length ? cc.roles : local.contact.roles,
      formHeading: cc.form_heading || local.contact.formHeading,
      formSubheading: cc.form_subheading || local.contact.formSubheading,
      footerText: cc.footer_text || local.contact.footerText,
      methods: contacts.length ? contacts : local.contact.methods,
      socials: contacts.length ? contacts.filter((item) => SOCIAL_TYPES.has(item.type)) : local.contact.socials,
    },
    terminal: {
      ...local.terminal,
      visible: cterm.visible !== undefined ? Boolean(cterm.visible) : local.terminal.visible,
      badge: cterm.badge || local.terminal.badge,
      sectionTitle: cterm.section_title || local.terminal.sectionTitle,
      sectionSubtitle: cterm.section_subtitle || local.terminal.sectionSubtitle,
      welcomeSubtitle: cterm.welcome_subtitle || local.terminal.welcomeSubtitle,
    },
    education: {
      ...local.education,
      degrees,
    },
    skills: {
      ...local.skills,
      sectionTitle: d.skills?.title || local.skills.sectionTitle,
      sectionSubtitle: d.skills?.subtitle || local.skills.sectionSubtitle,
      categories: skillCategories,
    },
  };
}

function readSdkCache() {
  try {
    const raw = window.sessionStorage.getItem(SDK_CACHE_KEY);
    if (!raw) return null;
    const bundle = JSON.parse(raw);
    if (!bundle?.data) return null;
    const media = bundle.media || {};
    const hydrate = (n) =>
      typeof n === 'string'
        ? media[n] || n
        : Array.isArray(n)
          ? n.map(hydrate)
          : n && typeof n === 'object'
            ? Object.fromEntries(Object.entries(n).map(([k, v]) => [k, hydrate(v)]))
            : n;
    return hydrate(bundle.data);
  } catch {
    return null;
  }
}

export const portfolioStore = reactive(fromLocal());

class PortfolioService {
  constructor() {
    this.listeners = [];
    this.started = false;
    const cached = typeof window !== 'undefined' ? readSdkCache() : null;
    if (cached) this.apply(cached, 'cache');
  }

  apply(apiData, source) {
    try {
      Object.assign(portfolioStore, fromApi(apiData), { source });
    } catch (err) {
      console.error('[portfolio] could not apply admin data, keeping previous content', err);
      return;
    }
    this.listeners.forEach((cb) => {
      try {
        cb(portfolioStore);
      } catch (err) {
        console.error('PortfolioService subscriber error:', err);
      }
    });
  }

  /** Connect to the SDK. Safe to call more than once. */
  init() {
    if (this.started || typeof window === 'undefined') return;
    this.started = true;

    window.addEventListener('portfolio:data', (e) => this.apply(e.detail.data, e.detail.source));
    const sdk = window.PortfolioManager;
    if (sdk?.data) this.apply(sdk.data, 'sdk');
  }

  subscribe(callback) {
    this.listeners.push(callback);
    callback(portfolioStore);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }

  getData() {
    return portfolioStore;
  }
}

export const portfolioService = new PortfolioService();

/**
 * Portfolio content store.
 *
 * Personal content (profile, contacts, experience, skills, projects, ...) comes from the
 * admin portal through the Portfolio Manager SDK (admin.abishek.in/api/portfolio_manager.js,
 * added to index.html by vite.config.js with this site's API key, VITE_PORTFOLIO_KEY). The SDK fetches one bundle with everything — images included as
 * base64 data URIs — and keeps it in sessionStorage, so later page loads in the same session
 * render instantly without a network round-trip. This store:
 *   1. hydrates synchronously from that sessionStorage cache (if present),
 *   2. listens for fresh data from the SDK ('portfolio:data' events),
 *   3. falls back to the bundled portfolio.json when the admin API is unreachable.
 * Theme texts (hero copy, badges, section headers) stay in this codebase; any of them can be
 * overridden from the admin's "Custom content" (read here with pick(custom, group, key, default)).
 */
import { reactive } from 'vue';
import localData from '../data/portfolio.json';
import * as defaults from '../data/defaults.js';

// The SDK keeps one cache per API key (same name as in portfolio_manager.js).
const API_KEY = (import.meta.env.VITE_PORTFOLIO_KEY || '').trim();
const SDK_CACHE_KEY = 'pm_portfolio_cache_v2' + (API_KEY ? '_' + API_KEY.slice(-12) : '');

const JOB_TYPE_LABELS = { full_time: 'Full Time', part_time: 'Part Time', internship: 'Internship', freelance: 'Freelance', contract: 'Contract' };

// Contact types this theme shows as social buttons, and its default icons.
const SOCIAL_TYPES = new Set(['linkedin', 'github', 'twitter', 'instagram', 'youtube', 'medium', 'dribbble', 'behance', 'stackoverflow', 'leetcode', 'telegram', 'website']);
const TYPE_ICONS = {
  email: '📧', phone: '📱', whatsapp: '💬', website: '🌐', linkedin: '💼', github: '💻', twitter: '🐦', instagram: '📷',
  youtube: '▶️', medium: '✍️', dribbble: '🏀', behance: '🎨', stackoverflow: '📚', leetcode: '🧩', telegram: '✈️', location: '📍',
};

/** Theme content and offline fallback: section headers, badges and copy are part of this design. */
function fromLocal() {
  return {
    source: 'local',
    loaded: false,
    profile: { name: 'Abishek VP', email: 'contact@abishek.in' },
    resumeUrl: '/resume.pdf',
    resumeFilename: 'Abishek_VP_Resume.pdf',
    hero: { ...defaults.hero },
    about: { ...localData.about, badge: '// 02. SYSTEM_SPECIFICATION', roleBadge: 'ROLE: SENIOR_SOFTWARE_ENGINEER', visible: true },
    achievements: { ...defaults.achievements, visible: true },
    skills: { ...localData.skills, badge: '// 03. CAPABILITIES_MATRIX', visible: true },
    projects: { ...localData.projects, badge: '// 04. ARCHITECTURAL_BUILDS', visible: true },
    experience: { ...localData.experience, badge: '// 05. CAREER_TRAJECTORY', visible: true },
    education: { badge: '', sectionTitle: 'Education', sectionSubtitle: '', items: [], visible: false },
    testimonials: { ...defaults.testimonials, visible: true },
    contact: {
      ...localData.contact,
      badge: '// 07. COMMUNICATION_CHANNELS',
      formHeading: 'Send a Direct Transmission',
      formSubheading: 'Whether you want to discuss platform engineering, security architectures, mentorship, or new opportunities.',
      footerText: 'Architected with high-assurance platform standards.',
      visible: true,
    },
  };
}

/** A custom content value (admin → Custom content), or the theme default when it is not set. */
function pick(custom, group, key, fallback) {
  const v = custom?.[group]?.[key];
  return v == null || v === '' || (Array.isArray(v) && !v.length) ? fallback : v;
}

/** Map the admin API bundle onto the shapes the section components render. */
function fromApi(d) {
  const local = fromLocal();
  const p = d.profile || {};
  const c = d.custom || {};

  // "Abishek VP" -> "Abishek" + highlighted "VP"
  const words = String(p.full_name || '').trim().split(/\s+/).filter(Boolean);
  const nameFirst = words.length > 1 ? words.slice(0, -1).join(' ') : words[0] || local.hero.nameFirst;
  const nameAccent = words.length > 1 ? words[words.length - 1] : '';
  const period = (start, end, current) => [start, current ? 'Present' : end].filter(Boolean).join(' – ');
  const summary = String(p.summary || '').split(/\n\s*\n/).map((x) => x.trim()).filter(Boolean);
  const expertise = c.about?.expertise;

  const contacts = (d.contacts || []).map((ct) => ({
    type: ct.type,
    name: ct.label,
    icon: ct.icon || TYPE_ICONS[ct.type] || '🔗',
    value: ct.value || ct.label,
    link: ct.link,
  }));

  return {
    source: 'api',
    loaded: true,
    profile: { name: p.full_name, email: p.email, headline: p.headline, location: p.location, availability: p.availability, avatar: p.photo_url },
    resumeUrl: p.resume_url || '/resume.pdf',
    resumeFilename: p.resume_filename || 'Resume.pdf',
    hero: {
      badge: pick(c, 'hero', 'badge', local.hero.badge),
      nameFirst: pick(c, 'hero', 'name', nameFirst),
      nameAccent: pick(c, 'hero', 'name_accent', nameAccent),
      tagline: pick(c, 'hero', 'tagline', local.hero.tagline),
      description: pick(c, 'hero', 'description', local.hero.description),
      highlights: pick(c, 'hero', 'highlights', local.hero.highlights),
      primaryCta: {
        label: pick(c, 'hero', 'primary_cta_label', local.hero.primaryCta.label),
        href: pick(c, 'hero', 'primary_cta_href', local.hero.primaryCta.href),
      },
      resumeLabel: pick(c, 'hero', 'resume_label', local.hero.resumeLabel),
      terminalLabel: pick(c, 'hero', 'terminal_label', local.hero.terminalLabel),
      portrait: pick(c, 'hero', 'portrait', p.photo_url || local.hero.portrait),
      portraitTag: pick(c, 'hero', 'portrait_tag', local.hero.portraitTag),
      floatingBadges: pick(c, 'hero', 'floating_badges', local.hero.floatingBadges),
    },
    about: {
      ...local.about,
      whatIDo: {
        title: pick(c, 'about', 'expertise_title', local.about.whatIDo.title),
        items: Array.isArray(expertise) && expertise.length
          ? expertise.map((e) => (e.description ? `${e.title}: ${e.description}` : e.title))
          : local.about.whatIDo.items,
      },
      bio: { title: p.headline || local.about.bio.title, paragraphs: summary.length ? summary : local.about.bio.paragraphs },
      roleBadge: pick(c, 'about', 'role_badge', local.about.roleBadge),
      highlights: pick(c, 'about', 'highlights', local.about.highlights),
    },
    achievements: {
      ...local.achievements,
      items: (d.achievements || []).map((a) => ({
        icon: a.icon, title: a.title, description: a.description, issuer: a.issuer, date: a.date_label, link: a.link, image: a.image_url,
      })),
    },
    skills: {
      ...local.skills,
      categories: (d.skill_categories || []).map((cat) => ({
        name: cat.name,
        icon: cat.icon,
        skills: cat.skills.map((sk) => ({ name: sk.name, icon: sk.icon, proficiency: sk.proficiency, learned: sk.learned, implemented: sk.implemented })),
      })),
    },
    projects: {
      ...local.projects,
      items: (d.projects || []).map((pr) => ({
        id: pr.id, title: pr.title, description: pr.description, tags: pr.tags || [], demo: pr.demo_url, github: pr.github_url, image: pr.image_url, featured: pr.is_featured,
      })),
    },
    experience: {
      ...local.experience,
      jobs: (d.experience || []).map((e) => ({
        title: e.job_title,
        company: e.company,
        companyUrl: e.company_url,
        period: period(e.start_date, e.end_date, e.is_current),
        is_current: e.is_current,
        description: e.description,
        achievements: e.achievements || [],
        technologies: e.technologies || [],
        jobType: e.job_type,
        jobTypeLabel: JOB_TYPE_LABELS[e.job_type] || '',
        location: e.location,
        logo: e.logo_url,
      })),
    },
    education: { ...local.education, items: d.education || [] },
    testimonials: {
      ...local.testimonials,
      items: (d.testimonials || []).map((t) => ({
        name: t.name,
        title: [t.role, t.company].filter(Boolean).join(' at ') || 'Colleague / Client',
        text: t.content,
        rating: t.rating || 5,
        photo: t.photo_url,
        featured: t.is_featured,
      })),
    },
    contact: {
      ...local.contact,
      intro: pick(c, 'contact', 'intro', local.contact.intro),
      roles: pick(c, 'contact', 'roles', local.contact.roles),
      formHeading: pick(c, 'contact', 'form_heading', local.contact.formHeading),
      formSubheading: pick(c, 'contact', 'form_subheading', local.contact.formSubheading),
      methods: contacts.length ? contacts : local.contact.methods,
      socials: contacts.length ? contacts.filter((ct) => SOCIAL_TYPES.has(ct.type)) : local.contact.socials,
      footerText: pick(c, 'contact', 'footer_text', local.contact.footerText),
    },
  };
}

function readSdkCache() {
  try {
    const raw = window.sessionStorage.getItem(SDK_CACHE_KEY);
    if (!raw) return null;
    const bundle = JSON.parse(raw);
    if (!bundle?.data) return null;
    // Swap media URLs for the inline base64 images kept in the cache.
    const media = bundle.media || {};
    const hydrate = (n) =>
      typeof n === 'string' ? media[n] || n
        : Array.isArray(n) ? n.map(hydrate)
        : n && typeof n === 'object' ? Object.fromEntries(Object.entries(n).map(([k, v]) => [k, hydrate(v)]))
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

    // Every SDK update (cache hit, network refresh) is broadcast as a DOM event.
    window.addEventListener('portfolio:data', (e) => this.apply(e.detail.data, e.detail.source));
    // The SDK may have published before the app mounted.
    const sdk = window.PortfolioManager;
    if (sdk?.data) this.apply(sdk.data, 'sdk');
  }

  /** Legacy API: callback with the current store now and on every update. */
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

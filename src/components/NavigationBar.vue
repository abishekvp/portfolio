<template>
  <header class="mobile-navbar-container">
    <!-- Fixed Top Navigation Bar for Mobile -->
    <nav class="mobile-topbar" :class="{ 'scrolled': isScrolled, 'menu-open': mobileMenuOpen }">
      <!-- Brand Logo on Left -->
      <a href="#home" class="mobile-brand" @click="handleNavClick('home')">
        <span class="pulse-dot"></span>
        <span class="brand-title-text font-mono">
          <span class="terminal-prompt">$</span> Abishek.<span class="gradient-text">VP</span>
        </span>
      </a>

      <!-- 3-Line Hamburger Button that rotates into Close Mark (X) -->
      <button
        class="mobile-toggle-btn"
        :class="{ 'is-open': mobileMenuOpen }"
        @click="toggleMobileMenu"
        :aria-expanded="mobileMenuOpen"
        aria-label="Toggle navigation menu"
      >
        <div class="hamburger-box">
          <span class="hamburger-line line-top"></span>
          <span class="hamburger-line line-mid"></span>
          <span class="hamburger-line line-bot"></span>
        </div>
      </button>
    </nav>

    <!-- Backdrop Dimmer (click to close) -->
    <transition name="fade">
      <div
        v-if="mobileMenuOpen"
        class="mobile-backdrop"
        @click="closeMobileMenu"
        aria-hidden="true"
      ></div>
    </transition>

    <!-- Slide-Down Glassmorphic Dropdown Drawer -->
    <transition name="drawer-slide">
      <div v-if="mobileMenuOpen" class="mobile-drawer">
        <div class="drawer-inner">
          <!-- Section Navigation Links -->
          <div class="drawer-section-title font-mono">Navigation</div>
          <div class="drawer-nav-grid">
            <a
              v-for="(item, index) in navItems"
              :key="item.id"
              :href="`#${item.id}`"
              class="drawer-nav-link"
              :class="{ 'active': activeSection === item.id }"
              :style="{ animationDelay: `${index * 0.035}s` }"
              @click="handleNavClick(item.id)"
            >
              <span class="nav-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path :d="item.iconPath" />
                </svg>
              </span>
              <span class="nav-text">{{ item.label }}</span>
              <span v-if="activeSection === item.id" class="active-pill"></span>
            </a>
          </div>

          <div class="drawer-divider"></div>

          <!-- Quick Action Buttons: Terminal & CV -->
          <div class="drawer-actions">
            <button
              class="drawer-action-btn terminal-btn font-mono"
              @click="handleTerminalClick"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="4 17 10 11 4 5"></polyline>
                <line x1="12" y1="19" x2="20" y2="19"></line>
              </svg>
              <span>Terminal CLI</span>
            </button>

            <a
              :href="resumeUrl"
              :download="resumeFilename"
              class="drawer-action-btn cv-btn font-mono"
              data-track="resume"
              @click="closeMobileMenu"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>Download CV</span>
            </a>
          </div>

          <div class="drawer-divider"></div>

          <!-- Mobile Theme Switcher Grid -->
          <div class="theme-selection-area">
            <div class="drawer-section-title font-mono">
              Theme: <span class="active-theme-name gradient-text">{{ currentThemeLabel }}</span>
            </div>
            <div class="themes-pill-grid">
              <button
                v-for="t in themes"
                :key="t.id"
                class="theme-pill-btn"
                :class="{ 'theme-selected': currentTheme === t.id }"
                @click="setTheme(t.id)"
              >
                <span class="theme-dot" :style="{ background: t.color }"></span>
                <span class="theme-label font-mono">{{ t.label }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script>
import { portfolioStore } from '../services/portfolioService';

export default {
  name: "NavigationBar",
  emits: ["toggle-terminal"],
  data() {
    return {
      mobileMenuOpen: false,
      isScrolled: false,
      activeSection: "home",
      observer: null,
      currentTheme: "ocean",
      themes: [
        { id: "velvet", label: "Velvet 3D", color: "#a855f7" },
        { id: "terminal", label: "Matrix CLI", color: "#10b981" },
        { id: "ocean", label: "Ocean", color: "#0ea5e9" },
        { id: "emerald", label: "Emerald", color: "#10b981" },
        { id: "neored", label: "Neo Red", color: "#9e2a2b" },
        { id: "amethyst", label: "Amethyst", color: "#8b5cf6" },
        { id: "sunset", label: "Sunset", color: "#f97316" },
        { id: "snow", label: "Snow", color: "#ffffff" },
        { id: "silver", label: "Silver", color: "#94a3b8" },
      ],
      navItems: [
        {
          id: "home",
          label: "Home",
          iconPath: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
        },
        {
          id: "about",
          label: "About",
          iconPath: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
        },
        {
          id: "experience",
          label: "Experience",
          iconPath: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z",
        },
        {
          id: "projects",
          label: "Products",
          iconPath: "M12 2 2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5",
        },
        {
          id: "skills",
          label: "Skills",
          iconPath: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
        },
        {
          id: "education",
          label: "Education",
          iconPath: "M22 10 12 5 2 10l10 5 10-5z M6 12v5c3 3 9 3 12 0v-5",
        },
        {
          id: "events",
          label: "Events",
          iconPath: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z M19 10v2a7 7 0 0 1-14 0v-2 M12 19v3",
        },
        {
          id: "testimonials",
          label: "Testimonials",
          iconPath: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z",
        },
        {
          id: "terminal-section",
          label: "Terminal",
          iconPath: "M4 17l6-6-6-6m8 14h8",
        },
        {
          id: "contact",
          label: "Contact",
          iconPath: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
        },
      ],
    };
  },
  computed: {
    resumeUrl() {
      return portfolioStore.resumeUrl;
    },
    resumeFilename() {
      return portfolioStore.resumeFilename;
    },
    currentThemeLabel() {
      const t = this.themes.find((th) => th.id === this.currentTheme);
      return t ? t.label : "Ocean";
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, { passive: true });
    window.addEventListener("keydown", this.handleKeyDown);
    const savedTheme = localStorage.getItem("theme") || "ocean";
    this.currentTheme = savedTheme;
    this.initScrollSpy();
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("keydown", this.handleKeyDown);
    if (this.observer) {
      this.observer.disconnect();
    }
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 25;
    },
    handleKeyDown(e) {
      if (e.key === "Escape" && this.mobileMenuOpen) {
        this.closeMobileMenu();
      }
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
      if (this.mobileMenuOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false;
      document.body.style.overflow = "";
    },
    handleNavClick(id) {
      this.activeSection = id;
      this.closeMobileMenu();
    },
    handleTerminalClick() {
      this.closeMobileMenu();
      this.$emit("toggle-terminal");
    },
    setTheme(themeId) {
      this.currentTheme = themeId;
      document.documentElement.setAttribute("data-theme", themeId);
      localStorage.setItem("theme", themeId);
    },
    initScrollSpy() {
      const sectionIds = this.navItems.map((item) => item.id);
      const elements = sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean);

      if (elements.length === 0) return;

      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.activeSection = entry.target.id;
            }
          });
        },
        {
          rootMargin: "-25% 0px -65% 0px",
          threshold: 0,
        }
      );

      elements.forEach((el) => this.observer.observe(el));
    },
  },
};
</script>

<style scoped>
/* ==========================================================================
   Desktop: Fully Hidden
   ========================================================================== */
@media (min-width: 769px) {
  .mobile-navbar-container {
    display: none !important;
  }
}

/* ==========================================================================
   Mobile Only Styles (<= 768px)
   ========================================================================== */
@media (max-width: 768px) {
  .font-mono {
    font-family: var(--font-mono);
  }

  .mobile-navbar-container {
    display: block;
  }

  /* Fixed Top Navigation Bar */
  .mobile-topbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 64px;
    padding: 0 1.15rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(10, 15, 28, 0.82);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--glass-border);
    box-shadow: 0 4px 25px rgba(0, 0, 0, 0.45);
    z-index: 1200;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .mobile-topbar.scrolled {
    background: rgba(8, 12, 22, 0.94);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.65), 0 0 15px var(--color-glow-1);
    border-bottom-color: var(--glass-border-hover);
  }

  .mobile-topbar.menu-open {
    background: rgba(8, 12, 22, 0.98);
  }

  /* Brand Logo */
  .mobile-brand {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    text-decoration: none;
    user-select: none;
  }

  .brand-title-text {
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-text-primary);
    letter-spacing: 0.4px;
  }

  .terminal-prompt {
    color: #10b981;
  }

  /* Pulse dot */
  .pulse-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #10b981;
    box-shadow: 0 0 10px #10b981;
    animation: pulseGlow 2s infinite ease-in-out;
  }

  @keyframes pulseGlow {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.4;
      transform: scale(0.85);
    }
  }

  /* ==========================================================================
     3-Line Hamburger to Close Mark (X) with Fluid Rotate Animation
     ========================================================================== */
  .mobile-toggle-btn {
    position: relative;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-md);
    cursor: pointer;
    padding: 0;
    outline: none;
    transition: background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
    -webkit-tap-highlight-color: transparent;
  }

  .mobile-toggle-btn:hover,
  .mobile-toggle-btn:focus-visible {
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--color-accent-primary);
    box-shadow: 0 0 14px var(--color-glow-1);
  }

  .mobile-toggle-btn.is-open {
    background: rgba(var(--accent-rgb, 14, 165, 233), 0.15);
    border-color: var(--color-accent-primary);
    box-shadow: 0 0 18px var(--color-glow-1);
  }

  .hamburger-box {
    position: relative;
    width: 22px;
    height: 18px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    /* Rotation animation for the container */
    transition: transform 0.45s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .hamburger-line {
    display: block;
    width: 100%;
    height: 2.2px;
    background: var(--color-text-primary);
    border-radius: 4px;
    transform-origin: center;
    transition: transform 0.35s cubic-bezier(0.68, -0.55, 0.265, 1.55),
                opacity 0.25s ease,
                background-color 0.25s ease;
  }

  /* When Menu is Open:
     1. The entire container rotates 180 degrees
     2. The top line translates down by 8px and rotates 45 degrees
     3. The middle line scales to 0 and fades out
     4. The bottom line translates up by 8px and rotates -45 degrees
     => Smoothly morphs into a crisp close 'X' mark!
  */
  .mobile-toggle-btn.is-open .hamburger-box {
    transform: rotate(180deg);
  }

  .mobile-toggle-btn.is-open .line-top {
    transform: translateY(7.9px) rotate(45deg);
    background: var(--color-accent-primary);
  }

  .mobile-toggle-btn.is-open .line-mid {
    opacity: 0;
    transform: scaleX(0);
  }

  .mobile-toggle-btn.is-open .line-bot {
    transform: translateY(-7.9px) rotate(-45deg);
    background: var(--color-accent-primary);
  }

  /* Backdrop Dimmer */
  .mobile-backdrop {
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.72);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    z-index: 1150;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  /* Slide-Down Glassmorphic Drawer */
  .mobile-drawer {
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    max-height: calc(100vh - 64px);
    overflow-y: auto;
    overscroll-behavior: contain;
    background: rgba(10, 14, 26, 0.96);
    backdrop-filter: blur(28px);
    -webkit-backdrop-filter: blur(28px);
    border-bottom: 1px solid var(--glass-border);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.9), 0 0 20px var(--color-glow-1);
    z-index: 1160;
  }

  .drawer-inner {
    padding: 1.25rem 1.15rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .drawer-section-title {
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.75px;
  }

  .active-theme-name {
    margin-left: 0.35rem;
    font-weight: 800;
  }

  /* Nav Links Grid */
  .drawer-nav-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.4rem;
  }

  .drawer-nav-link {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding: 0.75rem 1rem;
    border-radius: var(--radius-md);
    color: var(--color-text-secondary);
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 500;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.04);
    transition: all 0.2s ease;
    animation: itemPopIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes itemPopIn {
    0% {
      opacity: 0;
      transform: translateY(-8px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .drawer-nav-link:hover {
    background: rgba(255, 255, 255, 0.08);
    color: var(--color-text-primary);
    transform: translateX(4px);
  }

  .drawer-nav-link.active {
    background: rgba(var(--accent-rgb, 14, 165, 233), 0.16);
    border-color: var(--color-accent-primary);
    color: var(--color-accent-primary);
    box-shadow: 0 0 15px var(--color-glow-1);
  }

  .nav-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: inherit;
  }

  .nav-text {
    flex: 1;
  }

  .active-pill {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--color-accent-primary);
    box-shadow: 0 0 8px var(--color-accent-primary);
  }

  .drawer-divider {
    height: 1px;
    width: 100%;
    background: rgba(255, 255, 255, 0.08);
    margin: 0.25rem 0;
  }

  /* Actions Area */
  .drawer-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }

  .drawer-action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 0.6rem;
    border-radius: var(--radius-md);
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s ease;
    border: 1px solid var(--glass-border);
    -webkit-tap-highlight-color: transparent;
  }

  .terminal-btn {
    background: rgba(16, 185, 129, 0.1);
    color: #10b981;
    border-color: rgba(16, 185, 129, 0.3);
  }

  .terminal-btn:hover {
    background: rgba(16, 185, 129, 0.2);
    box-shadow: 0 0 15px rgba(16, 185, 129, 0.25);
  }

  .cv-btn {
    background: rgba(var(--accent-rgb, 14, 165, 233), 0.12);
    color: var(--color-accent-primary);
    border-color: var(--glass-border);
  }

  .cv-btn:hover {
    background: rgba(var(--accent-rgb, 14, 165, 233), 0.22);
    box-shadow: 0 0 15px var(--color-glow-1);
  }

  /* Themes Selection Area */
  .theme-selection-area {
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
  }

  .themes-pill-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.45rem;
  }

  .theme-pill-btn {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.5rem 0.55rem;
    border-radius: var(--radius-sm);
    background: #0e1526;
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: var(--color-text-secondary);
    cursor: pointer;
    transition: all 0.15s ease;
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }

  .theme-pill-btn:hover {
    background: #1a243b;
    border-color: rgba(255, 255, 255, 0.2);
  }

  .theme-pill-btn.theme-selected {
    background: #1e2b48;
    border-color: var(--color-accent-primary);
    box-shadow: 0 0 10px var(--color-glow-1);
    color: var(--color-text-primary);
  }

  .theme-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
    border: 1px solid rgba(255, 255, 255, 0.35);
  }

  .theme-label {
    font-size: 0.72rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Drawer Transitions */
  .drawer-slide-enter-active {
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
  }

  .drawer-slide-leave-active {
    transition: transform 0.25s cubic-bezier(0.4, 0, 1, 1), opacity 0.2s ease;
  }

  .drawer-slide-enter-from,
  .drawer-slide-leave-to {
    transform: translateY(-12px);
    opacity: 0;
  }
}
</style>

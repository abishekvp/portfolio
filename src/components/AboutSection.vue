<template>
  <section v-if="aboutData.visible" id="about" class="section about-section">
    <div class="container-wide">
      <div class="section-title">
        <div class="code-badge mb-2">
          <span>{{ aboutData.badge }}</span>
        </div>
        <h2 v-html="aboutData.sectionTitle"></h2>
        <p class="text-secondary">{{ aboutData.sectionSubtitle }}</p>
      </div>

      <div class="about-container">
        <div class="about-narrative glass-card">
          <!-- Terminal Header Bar -->
          <div class="terminal-bar mb-4">
            <div class="terminal-dots">
              <span class="terminal-dot red"></span>
              <span class="terminal-dot yellow"></span>
              <span class="terminal-dot green"></span>
              <span class="terminal-tag">about.md</span>
            </div>
            <div class="terminal-status font-mono">
              <span class="status-indicator"></span>
              <span>IDENTITY &bull; PAM &bull; SECRETS</span>
            </div>
          </div>

          <!-- Two-column responsive layout for wide screen -->
          <div class="about-grid">
            <!-- Left: Narrative Bio -->
            <div class="about-bio-col">
              <div v-if="aboutData.roleBadge" class="narrative-badge">
                <span>{{ aboutData.roleBadge }}</span>
              </div>

              <h3 class="narrative-headline">{{ aboutData.bio.title }}</h3>

              <div class="narrative-paragraphs">
                <p v-for="(paragraph, index) in aboutData.bio.paragraphs" :key="index">
                  {{ paragraph }}
                </p>
              </div>
            </div>

            <!-- Right: Quick Facts Grid & Focus Areas -->
            <div class="about-side-col">
              <!-- Quick Facts -->
              <div v-if="aboutData.facts && aboutData.facts.length" class="side-card glass">
                <div class="side-card-header font-mono">
                  <span class="code-prompt">$</span> cat facts.json
                </div>
                <div class="stat-grid">
                  <div v-for="fact in aboutData.facts" :key="fact.label" class="stat-card">
                    <span class="stat-label font-mono">{{ fact.label }}</span>
                    <strong class="stat-val">{{ fact.value }}</strong>
                  </div>
                </div>
              </div>

              <!-- Core Focus Areas -->
              <div class="side-card glass">
                <div class="side-card-header font-mono">
                  <span class="code-prompt">$</span> grep -i "core_focus"
                </div>
                <div class="focus-pills">
                  <span v-for="item in focusItems" :key="item" class="focus-pill font-mono">
                    <span class="pill-bullet">&gt;</span> {{ item }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { portfolioStore } from "../services/portfolioService";

export default {
  name: "AboutSection",
  computed: {
    aboutData() {
      return portfolioStore.about;
    },
    focusItems() {
      if (this.aboutData.whatIDo?.items?.length) {
        return this.aboutData.whatIDo.items;
      }
      return [
        'Privileged Access Management (PAM)',
        'DevOps Secrets & CI/CD Plugins',
        'Microsoft Entra ID Delta Sync',
        'Password Self-Service & JIT Access',
        'Go · Java · Python · Ruby · Vue',
        'Smart India Hackathon Winner \'22',
      ];
    },
  },
};
</script>

<style scoped>
.about-section {
  position: relative;
  z-index: 1;
}

.mb-2 { margin-bottom: 0.75rem; }
.mb-4 { margin-bottom: 1.5rem; }

.font-mono {
  font-family: var(--font-mono);
}

.about-container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

.about-narrative {
  display: flex;
  flex-direction: column;
  background: rgba(15, 23, 42, 0.45);
  border: 1px solid var(--glass-border);
  padding: 2.25rem 2.5rem;
  border-radius: var(--radius-lg);
  transition: border-color var(--transition-base), box-shadow var(--transition-base);
}

.about-narrative:hover {
  border-color: var(--glass-border-hover);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
}

/* Terminal bar */
.terminal-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.terminal-dots {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.terminal-tag {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--color-text-muted);
  margin-left: 0.5rem;
}

.terminal-status {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  color: var(--color-accent-tertiary);
}

.status-indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
}

/* 2-Column Grid Layout */
.about-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
  gap: 2.5rem;
  align-items: stretch;
}

.about-bio-col {
  display: flex;
  flex-direction: column;
}

.narrative-badge {
  display: inline-flex;
  align-self: flex-start;
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  background: rgba(14, 165, 233, 0.12);
  border: 1px solid rgba(14, 165, 233, 0.35);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--color-accent-tertiary);
  margin-bottom: 1.15rem;
}

.narrative-headline {
  font-size: 1.65rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 1.25rem;
  line-height: 1.3;
}

.narrative-paragraphs {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--color-text-secondary);
}

/* Side Column */
.about-side-col {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.side-card {
  padding: 1.25rem 1.4rem;
  border-radius: var(--radius-md);
  background: rgba(10, 15, 28, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.side-card-header {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  letter-spacing: 0.04em;
  padding-bottom: 0.5rem;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.code-prompt {
  color: #10b981;
}

/* Fast Facts 2x2 Grid */
.stat-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.85rem;
}

.stat-card {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.9rem 1rem;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: all var(--transition-fast);
}

.stat-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: var(--glass-border-hover);
  transform: translateY(-2px);
}

.stat-label {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
}

.stat-val {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-accent-tertiary);
  line-height: 1.35;
}

/* Focus Pills */
.focus-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.focus-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.75rem;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.78rem;
  color: var(--color-text-secondary);
  transition: all var(--transition-fast);
}

.focus-pill:hover {
  border-color: var(--glass-border-hover);
  color: var(--color-accent-tertiary);
  transform: translateY(-1px);
}

.pill-bullet {
  color: var(--color-accent-primary);
  font-size: 0.75rem;
  font-weight: bold;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .about-narrative {
    padding: 1.5rem;
  }

  .terminal-status {
    display: none;
  }
}

@media (max-width: 520px) {
  .stat-grid {
    grid-template-columns: 1fr;
  }
}
</style>
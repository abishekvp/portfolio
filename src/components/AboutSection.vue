<template>
  <section v-if="aboutData.visible" id="about" class="section about-section">
    <div class="container">
      <div class="section-title">
        <div class="code-badge mb-2">
          <span>{{ aboutData.badge }}</span>
        </div>
        <h2 v-html="aboutData.sectionTitle"></h2>
        <p class="text-secondary">{{ aboutData.sectionSubtitle }}</p>
      </div>

      <div class="about-container">
        <div class="about-narrative glass-card">
          <div class="terminal-dots mb-3">
            <span class="terminal-dot red"></span>
            <span class="terminal-dot yellow"></span>
            <span class="terminal-dot green"></span>
            <span class="terminal-tag ml-auto">about.md</span>
          </div>

          <div v-if="aboutData.roleBadge" class="narrative-badge">
            <span>{{ aboutData.roleBadge }}</span>
          </div>

          <h3 class="narrative-headline">{{ aboutData.bio.title }}</h3>

          <div class="narrative-paragraphs">
            <p v-for="(paragraph, index) in aboutData.bio.paragraphs" :key="index">
              {{ paragraph }}
            </p>
          </div>

          <!-- Stat Strip (replaces FOCUS / SHIPPING SINCE / BASE) -->
          <div v-if="aboutData.facts && aboutData.facts.length" class="stat-strip">
            <div v-for="fact in aboutData.facts" :key="fact.label" class="stat-card glass">
              <span class="stat-label font-mono">{{ fact.label }}</span>
              <strong class="stat-val">{{ fact.value }}</strong>
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
  },
};
</script>

<style scoped>
.about-section {
  position: relative;
  z-index: 1;
}

.mb-2 { margin-bottom: 0.75rem; }
.mb-3 { margin-bottom: 1rem; }
.ml-auto { margin-left: auto; }

.font-mono {
  font-family: var(--font-mono);
}

.terminal-tag {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.about-container {
  max-width: 920px;
  margin: 0 auto;
}

.about-narrative {
  display: flex;
  flex-direction: column;
  background: rgba(15, 23, 42, 0.45);
  border: 1px solid var(--glass-border);
  padding: var(--spacing-2xl);
  border-radius: var(--radius-lg);
}

.narrative-badge {
  display: inline-flex;
  align-self: flex-start;
  padding: 0.3rem 0.8rem;
  border-radius: 9999px;
  background: rgba(14, 165, 233, 0.12);
  border: 1px solid rgba(14, 165, 233, 0.35);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--color-accent-tertiary);
  margin-bottom: 1rem;
}

.narrative-headline {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 1.25rem;
}

.narrative-paragraphs {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
}

/* Stat strip */
.stat-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.stat-card {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1rem 1.15rem;
  border-radius: var(--radius-md);
  background: rgba(10, 15, 28, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all var(--transition-fast);
}

.stat-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--glass-border-hover);
  transform: translateY(-2px);
}

.stat-label {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
}

.stat-val {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-accent-tertiary);
  line-height: 1.4;
}

@media (max-width: 900px) {
  .stat-strip {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .about-narrative {
    padding: var(--spacing-lg);
  }

  .stat-strip {
    grid-template-columns: 1fr;
  }
}
</style>

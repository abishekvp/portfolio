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

      <div class="about-content">
        <!-- Left Column: Core Competencies Box -->
        <div class="about-card-left glass-card">
          <div class="terminal-dots mb-3">
            <span class="terminal-dot red"></span>
            <span class="terminal-dot yellow"></span>
            <span class="terminal-dot green"></span>
            <span class="terminal-tag ml-auto">CORE_STACK.yaml</span>
          </div>

          <h3 class="competency-title">{{ aboutData.whatIDo.title }}</h3>
          
          <div class="competency-list">
            <div
              v-for="(item, index) in aboutData.whatIDo.items"
              :key="index"
              class="competency-item"
            >
              <div class="competency-header">
                <span class="competency-bullet">#{{ index + 1 }}</span>
                <div class="competency-text-block">
                  <strong class="competency-name text-accent">{{ item.split(': ')[0] }}:</strong>
                  <span class="competency-desc">{{ item.split(': ').slice(1).join(': ') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Bio Narrative -->
        <div class="about-narrative glass-card">
          <div v-if="aboutData.roleBadge" class="narrative-badge">
            <span>{{ aboutData.roleBadge }}</span>
          </div>

          <h3 class="narrative-headline">{{ aboutData.bio.title }}</h3>
          
          <div class="narrative-paragraphs">
            <p v-for="(paragraph, index) in aboutData.bio.paragraphs" :key="index">
              {{ paragraph }}
            </p>
          </div>

          <dl v-if="aboutData.facts && aboutData.facts.length" class="about-facts">
            <div v-for="fact in aboutData.facts" :key="fact.label" class="fact">
              <dt>{{ fact.label }}</dt>
              <dd>{{ fact.value }}</dd>
            </div>
          </dl>
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

.terminal-tag {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1.35fr;
  gap: var(--spacing-xl);
  align-items: stretch;
}

/* Left Card */
.about-card-left {
  display: flex;
  flex-direction: column;
  background: rgba(15, 23, 42, 0.45);
  border: 1px solid var(--glass-border);
}

.competency-title {
  font-size: 1.25rem;
  margin-bottom: 1.25rem;
  color: var(--color-text-primary);
}

.competency-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.competency-item {
  padding: 0.85rem;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.03);
  border-left: 3px solid var(--color-accent-primary);
  transition: all var(--transition-fast);
}

.competency-item:hover {
  background: rgba(255, 255, 255, 0.06);
  transform: translateX(4px);
}

.competency-header {
  display: flex;
  gap: 0.75rem;
  font-size: 0.92rem;
  line-height: 1.5;
}

.competency-bullet {
  font-family: var(--font-mono);
  color: var(--color-accent-tertiary);
  font-weight: 700;
}

.competency-name {
  margin-right: 0.35em;
}

.competency-text {
  color: var(--color-text-secondary);
}

/* Right Narrative Card */
.about-narrative {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: rgba(15, 23, 42, 0.45);
}

.narrative-badge {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: #10b981;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
}

.narrative-headline {
  font-size: 1.6rem;
  margin-bottom: 1rem;
  color: var(--color-text-primary);
}

.narrative-paragraphs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--color-text-secondary);
  margin-bottom: 1.5rem;
}

/* Facts row */
.about-facts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  margin: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 1.25rem;
}

.fact {
  padding: 0 1rem;
  border-left: 1px solid rgba(255, 255, 255, 0.08);
}

.fact:first-child {
  padding-left: 0;
  border-left: none;
}

.fact dt {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 0.3rem;
}

.fact dd {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

@media (max-width: 1024px) {
  .about-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .about-facts {
    grid-template-columns: 1fr;
    gap: 0.9rem;
  }

  .fact {
    padding: 0;
    border-left: none;
  }
}
</style>

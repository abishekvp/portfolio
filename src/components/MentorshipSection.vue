<template>
  <section v-if="data.visible" id="mentorship" class="section mentorship-section">
    <div class="container-wide">
      <div class="section-title">
        <div class="code-badge mb-2">
          <span>{{ data.badge }}</span>
        </div>
        <h2 v-html="data.sectionTitle"></h2>
        <p class="text-secondary">{{ data.sectionSubtitle }}</p>
      </div>

      <!-- Part 1: Mentorship & Developer Guidance Pillars -->
      <div v-if="data.pillars && data.pillars.length" class="mentorship-block">
        <h3 class="group-title font-mono">{{ data.pillarsHeading || 'Mentorship, Coaching & Technical Advisory' }}</h3>

        <div class="pillars-grid">
          <article
            v-for="pillar in data.pillars"
            :key="pillar.title"
            class="pillar-card glass-card"
          >
            <div class="card-top">
              <span class="kind-chip">{{ pillar.role }}</span>
              <span v-if="pillar.period" class="card-date font-mono">{{ pillar.period }}</span>
            </div>

            <h4 class="card-title">{{ pillar.title }}</h4>
            <p class="card-org">{{ pillar.org }}</p>
            <p class="card-desc">{{ pillar.description }}</p>

            <ul v-if="pillar.outcomes && pillar.outcomes.length" class="pillar-outcomes">
              <li v-for="(outcome, i) in pillar.outcomes" :key="i">
                <span class="outcome-bullet">▸</span>
                <span>{{ outcome }}</span>
              </li>
            </ul>
          </article>
        </div>
      </div>

      <!-- Part 2: Guided & Flagship Problem-Solving Builds -->
      <div v-if="data.guidedProjects && data.guidedProjects.length" class="mentorship-block">
        <h3 class="group-title font-mono">{{ data.guidedHeading || 'Guided & Flagship Problem-Solving Builds' }}</h3>

        <div class="guided-grid">
          <article
            v-for="item in data.guidedProjects"
            :key="item.title"
            class="guided-card glass-card"
          >
            <div class="card-top">
              <span class="kind-chip is-accent">{{ item.kind }}</span>
            </div>

            <h4 class="card-title">{{ item.title }}</h4>
            <p class="card-org">{{ item.org }}</p>

            <dl class="story">
              <div>
                <dt>The Problem</dt>
                <dd>{{ item.idea }}</dd>
              </div>
              <div>
                <dt>The Objective</dt>
                <dd>{{ item.motive }}</dd>
              </div>
              <div>
                <dt>Architecture &amp; Outcome</dt>
                <dd>{{ item.built }}</dd>
              </div>
            </dl>

            <div v-if="item.link" class="card-foot">
              <a :href="item.link" target="_blank" rel="noopener" class="card-link font-mono">
                View Project Repository ↗
              </a>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { portfolioStore } from "../services/portfolioService";

export default {
  name: "MentorshipSection",
  computed: {
    data() {
      return portfolioStore.mentorship;
    },
  },
};
</script>

<style scoped>
.mentorship-section {
  position: relative;
  z-index: 1;
}

.mb-2 {
  margin-bottom: 0.75rem;
}

.font-mono {
  font-family: var(--font-mono);
}

.mentorship-block + .mentorship-block {
  margin-top: var(--spacing-2xl);
}

.group-title {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent-tertiary);
  margin-bottom: var(--spacing-lg);
}

.group-title::after {
  content: "";
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
}

/* Mentorship Pillars Grid (3 columns on desktop) */
.pillars-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--spacing-lg);
}

/* Guided Projects Grid (2 columns on desktop) */
.guided-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--spacing-lg);
}

.pillar-card,
.guided-card {
  display: flex;
  flex-direction: column;
  padding: 1.65rem;
  background: rgba(15, 23, 42, 0.45);
  border: 1px solid var(--glass-border);
  transition: border-color var(--transition-fast), transform var(--transition-fast), box-shadow var(--transition-fast);
}

.pillar-card:hover,
.guided-card:hover {
  transform: translateY(-4px);
  border-color: var(--glass-border-hover);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.5), 0 0 20px var(--color-glow-1);
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 0.85rem;
}

.kind-chip {
  padding: 0.2rem 0.65rem;
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: var(--color-accent-tertiary);
  background: var(--color-tag-bg);
  border: 1px solid var(--color-tag-border);
}

.kind-chip.is-accent {
  color: #34d399;
  border-color: rgba(52, 211, 153, 0.35);
  background: rgba(16, 185, 129, 0.1);
}

.card-date {
  font-size: 0.78rem;
  color: var(--color-text-muted);
}

.card-title {
  font-size: 1.25rem;
  line-height: 1.35;
  color: var(--color-text-primary);
}

.card-org {
  margin-top: 0.25rem;
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--color-accent-tertiary);
}

.card-desc {
  margin-top: 0.85rem;
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--color-text-secondary);
}

.pillar-outcomes {
  list-style: none;
  padding: 0.85rem 1rem;
  margin: 1.1rem 0 0;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  margin-top: auto;
}

.pillar-outcomes li {
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  font-size: 0.86rem;
  line-height: 1.5;
  color: var(--color-text-secondary);
}

.outcome-bullet {
  color: var(--color-accent-primary);
  font-weight: 700;
  flex-shrink: 0;
}

.story {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin: 1rem 0 0;
  flex-grow: 1;
}

.story dt {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent-primary);
  margin-bottom: 0.15rem;
}

.story dd {
  margin: 0;
  font-size: 0.93rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.card-foot {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 1.15rem;
  padding-top: 0.95rem;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}

.card-link {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-accent-tertiary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.card-link:hover {
  color: var(--color-accent-primary);
  text-decoration: underline;
}

@media (max-width: 1024px) {
  .pillars-grid {
    grid-template-columns: 1fr;
  }

  .guided-grid {
    grid-template-columns: 1fr;
  }
}
</style>

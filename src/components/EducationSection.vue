<template>
  <section v-if="edu.visible" id="education" class="section education-section">
    <div class="container">
      <div class="section-title">
        <div class="code-badge mb-2">
          <span>{{ edu.badge }}</span>
        </div>
        <h2 v-html="edu.sectionTitle"></h2>
        <p class="text-secondary">{{ edu.sectionSubtitle }}</p>
      </div>

      <!-- Degree -->
      <div v-for="(deg, i) in edu.degrees" :key="i" class="degree-card glass-card">
        <div class="degree-icon" aria-hidden="true">🎓</div>
        <div class="degree-body">
          <h3>{{ [deg.degree, deg.field_of_study].filter(Boolean).join(', ') }}</h3>
          <p class="degree-inst">{{ deg.institution }}</p>
          <p class="degree-meta font-mono">
            {{ [period(deg), deg.location, deg.grade].filter(Boolean).join(' · ') }}
          </p>
          <p v-if="deg.description" class="degree-desc">{{ deg.description }}</p>
        </div>
      </div>

      <!-- What I did during college -->
      <div v-for="group in edu.groups" :key="group.group" class="academic-group">
        <h3 class="group-title font-mono">{{ group.group }}</h3>

        <div class="academic-grid">
          <article
            v-for="item in group.items"
            :key="item.title"
            :class="['academic-card', 'glass-card', { 'is-project': item.idea }]"
          >
            <div class="card-top">
              <span class="kind-chip">{{ item.kind }}</span>
              <span v-if="item.date" class="card-date font-mono">{{ item.date }}</span>
            </div>
            <h4 class="card-title">{{ item.title }}</h4>
            <p class="card-org">{{ item.org }}</p>

            <p v-if="item.description" class="card-desc">{{ item.description }}</p>

            <dl v-if="item.idea" class="story">
              <div>
                <dt>The idea</dt>
                <dd>{{ item.idea }}</dd>
              </div>
              <div>
                <dt>Why it mattered</dt>
                <dd>{{ item.motive }}</dd>
              </div>
              <div>
                <dt>What I built</dt>
                <dd>{{ item.built }}</dd>
              </div>
            </dl>

            <div v-if="(item.tags && item.tags.length) || item.link" class="card-foot">
              <div class="card-tags">
                <span v-for="tag in item.tags || []" :key="tag" class="tag">{{ tag }}</span>
              </div>
              <a v-if="item.link" :href="item.link" target="_blank" rel="noopener" class="card-link">
                Source ↗
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
  name: "EducationSection",
  computed: {
    edu() {
      return portfolioStore.education;
    },
  },
  methods: {
    period(d) {
      return [d.start_date, d.end_date].filter(Boolean).join(' – ');
    },
  },
};
</script>

<style scoped>
.education-section {
  position: relative;
  z-index: 1;
}

.mb-2 {
  margin-bottom: 0.75rem;
}

.font-mono {
  font-family: var(--font-mono);
}

/* Degree */
.degree-card {
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
  padding: var(--spacing-lg);
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid var(--glass-border);
  margin-bottom: var(--spacing-xl);
}

.degree-icon {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: var(--radius-md);
  font-size: 1.7rem;
  background: var(--color-tag-bg);
  border: 1px solid var(--color-tag-border);
}

.degree-body h3 {
  font-size: 1.3rem;
  color: var(--color-text-primary);
}

.degree-inst {
  margin-top: 0.2rem;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--color-accent-tertiary);
}

.degree-meta {
  margin-top: 0.4rem;
  font-size: 0.82rem;
  color: var(--color-text-muted);
}

.degree-desc {
  margin-top: 0.75rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* Groups */
.academic-group + .academic-group {
  margin-top: var(--spacing-xl);
}

.group-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-md);
}

.group-title::after {
  content: "";
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
}

.academic-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
  gap: var(--spacing-md);
}

/* Cards */
.academic-card {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background: rgba(15, 23, 42, 0.45);
  border: 1px solid var(--glass-border);
  transition: border-color var(--transition-fast), transform var(--transition-fast);
}

.academic-card:hover {
  transform: translateY(-3px);
  border-color: var(--glass-border-hover);
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.8rem;
}

.kind-chip {
  padding: 0.18rem 0.6rem;
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: var(--color-accent-tertiary);
  background: var(--color-tag-bg);
  border: 1px solid var(--color-tag-border);
}

.card-date {
  font-size: 0.78rem;
  color: var(--color-text-muted);
}

.card-title {
  font-size: 1.15rem;
  line-height: 1.35;
  color: var(--color-text-primary);
}

.card-org {
  margin-top: 0.2rem;
  font-size: 0.88rem;
  color: var(--color-text-muted);
}

.card-desc {
  margin-top: 0.8rem;
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--color-text-secondary);
}

.story {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 1rem 0 0;
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
  justify-content: space-between;
  gap: 1rem;
  margin-top: auto;
  padding-top: 1.1rem;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tag {
  padding: 0.18rem 0.55rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--glass-border);
  color: var(--color-accent-tertiary);
}

.card-link {
  flex-shrink: 0;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-accent-tertiary);
  text-decoration: none;
}

.card-link:hover {
  text-decoration: underline;
}

@media (max-width: 860px) {
  .academic-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 520px) {
  .degree-card {
    flex-direction: column;
  }
}
</style>

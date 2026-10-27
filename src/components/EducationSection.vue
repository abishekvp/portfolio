<template>
  <section v-if="edu.visible" id="education" class="section education-section">
    <div class="container">
      <div class="section-title">
        <div class="code-badge mb-2">
          <span>{{ edu.badge || '// EDUCATION' }}</span>
        </div>
        <h2 v-html="edu.sectionTitle || 'Academic <span class=\'gradient-text\'>Foundation</span>'"></h2>
        <p class="text-secondary">{{ edu.sectionSubtitle || 'Computer Science & Engineering at Rajalakshmi Institute of Technology' }}</p>
      </div>

      <!-- Degree Card -->
      <div class="education-container">
        <div v-for="(deg, i) in degrees" :key="i" class="degree-card glass-card">
          <div class="degree-icon" aria-hidden="true">🎓</div>
          <div class="degree-body">
            <h3 class="degree-title">{{ [deg.degree, deg.field_of_study].filter(Boolean).join(' in ') }}</h3>
            <p class="degree-inst gradient-text">{{ deg.institution }}</p>
            <div class="degree-meta font-mono">
              <span class="meta-item">{{ period(deg) }}</span>
              <span class="meta-sep">·</span>
              <span class="meta-item">{{ deg.location }}</span>
              <span v-if="deg.grade" class="meta-sep">·</span>
              <span v-if="deg.grade" class="grade-badge">{{ deg.grade }}</span>
            </div>
            <p v-if="deg.description" class="degree-desc">{{ deg.description }}</p>
          </div>
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
    degrees() {
      return this.edu.degrees || [
        {
          degree: "B.E.",
          field_of_study: "Computer Science and Engineering",
          institution: "Rajalakshmi Institute of Technology",
          location: "Chennai, India",
          start_date: "2020",
          end_date: "2024",
          grade: "CGPA: 8.43",
        },
      ];
    },
  },
  methods: {
    period(d) {
      return [d.start_date, d.end_date].filter(Boolean).join(" – ");
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

.education-container {
  max-width: 840px;
  margin: 0 auto;
}

.degree-card {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  padding: var(--spacing-xl);
  background: rgba(15, 23, 42, 0.45);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  transition: all var(--transition-fast);
}

.degree-card:hover {
  transform: translateY(-2px);
  border-color: var(--glass-border-hover);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
}

.degree-icon {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  border-radius: var(--radius-md);
  font-size: 2rem;
  background: rgba(14, 165, 233, 0.1);
  border: 1px solid rgba(14, 165, 233, 0.25);
}

.degree-body {
  flex-grow: 1;
}

.degree-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.35rem;
}

.degree-inst {
  font-size: 1.05rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.degree-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.meta-sep {
  color: var(--color-text-muted);
}

.grade-badge {
  padding: 0.15rem 0.55rem;
  border-radius: var(--radius-sm);
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #10b981;
  font-weight: 600;
}

.degree-desc {
  margin-top: 0.75rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

@media (max-width: 640px) {
  .degree-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>

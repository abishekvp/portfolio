<template>
  <section v-if="skillsData.visible" id="skills" class="section skills-section">
    <div class="container">
      <div class="section-title">
        <div class="code-badge mb-2">
          <span>{{ skillsData.badge || '// SKILLS' }}</span>
        </div>
        <h2 v-html="skillsData.sectionTitle || 'Technical <span class=\'gradient-text\'>Skills</span>'"></h2>
        <p class="text-secondary">{{ skillsData.sectionSubtitle || 'Core competencies, infrastructure tooling, and languages' }}</p>
      </div>

      <div class="skills-grid">
        <div
          v-for="group in skillCategories"
          :key="group.category || group.name"
          class="skill-card glass-card"
        >
          <div class="card-header">
            <span class="card-icon">{{ group.icon || '⚡' }}</span>
            <h3 class="card-title">{{ group.category || group.name }}</h3>
          </div>

          <div class="skills-tags">
            <span
              v-for="skill in getSkillNames(group.skills || group.items)"
              :key="skill"
              :class="['skill-pill', 'font-mono', (group.category === 'Strong' || group.name === 'Strong') ? 'is-strong' : '']"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { portfolioStore } from "../services/portfolioService";
import { skillsGroups } from "../data/showcase";

export default {
  name: "SkillsSection",
  computed: {
    skillsData() {
      return portfolioStore.skills;
    },
    skillCategories() {
      if (this.skillsData.categories && this.skillsData.categories.length) {
        return this.skillsData.categories;
      }
      return skillsGroups;
    },
  },
  methods: {
    getSkillNames(skills) {
      if (!Array.isArray(skills)) return [];
      return skills.map((s) => (typeof s === "string" ? s : s.name || ""));
    },
  },
};
</script>

<style scoped>
.skills-section {
  position: relative;
  z-index: 1;
}

.mb-2 {
  margin-bottom: 0.75rem;
}

.font-mono {
  font-family: var(--font-mono);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--spacing-xl);
}

.skill-card {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-xl);
  background: rgba(15, 23, 42, 0.45);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  transition: all var(--transition-fast);
}

.skill-card:hover {
  transform: translateY(-3px);
  border-color: var(--glass-border-hover);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.45);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.card-icon {
  font-size: 1.4rem;
}

.card-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
}

.skills-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.skill-pill {
  font-size: 0.85rem;
  padding: 0.35rem 0.75rem;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--color-text-secondary);
  transition: all var(--transition-fast);
}

.skill-pill:hover {
  background: rgba(255, 255, 255, 0.08);
  color: var(--color-text-primary);
  border-color: var(--glass-border-hover);
}

.skill-pill.is-strong {
  background: rgba(14, 165, 233, 0.12);
  border-color: rgba(14, 165, 233, 0.35);
  color: var(--color-accent-tertiary);
  font-weight: 600;
}

@media (max-width: 640px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>

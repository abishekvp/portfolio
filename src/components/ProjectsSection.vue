<template>
  <section v-if="projectsData.visible" id="projects" class="section projects-section">
    <div class="container-wide">
      <div class="section-title">
        <div class="code-badge mb-2">
          <span>{{ projectsData.badge || '// PROJECTS' }}</span>
        </div>
        <h2 v-html="projectsData.sectionTitle"></h2>
        <p class="text-secondary">{{ projectsData.sectionSubtitle }}</p>
      </div>

      <div class="projects-grid">
        <article
          v-for="project in projectList"
          :key="project.id"
          class="project-card glass-card"
        >
          <header class="project-head">
            <span
              :class="['badge-pill', 'font-mono', project.badge.includes('Live') ? 'badge-live' : 'badge-academic']"
            >
              <span class="status-dot"></span>
              {{ project.badge }}
            </span>
          </header>

          <h3 class="project-title">{{ project.title }}</h3>
          <p class="project-desc">{{ project.description }}</p>

          <div class="project-tech-tags">
            <span v-for="tag in project.tech" :key="tag" class="tech-tag font-mono">
              {{ tag }}
            </span>
          </div>

          <div class="project-links">
            <a
              v-for="link in project.links"
              :key="link.url"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="project-link-btn font-mono"
            >
              <span>{{ link.label }}</span>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
import { portfolioStore } from "../services/portfolioService";
import { projects as defaultProjects } from "../data/showcase";

export default {
  name: "ProjectsSection",
  computed: {
    projectsData() {
      return portfolioStore.projects;
    },
    projectList() {
      // If store has items, use them, otherwise fallback to default showcase projects
      if (this.projectsData.items && this.projectsData.items.length) {
        return this.projectsData.items;
      }
      return defaultProjects;
    },
  },
};
</script>

<style scoped>
.projects-section {
  position: relative;
  z-index: 1;
}

.mb-2 {
  margin-bottom: 0.75rem;
}

.font-mono {
  font-family: var(--font-mono);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--spacing-xl);
}

.project-card {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-xl);
  background: rgba(15, 23, 42, 0.45);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
}

.project-card:hover {
  transform: translateY(-4px);
  border-color: var(--glass-border-hover);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5), 0 0 20px var(--color-glow-1);
}

.project-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.3rem 0.75rem;
  border-radius: 9999px;
  letter-spacing: 0.04em;
}

.badge-live {
  background: rgba(16, 185, 129, 0.12);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.35);
}

.badge-live .status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
}

.badge-academic {
  background: rgba(14, 165, 233, 0.12);
  color: #38bdf8;
  border: 1px solid rgba(14, 165, 233, 0.35);
}

.badge-academic .status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #38bdf8;
}

.project-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.65rem;
}

.project-desc {
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--color-text-secondary);
  flex-grow: 1;
  margin-bottom: 1.25rem;
}

.project-tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.tech-tag {
  font-size: 0.75rem;
  padding: 0.25rem 0.6rem;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--color-accent-tertiary);
}

.project-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.project-link-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  color: var(--color-text-primary);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--glass-border);
  padding: 0.45rem 0.85rem;
  border-radius: var(--radius-sm);
  text-decoration: none;
  transition: all var(--transition-fast);
}

.project-link-btn:hover {
  background: rgba(255, 255, 255, 0.09);
  border-color: var(--glass-border-hover);
  color: var(--color-accent-primary);
  transform: translateY(-2px);
}

@media (max-width: 900px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>

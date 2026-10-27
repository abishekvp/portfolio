<template>
  <section v-if="experienceData.visible" id="experience" class="section experience-section">
    <div class="container">
      <div class="section-title">
        <div class="code-badge mb-2">
          <span>{{ experienceData.badge }}</span>
        </div>
        <h2 v-html="experienceData.sectionTitle"></h2>
        <p class="text-secondary">{{ experienceData.sectionSubtitle }}</p>
      </div>

      <div class="timeline">
        <div
          v-for="(exp, index) in allJobs"
          :key="index"
          class="timeline-item"
        >
          <div class="timeline-marker">
            <div class="timeline-dot">
              <span class="pulse-dot"></span>
            </div>
            <div
              v-if="index < allJobs.length - 1"
              class="timeline-line"
            ></div>
          </div>

          <div class="timeline-content glass-card">
            <div class="timeline-header">
              <div>
                <div class="job-status-tag font-mono">
                  <span class="status-marker">●</span>
                  <span>{{ exp.roleTag || exp.employmentType || 'EXPERIENCE' }}</span>
                </div>
                <h3 class="job-heading">
                  {{ exp.title }}
                  <span class="company-sep">·</span>
                  <a
                    v-if="exp.companyUrl"
                    :href="exp.companyUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="company-link gradient-text"
                  >
                    {{ exp.company }}
                    <span class="link-icon">↗</span>
                  </a>
                  <span v-else class="company-plain gradient-text">{{ exp.company }}</span>
                </h3>
              </div>

              <div class="timeline-meta font-mono">
                <span class="period-badge">{{ exp.period }}</span>
                <span v-if="exp.location" class="location-badge">· {{ exp.location }}</span>
              </div>
            </div>

            <p class="role-desc font-mono">{{ exp.description }}</p>

            <div class="achievements" v-if="exp.achievements && exp.achievements.length">
              <div
                v-for="(achievement, i) in exp.achievements"
                :key="i"
                class="achievement"
              >
                <span class="achievement-bullet">▸</span>
                <span>{{ achievement }}</span>
              </div>
            </div>

            <!-- Public Plugins Block (Directly under Securden) -->
            <div v-if="exp.plugins && exp.plugins.length" class="plugins-block">
              <div class="plugins-header">
                <div class="plugins-title-wrap">
                  <span class="plugins-icon">📦</span>
                  <h4 class="plugins-title">Public DevOps Plugins</h4>
                </div>
                <span class="plugins-total-badge font-mono">3,900+ public downloads</span>
              </div>

              <div class="plugins-table-wrapper">
                <table class="plugins-table">
                  <thead>
                    <tr>
                      <th>Plugin</th>
                      <th>Language</th>
                      <th>Where to find it</th>
                      <th class="text-right">Downloads</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="plug in exp.plugins" :key="plug.name">
                      <td class="font-semibold">{{ plug.name }}</td>
                      <td>
                        <span class="lang-tag font-mono">{{ plug.language }}</span>
                      </td>
                      <td>
                        <a
                          v-if="plug.url"
                          :href="plug.url"
                          target="_blank"
                          rel="noopener"
                          class="registry-link"
                        >
                          {{ plug.platform }} ↗
                        </a>
                        <span v-else class="text-muted">{{ plug.platform }}</span>
                      </td>
                      <td class="text-right font-mono">{{ plug.downloads }}</td>
                    </tr>
                  </tbody>
                </table>
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
  name: "ExperienceSection",
  computed: {
    experienceData() {
      return portfolioStore.experience;
    },
    allJobs() {
      return this.experienceData.jobs || [];
    },
  },
};
</script>

<style scoped>
.experience-section {
  position: relative;
  z-index: 1;
}

.mb-2 {
  margin-bottom: 0.75rem;
}

.font-mono {
  font-family: var(--font-mono);
}

.text-right {
  text-align: right;
}

.timeline {
  position: relative;
  padding: var(--spacing-md) 0;
}

.timeline-item {
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-marker {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.timeline-dot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(14, 165, 233, 0.15);
  border: 1px solid var(--color-accent-primary);
  z-index: 2;
  box-shadow: 0 0 15px rgba(14, 165, 233, 0.4);
}

.timeline-line {
  position: absolute;
  top: 32px;
  bottom: -32px;
  width: 2px;
  background: linear-gradient(
    to bottom,
    var(--color-accent-primary),
    rgba(14, 165, 233, 0.1)
  );
}

.timeline-content {
  padding: var(--spacing-xl);
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid var(--glass-border);
  transition: all var(--transition-base);
}

.timeline-content:hover {
  border-color: var(--glass-border-hover);
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.job-status-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--color-accent-tertiary);
  margin-bottom: 0.35rem;
}

.status-marker {
  font-size: 0.6rem;
}

.job-heading {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--color-text-primary);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.company-sep {
  color: var(--color-text-muted);
}

.company-link {
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  transition: color var(--transition-fast);
}

.company-link:hover {
  text-decoration: underline;
}

.link-icon {
  font-size: 0.85em;
}

.timeline-meta {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.period-badge {
  padding: 0.25rem 0.6rem;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--color-text-secondary);
}

.role-desc {
  font-size: 0.88rem;
  color: var(--color-accent-tertiary);
  margin-bottom: 1.25rem;
  letter-spacing: 0.02em;
}

.achievements {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.achievement {
  display: flex;
  gap: 0.75rem;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.achievement-bullet {
  color: var(--color-accent-tertiary);
  font-weight: bold;
}

/* Public Plugins Block */
.plugins-block {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px dashed rgba(255, 255, 255, 0.12);
}

.plugins-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.plugins-title-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.plugins-icon {
  font-size: 1.2rem;
}

.plugins-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
}

.plugins-total-badge {
  font-size: 0.78rem;
  font-weight: 600;
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
}

.plugins-table-wrapper {
  overflow-x: auto;
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.plugins-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
  background: rgba(10, 15, 28, 0.55);
}

.plugins-table th {
  text-align: left;
  padding: 0.75rem 1rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
}

.plugins-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  color: var(--color-text-secondary);
}

.plugins-table tr:last-child td {
  border-bottom: none;
}

.plugins-table tr:hover td {
  background: rgba(255, 255, 255, 0.03);
}

.font-semibold {
  font-weight: 600;
  color: var(--color-text-primary);
}

.lang-tag {
  font-size: 0.75rem;
  padding: 0.15rem 0.5rem;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-accent-tertiary);
}

.registry-link {
  color: var(--color-accent-primary);
  text-decoration: none;
  font-weight: 500;
}

.registry-link:hover {
  text-decoration: underline;
}

.text-muted {
  color: var(--color-text-muted);
}

@media (max-width: 768px) {
  .timeline-item {
    grid-template-columns: 1fr;
    gap: var(--spacing-sm);
  }

  .timeline-marker {
    display: none;
  }

  .timeline-content {
    padding: var(--spacing-lg);
  }
}
</style>

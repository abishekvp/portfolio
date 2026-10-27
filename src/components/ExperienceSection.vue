<template>
  <section v-if="experienceData.visible" id="experience" class="section experience-section">
    <div class="container-wide">
      <div class="section-title">
        <div class="code-badge mb-2">
          <span>{{ experienceData.badge }}</span>
        </div>
        <h2 v-html="experienceData.sectionTitle"></h2>
        <p class="text-secondary">{{ experienceData.sectionSubtitle }}</p>
      </div>

      <div class="timeline" v-if="allJobs.length">
        <!-- 1. Featured Lead Experience (Securden) -->
        <div v-if="featuredJob" class="timeline-item featured-timeline-item">
          <div class="timeline-marker">
            <div class="timeline-dot">
              <span class="pulse-dot"></span>
            </div>
            <div
              v-if="priorJobs.length"
              class="timeline-line"
            ></div>
          </div>

          <div class="timeline-content glass-card featured-content">
            <div class="timeline-header">
              <div>
                <div class="job-status-tag font-mono">
                  <span class="status-marker">●</span>
                  <span>{{ featuredJob.roleTag || featuredJob.employmentType || 'CURRENT ROLE · FULL-TIME' }}</span>
                </div>
                <h3 class="job-heading">
                  {{ featuredJob.title }}
                  <span class="company-sep">·</span>
                  <a
                    v-if="featuredJob.companyUrl"
                    :href="featuredJob.companyUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="company-link gradient-text"
                  >
                    {{ featuredJob.company }}
                    <span class="link-icon">↗</span>
                  </a>
                  <span v-else class="company-plain gradient-text">{{ featuredJob.company }}</span>
                </h3>
              </div>

              <div class="timeline-meta font-mono">
                <span class="period-badge">{{ featuredJob.period }}</span>
                <span v-if="featuredJob.location" class="location-badge">· {{ featuredJob.location }}</span>
              </div>
            </div>

            <p class="role-desc font-mono">{{ featuredJob.description }}</p>

            <!-- Wide Split Layout: Achievements on Left, Plugins on Right -->
            <div :class="['featured-body-grid', { 'has-plugins': featuredJob.plugins && featuredJob.plugins.length }]">
              <div class="featured-achievements-col">
                <div class="col-subheading font-mono">
                  <span>// KEY ACHIEVEMENTS & PRODUCTION IMPACT</span>
                </div>
                <div class="achievements" v-if="featuredJob.achievements && featuredJob.achievements.length">
                  <div
                    v-for="(achievement, i) in featuredJob.achievements"
                    :key="i"
                    class="achievement"
                  >
                    <span class="achievement-bullet">▸</span>
                    <span>{{ achievement }}</span>
                  </div>
                </div>
              </div>

              <!-- Public Plugins Block -->
              <div v-if="featuredJob.plugins && featuredJob.plugins.length" class="featured-plugins-col">
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
                        <th>Platform</th>
                        <th class="text-right">Downloads</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="plug in featuredJob.plugins" :key="plug.name">
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

        <!-- 2. Prior Roles & Early Engineering: 3-Card Multi-Column Grid -->
        <div v-if="priorJobs.length" class="timeline-item prior-timeline-item">
          <div class="timeline-marker">
            <div class="timeline-dot prior-dot">
              <span class="dot-inner"></span>
            </div>
          </div>

          <div class="timeline-content prior-timeline-content">
            <div class="prior-section-header">
              <div class="prior-header-left">
                <div class="job-status-tag font-mono">
                  <span class="status-marker">○</span>
                  <span>EARLIER EXPERIENCE & INTERNSHIPS</span>
                </div>
                <h3 class="prior-section-title">
                  Foundational Roles &amp; Client Engineering
                </h3>
              </div>
              <div class="prior-header-meta font-mono">
                <span class="period-badge">2021 – 2024</span>
              </div>
            </div>

            <!-- Responsive Card Grid spanning full 1400px width -->
            <div class="prior-cards-grid">
              <div
                v-for="(exp, index) in priorJobs"
                :key="exp.company || index"
                class="prior-card glass-card"
              >
                <div class="prior-card-top">
                  <span class="prior-tag font-mono">{{ exp.roleTag || exp.employmentType }}</span>
                  <span class="prior-period font-mono">{{ exp.period }}</span>
                </div>

                <h4 class="prior-job-title">{{ exp.title }}</h4>

                <div class="prior-company-line">
                  <a
                    v-if="exp.companyUrl"
                    :href="exp.companyUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="company-link gradient-text font-semibold"
                  >
                    {{ exp.company }}
                    <span class="link-icon">↗</span>
                  </a>
                  <span v-else class="company-plain gradient-text font-semibold">{{ exp.company }}</span>
                  <span v-if="exp.location" class="prior-location font-mono">· {{ exp.location }}</span>
                </div>

                <p class="prior-desc font-mono">{{ exp.description }}</p>

                <div class="prior-achievements" v-if="exp.achievements && exp.achievements.length">
                  <div
                    v-for="(achievement, i) in exp.achievements"
                    :key="i"
                    class="prior-achievement"
                  >
                    <span class="achievement-bullet">▸</span>
                    <span>{{ achievement }}</span>
                  </div>
                </div>

                <!-- Fallback in case a prior job also has plugins -->
                <div v-if="exp.plugins && exp.plugins.length" class="plugins-block mt-3">
                  <div class="plugins-table-wrapper">
                    <table class="plugins-table">
                      <thead>
                        <tr>
                          <th>Plugin</th>
                          <th>Platform</th>
                          <th class="text-right">Downloads</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="plug in exp.plugins" :key="plug.name">
                          <td class="font-semibold">{{ plug.name }}</td>
                          <td>
                            <a v-if="plug.url" :href="plug.url" target="_blank" rel="noopener" class="registry-link">{{ plug.platform }} ↗</a>
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
    featuredJob() {
      return this.allJobs[0] || null;
    },
    priorJobs() {
      return this.allJobs.slice(1);
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

.mt-3 {
  margin-top: 1rem;
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
  width: 100%;
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

.timeline-dot.prior-dot {
  background: rgba(14, 165, 233, 0.08);
  border-color: rgba(14, 165, 233, 0.4);
  box-shadow: 0 0 10px rgba(14, 165, 233, 0.2);
}

.dot-inner {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-accent-tertiary);
}

.timeline-line {
  position: absolute;
  top: 32px;
  bottom: -32px;
  width: 2px;
  background: linear-gradient(
    to bottom,
    var(--color-accent-primary),
    rgba(14, 165, 233, 0.2)
  );
}

/* Featured Job Card */
.featured-content {
  padding: 2.25rem;
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid var(--glass-border);
  transition: all var(--transition-base);
}

.featured-content:hover {
  border-color: var(--glass-border-hover);
  transform: translateY(-2px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
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
  font-size: 1.4rem;
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
  padding: 0.25rem 0.65rem;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--color-text-secondary);
}

.role-desc {
  font-size: 0.9rem;
  color: var(--color-accent-tertiary);
  margin-bottom: 1.5rem;
  letter-spacing: 0.02em;
}

/* Featured Body Grid: 2-Column Split across wide width */
.featured-body-grid.has-plugins {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  gap: 2rem;
  align-items: start;
}

.col-subheading {
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
  margin-bottom: 0.9rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.08);
}

.achievements {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.achievement {
  display: flex;
  gap: 0.75rem;
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--color-text-secondary);
}

.achievement-bullet {
  color: var(--color-accent-tertiary);
  font-weight: bold;
}

/* Plugins Block */
.featured-plugins-col {
  display: flex;
  flex-direction: column;
}

.plugins-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 0.9rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.08);
}

.plugins-title-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.plugins-icon {
  font-size: 1.1rem;
}

.plugins-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
}

.plugins-total-badge {
  font-size: 0.75rem;
  font-weight: 600;
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  padding: 0.2rem 0.6rem;
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
  font-size: 0.85rem;
  background: rgba(10, 15, 28, 0.55);
}

.plugins-table th {
  text-align: left;
  padding: 0.7rem 0.85rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
}

.plugins-table td {
  padding: 0.65rem 0.85rem;
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
  font-size: 0.72rem;
  padding: 0.15rem 0.45rem;
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

/* ==================== Prior Roles Section ==================== */
.prior-timeline-content {
  padding: 0;
  background: transparent;
  border: none;
  box-shadow: none;
}

.prior-section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.prior-section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text-primary);
}

/* 3-Card Grid for Prior Roles */
.prior-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
}

.prior-card {
  display: flex;
  flex-direction: column;
  padding: 1.6rem;
  background: rgba(15, 23, 42, 0.45);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
}

.prior-card:hover {
  border-color: var(--glass-border-hover);
  transform: translateY(-3px);
  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.45);
}

.prior-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.prior-tag {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--color-accent-tertiary);
}

.prior-period {
  font-size: 0.72rem;
  color: var(--color-text-muted);
  background: rgba(255, 255, 255, 0.04);
  padding: 0.15rem 0.5rem;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.prior-job-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.25rem;
  line-height: 1.3;
}

.prior-company-line {
  font-size: 0.92rem;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: 0.5rem;
}

.prior-location {
  color: var(--color-text-muted);
  font-size: 0.8rem;
}

.prior-desc {
  font-size: 0.82rem;
  color: var(--color-text-muted);
  margin-bottom: 1.15rem;
  line-height: 1.45;
}

.prior-achievements {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-top: auto;
}

.prior-achievement {
  display: flex;
  gap: 0.6rem;
  font-size: 0.88rem;
  line-height: 1.55;
  color: var(--color-text-secondary);
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .featured-body-grid.has-plugins {
    grid-template-columns: 1fr;
    gap: 1.75rem;
  }

  .prior-cards-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .timeline-item {
    grid-template-columns: 1fr;
    gap: var(--spacing-sm);
  }

  .timeline-marker {
    display: none;
  }

  .featured-content {
    padding: var(--spacing-lg);
  }

  .prior-cards-grid {
    grid-template-columns: 1fr;
  }

  .prior-section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
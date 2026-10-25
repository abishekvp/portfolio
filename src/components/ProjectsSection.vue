<template>
  <section v-if="projectsData.visible" id="projects" class="section projects-section">
    <div class="container-wide">
      <div class="section-title">
        <div class="code-badge mb-2">
          <span>{{ projectsData.badge }}</span>
        </div>
        <h2 v-html="projectsData.sectionTitle"></h2>
        <p class="text-secondary">{{ projectsData.sectionSubtitle }}</p>
      </div>

      <div v-for="group in groups" :key="group.group" class="launch-group">
        <h3 class="group-heading font-mono">{{ group.group }}</h3>

        <div class="products-grid">
          <article
            v-for="item in group.items"
            :key="item.id"
            class="product-card glass-card"
          >
            <header class="product-head">
              <div class="head-badges">
                <span :class="['product-status', item.isLive ? 'is-live' : 'is-shipped']">
                  <span class="status-dot"></span>
                  {{ item.status }}
                </span>
                <span v-if="item.kind" class="product-kind font-mono">{{ item.kind }}</span>
              </div>
              <span v-if="item.link" class="product-host font-mono">{{ host(item.link) }}</span>
            </header>

            <h4 class="product-title">{{ item.title }}</h4>
            <p class="product-tagline">{{ item.tagline }}</p>
            <p class="product-desc">{{ item.description }}</p>

            <ul v-if="item.highlights && item.highlights.length" class="product-highlights">
              <li v-for="(hl, i) in item.highlights" :key="i">
                <span class="hl-bullet">▸</span>
                <span>{{ hl }}</span>
              </li>
            </ul>

            <div v-if="item.link" class="product-links">
              <a
                :href="item.link"
                target="_blank"
                rel="noopener"
                class="product-link-btn"
                :data-track="`product:${item.id}`"
              >
                <span>{{ item.linkLabel || 'Visit Live Site' }}</span>
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
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
  name: "ProjectsSection",
  computed: {
    projectsData() {
      return portfolioStore.projects;
    },
    groups() {
      return this.projectsData.groups || [];
    },
  },
  methods: {
    host(url) {
      try {
        return new URL(url).host.replace(/^www\./, '');
      } catch {
        return url;
      }
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

.launch-group + .launch-group {
  margin-top: var(--spacing-2xl);
}

.group-heading {
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

.group-heading::after {
  content: "";
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--spacing-lg);
}

.product-card {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-lg);
  background: rgba(15, 23, 42, 0.45);
  border: 1px solid var(--glass-border);
  transition: all var(--transition-base);
}

.product-card:hover {
  transform: translateY(-5px);
  border-color: var(--glass-border-hover);
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.55), 0 0 25px var(--color-glow-1);
}

.product-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.1rem;
}

.head-badges {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.product-status {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.2rem 0.65rem;
  border-radius: 9999px;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  border: 1px solid;
}

.product-status.is-live {
  color: #34d399;
  border-color: rgba(52, 211, 153, 0.35);
  background: rgba(16, 185, 129, 0.1);
}

.product-status.is-shipped {
  color: #38bdf8;
  border-color: rgba(56, 189, 248, 0.35);
  background: rgba(14, 165, 233, 0.1);
}

.product-kind {
  font-size: 0.72rem;
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  color: var(--color-text-secondary);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--glass-border);
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
}

.product-host {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-title {
  font-size: 1.38rem;
  color: var(--color-text-primary);
  line-height: 1.3;
}

.product-tagline {
  margin-top: 0.3rem;
  font-size: 0.96rem;
  font-weight: 600;
  color: var(--color-accent-tertiary);
}

.product-desc {
  margin: 0.85rem 0 1rem;
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--color-text-secondary);
}

.product-highlights {
  list-style: none;
  padding: 0.85rem 1rem;
  margin: 0 0 1.25rem;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  flex-grow: 1;
}

.product-highlights li {
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  font-size: 0.88rem;
  line-height: 1.5;
  color: var(--color-text-secondary);
}

.hl-bullet {
  color: var(--color-accent-primary);
  font-weight: 700;
  flex-shrink: 0;
}

.product-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: auto;
}

.product-link-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.55rem 1rem;
  border-radius: var(--radius-sm);
  font-size: 0.88rem;
  font-weight: 600;
  text-decoration: none;
  color: var(--color-text-on-accent);
  background: var(--color-accent-primary);
  border: 1px solid var(--color-accent-primary);
  transition: all var(--transition-fast);
}

.product-link-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px var(--btn-shadow-hover);
}

@media (max-width: 900px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>

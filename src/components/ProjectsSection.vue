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

      <div class="products-grid">
        <article
          v-for="product in products"
          :key="product.id"
          class="product-card glass-card"
        >
          <header class="product-head">
            <span :class="['product-status', product.link ? 'is-live' : 'is-soon']">
              <span class="status-dot"></span>
              {{ product.link ? 'Live' : 'Launching soon' }}
            </span>
            <span v-if="product.link" class="product-host font-mono">{{ host(product.link) }}</span>
          </header>

          <h3 class="product-title">{{ product.title }}</h3>
          <p class="product-tagline">{{ product.tagline }}</p>
          <p class="product-desc">{{ product.description }}</p>

          <div v-if="product.tags && product.tags.length" class="product-tags">
            <span v-for="tag in product.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>

          <div class="product-links">
            <a
              v-if="product.link"
              :href="product.link"
              target="_blank"
              rel="noopener"
              class="product-link-btn"
              :data-track="`product:${product.id}`"
            >
              <span>Open live app</span>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
            <a
              v-if="product.github"
              :href="product.github"
              target="_blank"
              rel="noopener"
              class="product-link-btn is-secondary"
            >
              Source code
            </a>
          </div>
        </article>
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
    products() {
      return this.projectsData.items || [];
    },
  },
  methods: {
    host(url) {
      try {
        return new URL(url).host;
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
  gap: 1rem;
  margin-bottom: 1.1rem;
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

.product-status.is-soon {
  color: #fbbf24;
  border-color: rgba(251, 191, 36, 0.35);
  background: rgba(245, 158, 11, 0.1);
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
  font-size: 1.45rem;
  color: var(--color-text-primary);
  line-height: 1.25;
}

.product-tagline {
  margin-top: 0.3rem;
  font-size: 0.98rem;
  font-weight: 600;
  color: var(--color-accent-tertiary);
}

.product-desc {
  margin: 0.9rem 0 1.25rem;
  font-size: 0.97rem;
  line-height: 1.65;
  color: var(--color-text-secondary);
  flex-grow: 1;
}

.product-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-bottom: 1.4rem;
}

.tag {
  padding: 0.22rem 0.6rem;
  font-family: var(--font-mono);
  font-size: 0.74rem;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--glass-border);
  color: var(--color-accent-tertiary);
}

.product-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.product-links:empty {
  display: none;
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

.product-link-btn.is-secondary {
  color: var(--color-text-primary);
  background: rgba(255, 255, 255, 0.04);
  border-color: var(--glass-border);
}

@media (max-width: 900px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>

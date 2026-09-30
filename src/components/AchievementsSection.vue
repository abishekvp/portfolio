<template>
  <section v-if="data.visible && data.items.length" id="achievements" class="section">
    <div class="container">
      <div class="section-title">
        <div class="code-badge mb-2">
          <span>{{ data.badge }}</span>
        </div>
        <h2 v-html="data.sectionTitle"></h2>
        <p class="text-secondary">{{ data.sectionSubtitle }}</p>
      </div>

      <div class="achievements-grid">
        <div v-for="(item, index) in data.items" :key="index" class="achievement-card glass-card">
          <img v-if="item.image" :src="item.image" :alt="item.title" class="achievement-image" loading="lazy" />
          <div v-else class="achievement-icon">{{ item.icon || '🏆' }}</div>
          <div class="achievement-content">
            <h3>{{ item.title }}</h3>
            <p v-if="item.issuer || item.date" class="achievement-meta">
              {{ [item.issuer, item.date].filter(Boolean).join(' · ') }}
            </p>
            <p>{{ item.description }}</p>
            <a v-if="item.link" :href="item.link" target="_blank" rel="noopener" class="achievement-link">View credential ↗</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { portfolioStore } from "../services/portfolioService";

export default {
  name: "AchievementsSection",
  computed: {
    data() {
      return portfolioStore.achievements;
    },
  },
};
</script>

<style scoped>
.achievements-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-lg);
}

.achievement-card {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding: var(--spacing-xl);
  transition: all var(--transition-base);
}

.achievement-card:hover {
  transform: translateY(-5px);
  border-color: var(--glass-border-hover);
  background: rgba(255, 250, 250, 0.05);
}

.achievement-icon {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-sm);
}

.achievement-image {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 12px;
}

.achievement-content h3 {
  font-size: 1.25rem;
  margin-bottom: var(--spacing-sm);
  color: var(--color-text-primary);
}

.achievement-content p {
  font-size: 1rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.achievement-content .achievement-meta {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--color-accent-primary);
  margin-bottom: var(--spacing-sm);
}

.achievement-link {
  display: inline-block;
  margin-top: var(--spacing-sm);
  font-size: 0.9rem;
  color: var(--color-accent-primary);
  text-decoration: none;
}

@media (max-width: 768px) {
  .achievements-grid {
    grid-template-columns: 1fr;
  }
}
</style>

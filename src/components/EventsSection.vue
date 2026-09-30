<template>
  <section v-if="data.visible && data.items.length" id="events" class="section events-section">
    <div class="container">
      <div class="section-title">
        <div class="code-badge mb-2">
          <span>{{ data.badge }}</span>
        </div>
        <h2 v-html="data.sectionTitle"></h2>
        <p class="text-secondary">{{ data.sectionSubtitle }}</p>
      </div>

      <div class="events-list">
        <article
          v-for="(ev, i) in data.items"
          :key="i"
          :class="['event-card', 'glass-card', { 'has-image': ev.images && ev.images.length }]"
        >
          <!-- Media -->
          <button
            v-if="ev.images && ev.images.length"
            type="button"
            class="event-media"
            :aria-label="`View photo: ${ev.title}`"
            @click="open(ev, 0)"
          >
            <img :src="ev.images[0]" :alt="`${ev.role} — ${ev.title}, ${ev.venue}`" loading="lazy" />
            <span v-if="ev.images.length > 1" class="media-count font-mono">+{{ ev.images.length - 1 }} photos</span>
          </button>
          <div v-else class="event-media is-placeholder" aria-hidden="true">
            <span class="placeholder-icon">{{ ev.role === 'Guest Lecture' ? '🎤' : '⚖️' }}</span>
            <span class="placeholder-text font-mono">{{ ev.venue }}</span>
          </div>

          <!-- Details -->
          <div class="event-body">
            <div class="event-top">
              <span class="role-chip">{{ ev.role }}</span>
              <span class="event-date font-mono">{{ ev.date }}</span>
            </div>
            <h3 class="event-title">{{ ev.title }}</h3>
            <p class="event-venue">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>{{ [ev.venue, ev.place].filter(Boolean).join(', ') }}</span>
            </p>
            <p v-if="ev.host" class="event-host">{{ ev.host }}</p>
            <p class="event-desc">{{ ev.description }}</p>
          </div>
        </article>
      </div>
    </div>

    <!-- Lightbox -->
    <div v-if="viewer" class="lightbox" role="dialog" aria-modal="true" @click.self="close">
      <button type="button" class="lightbox-close" aria-label="Close" @click="close">&times;</button>
      <img :src="viewer.ev.images[viewer.index]" :alt="viewer.ev.title" />
      <div v-if="viewer.ev.images.length > 1" class="lightbox-nav">
        <button type="button" @click="step(-1)">‹ Prev</button>
        <span class="font-mono">{{ viewer.index + 1 }} / {{ viewer.ev.images.length }}</span>
        <button type="button" @click="step(1)">Next ›</button>
      </div>
    </div>
  </section>
</template>

<script>
import { portfolioStore } from "../services/portfolioService";

export default {
  name: "EventsSection",
  data() {
    return { viewer: null };
  },
  computed: {
    data() {
      return portfolioStore.events;
    },
  },
  mounted() {
    window.addEventListener("keydown", this.onKey);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.onKey);
  },
  methods: {
    open(ev, index) {
      this.viewer = { ev, index };
    },
    close() {
      this.viewer = null;
    },
    step(dir) {
      const n = this.viewer.ev.images.length;
      this.viewer.index = (this.viewer.index + dir + n) % n;
    },
    onKey(e) {
      if (!this.viewer) return;
      if (e.key === "Escape") this.close();
      if (e.key === "ArrowRight") this.step(1);
      if (e.key === "ArrowLeft") this.step(-1);
    },
  },
};
</script>

<style scoped>
.events-section {
  position: relative;
  z-index: 1;
}

.mb-2 {
  margin-bottom: 0.75rem;
}

.font-mono {
  font-family: var(--font-mono);
}

.events-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--spacing-lg);
}

/* The event with a photo spans the full row and sits beside its details */
.event-card.has-image {
  grid-column: 1 / -1;
  flex-direction: row;
}

.event-card {
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
  background: rgba(15, 23, 42, 0.45);
  border: 1px solid var(--glass-border);
  transition: border-color var(--transition-fast), transform var(--transition-fast);
}

.event-card:hover {
  transform: translateY(-3px);
  border-color: var(--glass-border-hover);
}

/* Media */
.event-media {
  position: relative;
  display: block;
  padding: 0;
  border: none;
  background: rgba(10, 15, 28, 0.8);
  cursor: zoom-in;
}

.event-card.has-image .event-media {
  flex: 0 0 38%;
  max-width: 380px;
}

.event-media img {
  display: block;
  width: 100%;
  height: 100%;
  max-height: 520px;
  object-fit: cover;
  object-position: top center;
  transition: transform 0.5s ease;
}

.event-media:hover img {
  transform: scale(1.03);
}

.media-count {
  position: absolute;
  right: 0.75rem;
  bottom: 0.75rem;
  padding: 0.2rem 0.55rem;
  border-radius: 9999px;
  font-size: 0.72rem;
  color: #fff;
  background: rgba(0, 0, 0, 0.65);
}

.event-media.is-placeholder {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  height: 120px;
  padding: 0 1.5rem;
  cursor: default;
  background:
    radial-gradient(circle at 85% 20%, var(--color-tag-bg), transparent 60%),
    linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(10, 15, 28, 0.95));
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.placeholder-icon {
  font-size: 2rem;
}

.placeholder-text {
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

/* Body */
.event-body {
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1.6rem;
}

.event-card.has-image .event-body {
  justify-content: center;
  padding: 2rem 2.25rem;
}

.event-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.85rem;
}

.role-chip {
  padding: 0.2rem 0.65rem;
  border-radius: 9999px;
  font-size: 0.74rem;
  font-weight: 600;
  color: var(--color-accent-tertiary);
  background: var(--color-tag-bg);
  border: 1px solid var(--color-tag-border);
}

.event-date {
  font-size: 0.82rem;
  color: var(--color-text-secondary);
}

.event-title {
  font-size: 1.25rem;
  line-height: 1.35;
  color: var(--color-text-primary);
}

.event-card.has-image .event-title {
  font-size: 1.5rem;
}

.event-venue {
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  margin-top: 0.6rem;
  font-size: 0.93rem;
  font-weight: 600;
  color: var(--color-accent-tertiary);
}

.event-venue svg {
  flex-shrink: 0;
  margin-top: 0.2rem;
}

.event-host {
  margin-top: 0.25rem;
  font-size: 0.88rem;
  color: var(--color-text-muted);
}

.event-desc {
  margin-top: 0.9rem;
  font-size: 0.97rem;
  line-height: 1.65;
  color: var(--color-text-secondary);
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 3000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.88);
  backdrop-filter: blur(8px);
}

.lightbox img {
  max-width: min(100%, 900px);
  max-height: 82vh;
  object-fit: contain;
  border-radius: var(--radius-md);
}

.lightbox-close {
  position: absolute;
  top: 1rem;
  right: 1.25rem;
  font-size: 2rem;
  line-height: 1;
  color: #fff;
  background: none;
  border: none;
  cursor: pointer;
}

.lightbox-nav {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #fff;
}

.lightbox-nav button {
  padding: 0.35rem 0.8rem;
  border-radius: var(--radius-sm);
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
}

@media (max-width: 860px) {
  .events-list {
    grid-template-columns: 1fr;
  }

  .event-card.has-image {
    flex-direction: column;
  }

  .event-card.has-image .event-media {
    flex: none;
    max-width: none;
  }

  .event-media img {
    max-height: 420px;
  }

  .event-card.has-image .event-body {
    padding: 1.5rem 1.6rem;
  }
}
</style>

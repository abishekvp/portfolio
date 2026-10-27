<template>
  <section v-if="data.visible && eventItems.length" id="talks" class="section events-section">
    <div class="container">
      <div class="section-title">
        <div class="code-badge mb-2">
          <span>{{ data.badge || '// TALKS & COMMUNITY' }}</span>
        </div>
        <h2 v-html="data.sectionTitle || 'Talks &amp; <span class=\'gradient-text\'>Community</span>'"></h2>
        <p class="text-secondary">{{ data.sectionSubtitle || 'Guest lectures, hackathon juries, and engineering community mentorship' }}</p>
      </div>

      <div class="events-list">
        <article
          v-for="(ev, i) in eventItems"
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
            <span class="placeholder-icon">{{ getEventIcon(ev.role) }}</span>
            <span class="placeholder-text font-mono">{{ ev.venue }}</span>
          </div>

          <!-- Details -->
          <div class="event-body">
            <div class="event-top">
              <span class="role-chip">{{ ev.role }}</span>
              <span class="event-date font-mono">{{ ev.date }}</span>
            </div>
            <h3 class="event-title">{{ ev.title }}</h3>
            <p v-if="ev.venue" class="event-venue">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="10" cy="10" r="3"></circle>
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
import { talksCommunity } from "../data/showcase";

export default {
  name: "EventsSection",
  data() {
    return { viewer: null };
  },
  computed: {
    data() {
      return portfolioStore.events;
    },
    eventItems() {
      if (this.data.items && this.data.items.length) {
        return this.data.items;
      }
      return talksCommunity;
    },
  },
  mounted() {
    window.addEventListener("keydown", this.onKey);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.onKey);
  },
  methods: {
    getEventIcon(role) {
      if (role === "Guest Lecture") return "🎤";
      if (role === "National Winner") return "🏆";
      if (role === "Peer Trainer") return "👥";
      return "⚖️";
    },
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
  border-radius: var(--radius-lg);
  transition: border-color var(--transition-fast), transform var(--transition-fast);
}

.event-card:hover {
  transform: translateY(-3px);
  border-color: var(--glass-border-hover);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
}

/* Media */
.event-media {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  padding: 0;
  border: 0;
  background: rgba(10, 15, 28, 0.7);
  cursor: pointer;
  overflow: hidden;
}

.event-card.has-image .event-media {
  width: 45%;
  flex-shrink: 0;
  aspect-ratio: auto;
  min-height: 280px;
}

.event-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.event-media:hover img {
  transform: scale(1.04);
}

.media-count {
  position: absolute;
  right: 0.65rem;
  bottom: 0.65rem;
  padding: 0.2rem 0.55rem;
  border-radius: 9999px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  color: #fff;
  font-size: 0.75rem;
}

.event-media.is-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: default;
  background: radial-gradient(circle at center, rgba(14, 165, 233, 0.08) 0%, rgba(10, 15, 28, 0.8) 75%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  min-height: 120px;
}

.placeholder-icon {
  font-size: 2rem;
}

.placeholder-text {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  max-width: 80%;
  text-align: center;
}

/* Body */
.event-body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: var(--spacing-lg);
  flex-grow: 1;
}

.event-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.role-chip {
  display: inline-flex;
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  background: rgba(14, 165, 233, 0.12);
  border: 1px solid rgba(14, 165, 233, 0.3);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--color-accent-tertiary);
  letter-spacing: 0.04em;
}

.event-date {
  font-size: 0.78rem;
  color: var(--color-text-muted);
}

.event-title {
  font-size: 1.15rem;
  line-height: 1.4;
  color: var(--color-text-primary);
  margin-top: 0.15rem;
}

.event-venue {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  color: var(--color-text-muted);
}

.event-host {
  font-size: 0.82rem;
  color: var(--color-accent-tertiary);
  font-style: italic;
}

.event-desc {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
  margin-top: 0.25rem;
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.88);
  backdrop-filter: blur(10px);
  z-index: 2000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.lightbox-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: 0;
  color: #fff;
  font-size: 2.5rem;
  cursor: pointer;
  line-height: 1;
}

.lightbox img {
  max-width: 90vw;
  max-height: 80vh;
  object-fit: contain;
  border-radius: var(--radius-md);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7);
}

.lightbox-nav {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  color: #fff;
}

.lightbox-nav button {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 0.4rem 0.9rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
}

@media (max-width: 820px) {
  .events-list {
    grid-template-columns: 1fr;
  }

  .event-card.has-image {
    flex-direction: column;
  }

  .event-card.has-image .event-media {
    width: 100%;
    aspect-ratio: 16 / 10;
    min-height: unset;
  }
}
</style>

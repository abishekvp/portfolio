<template>
  <section v-if="data.visible" id="terminal-section" class="section terminal-section">
    <div class="container">
      <div class="section-title">
        <div class="code-badge mb-2">
          <span>{{ data.badge }}</span>
        </div>
        <h2 v-html="data.sectionTitle"></h2>
        <p class="text-secondary">
          {{ data.sectionSubtitle }}
        </p>
      </div>

      <InteractiveTerminal />
    </div>
  </section>
</template>

<script>
import InteractiveTerminal from './InteractiveTerminal.vue';
import { portfolioStore } from '../services/portfolioService';

export default {
  name: 'TerminalSection',
  components: {
    InteractiveTerminal
  },
  computed: {
    data() {
      return portfolioStore.terminal;
    }
  }
};
</script>

<style scoped>
.terminal-section {
  position: relative;
  z-index: 2;
  padding: var(--spacing-2xl) 0;
}

.mb-2 {
  margin-bottom: 0.75rem;
}
</style>

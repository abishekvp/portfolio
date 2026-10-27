<template>
  <div class="terminal-container glass-terminal" :class="{ 'terminal-modal-view': isModal }">
    <!-- Terminal Titlebar -->
    <div class="terminal-header">
      <div class="terminal-dots">
        <span class="terminal-dot red" @click="handleDotClose" title="Minimize / Reset"></span>
        <span class="terminal-dot yellow" @click="clearTerminal" title="Clear Screen"></span>
        <span class="terminal-dot green" @click="toggleMaximize" title="Expand"></span>
      </div>
      <div class="terminal-title">
        <span class="terminal-user">abishek@securden-sec</span>:<span class="terminal-path">~</span> (zsh - 80x24)
      </div>
      <div class="terminal-status">
        <span class="status-indicator"></span>
        <span>READY</span>
      </div>
    </div>

    <!-- Terminal Output Screen -->
    <div class="terminal-screen" ref="screenRef" @click="focusInput">
      <!-- Welcome Banner -->
      <div class="terminal-welcome">
        <pre class="ascii-banner">
   ___   ___  _____ _____ _   _ _____ _   __
  / _ \  |  _ \_   _/  ___| | | |  ___| | / /
 / /_\ \ | |_/ / | | \ `--.| |_| | |__ | |/ / 
 |  _  | | ___ \ | |  `--. \  _  |  __||    \ 
 | | | |_| |_/ /_| |_/\__/ / | | | |___| |\  \
 \_| |_(_)\____/ \___/\____/\_| |_|____/\_| \_/
        </pre>
        <p class="welcome-text font-mono">
          <strong class="text-accent">Abishek V</strong> — Software Engineer, Backend &amp; Security<br />
          {{ store.terminal.welcomeSubtitle || 'Software Engineer at Securden · backend & security · open to new roles' }}
        </p>
        <p class="welcome-hint font-mono">
          Type <span class="cmd-pill">help</span> to view available commands or click the shortcut chips below.
        </p>
      </div>

      <!-- Command History -->
      <div
        v-for="(item, index) in history"
        :key="index"
        class="history-item font-mono"
      >
        <div class="history-cmd-line">
          <span class="prompt-user">abishek@sec</span>:<span class="prompt-path">~</span>$
          <span class="history-command">{{ item.command }}</span>
        </div>
        <div class="history-output" v-html="item.output"></div>
      </div>

      <!-- Current Prompt Line -->
      <div class="terminal-input-line font-mono">
        <span class="prompt-user">abishek@sec</span>:<span class="prompt-path">~</span>$
        <input
          ref="cmdInput"
          v-model="currentCommand"
          type="text"
          class="terminal-input"
          spellcheck="false"
          autocomplete="off"
          @keydown.enter="executeCommand"
          @keydown.up.prevent="navigateHistory('up')"
          @keydown.down.prevent="navigateHistory('down')"
        />
        <span class="cursor-blink"></span>
      </div>
    </div>

    <!-- Quick Command Chips for mobile and fast exploration -->
    <div class="terminal-chips font-mono">
      <span class="chips-label">Quick actions:</span>
      <button
        v-for="chip in quickChips"
        :key="chip.cmd"
        class="chip-btn"
        @click="runChipCommand(chip.cmd)"
      >
        {{ chip.label }}
      </button>
    </div>
  </div>
</template>

<script>
import { portfolioStore } from '../services/portfolioService';

function esc(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export default {
  name: 'InteractiveTerminal',
  props: {
    isModal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentCommand: '',
      historyIndex: -1,
      pastCommands: [],
      history: [
        {
          command: 'whoami',
          output: `<span class="text-cyan">abishek.v</span> — Software Engineer at Securden · backend &amp; security · open to new roles`,
        },
      ],
      quickChips: [
        { label: 'whoami', cmd: 'whoami' },
        { label: 'experience', cmd: 'experience' },
        { label: 'plugins', cmd: 'plugins' },
        { label: 'projects', cmd: 'projects' },
        { label: 'contact', cmd: 'contact' },
        { label: 'clear', cmd: 'clear' },
      ],
    };
  },
  computed: {
    store() {
      return portfolioStore;
    },
  },
  methods: {
    focusInput() {
      if (this.$refs.cmdInput) {
        this.$refs.cmdInput.focus();
      }
    },
    runChipCommand(cmd) {
      this.currentCommand = cmd;
      this.executeCommand();
    },
    clearTerminal() {
      this.history = [];
    },
    handleDotClose() {
      if (this.isModal) {
        this.$parent.$emit('close-terminal');
      } else {
        this.clearTerminal();
      }
    },
    toggleMaximize() {
      // Toggle modal expand
    },
    navigateHistory(dir) {
      if (!this.pastCommands.length) return;
      if (dir === 'up') {
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.currentCommand = this.pastCommands[this.historyIndex];
        }
      } else if (dir === 'down') {
        if (this.historyIndex < this.pastCommands.length - 1) {
          this.historyIndex++;
          this.currentCommand = this.pastCommands[this.historyIndex];
        } else {
          this.historyIndex = this.pastCommands.length;
          this.currentCommand = '';
        }
      }
    },
    executeCommand() {
      const rawCmd = this.currentCommand.trim();
      if (!rawCmd) return;

      this.pastCommands.push(rawCmd);
      this.historyIndex = this.pastCommands.length;

      const [command] = rawCmd.split(' ');
      const cmdKey = command.toLowerCase();

      if (cmdKey === 'clear') {
        this.history = [];
      } else {
        const output = this.handleCommand(cmdKey);
        this.history.push({ command: rawCmd, output });
      }

      this.currentCommand = '';
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    scrollToBottom() {
      if (this.$refs.screenRef) {
        this.$refs.screenRef.scrollTop = this.$refs.screenRef.scrollHeight;
      }
    },
    handleCommand(cmd) {
      switch (cmd) {
        case 'help':
          return `
<div class="cmd-table">
  <div><span class="cmd-name">whoami</span> — Identity, target role &amp; current focus</div>
  <div><span class="cmd-name">experience</span> — Professional employment &amp; engineering milestones</div>
  <div><span class="cmd-name">plugins</span> — Public DevOps secrets plugins &amp; 3,900+ downloads</div>
  <div><span class="cmd-name">projects</span> — Live SaaS platforms &amp; academic builds</div>
  <div><span class="cmd-name">contact</span> — Email, LinkedIn, GitHub and contact details</div>
  <div><span class="cmd-name">clear</span> — Clear terminal output</div>
</div>`;

        case 'whoami':
          return `<span class="text-cyan">abishek.v</span> — Software Engineer at Securden · backend &amp; security · open to new roles`;

        case 'experience':
          return `
<div class="exp-output">
  <p><strong class="text-green">Securden</strong> · Software Engineer (Full-time) · Mar 2024 – Present · Chennai</p>
  <p class="text-muted">Privileged Access Management · Identity · DevOps secrets</p>
  <p>- Built Self-Service Password Reset (SSPR) from scratch (Active Directory, Entra ID, Google Workspace).</p>
  <p>- Added delta sync for Microsoft Entra ID; built REST APIs for JIT privileged access in Password Vault.</p>
  <p>- Built secrets plugins for Terraform, Chef, Puppet, Jenkins and Ansible with 3,900+ public downloads.</p>
  <br />
  <p><strong class="text-green">DAAT</strong> · Software Engineer (Part-time) · May 2022 – Feb 2024</p>
  <p>- Rebuilt company brand website; built and delivered client web projects.</p>
  <p>- Built internal project management tool solo for task tracking and team collaboration.</p>
  <br />
  <p><strong class="text-green">Madras Defence Academy</strong> · Web Developer Intern · Nov 2021 – Jan 2022</p>
  <p>- Built learning portal in React for onboarding, materials and discussion forum.</p>
  <br />
  <p><strong class="text-green">ROOK</strong> · Web Developer (Part-time) · Aug 2021 – May 2022 (Intern Jan–Aug 2021)</p>
  <p>- Built websites with Python, Django, JavaScript and SQL; modernised brand interfaces.</p>
</div>`;

        case 'plugins':
          return `
<div class="plugins-output">
  <p><strong class="text-yellow">Public DevOps Secrets Plugins</strong> (3,900+ total downloads):</p>
  <p>• <a href="https://registry.terraform.io/providers/SecurdenDevOps/securden/latest" target="_blank" class="term-link">Terraform provider</a> (Go, Terraform Registry): 2,526 downloads across 9 versions</p>
  <p>• <a href="https://forge.puppet.com/modules/securden/securden" target="_blank" class="term-link">Puppet module</a> (Puppet, Puppet Forge): 756 downloads</p>
  <p>• <a href="https://rubygems.org/gems/securden" target="_blank" class="term-link">Chef gem</a> (Ruby, RubyGems): 664 downloads</p>
  <p>• Jenkins plugin (Java, Maven): Bundled with Securden</p>
  <p>• Ansible plugin (Python): Bundled with Securden</p>
</div>`;

        case 'projects':
          return `
<div class="projects-output">
  <p>• <strong class="text-cyan">Portfolio Manager</strong> [Live] — Headless CMS with API keys, visitor analytics &amp; contact inbox. <a href="https://admin.abishek.in" target="_blank" class="term-link">admin.abishek.in</a> · <a href="https://github.com/abishekvp/portfolio-admin" target="_blank" class="term-link">GitHub</a></p>
  <p>• <strong class="text-cyan">Family Finance</strong> [Live] — Shared &amp; private household ledgers with RBAC &amp; PWA. <a href="https://finance.abishek.in" target="_blank" class="term-link">finance.abishek.in</a> · <a href="https://github.com/abishekvp/family-finance" target="_blank" class="term-link">GitHub</a></p>
  <p>• <strong class="text-cyan">GrantBase</strong> [Academic · SIH 2022 Winner] — Automated grant calls collection &amp; alerts. <a href="https://github.com/abishekvp/SIH_DR715" target="_blank" class="term-link">GitHub</a></p>
  <p>• <strong class="text-cyan">OASIS records automation</strong> [Academic] — Reads Excel records &amp; populates college OASIS portal. <a href="https://github.com/abishekvp/Web-Automation-Streamlining-OASIS-Web-Portal" target="_blank" class="term-link">GitHub</a></p>
  <p>• <strong class="text-cyan">LegalTech</strong> [Academic] — Digital case-record management for lawyers &amp; advocate discovery. <a href="https://github.com/abishekvp/legaltech" target="_blank" class="term-link">GitHub</a></p>
</div>`;

        case 'contact':
          return `
<div class="contact-output">
  <p>• <strong>Email:</strong> <a href="mailto:contact@abishek.in" class="term-link">contact@abishek.in</a></p>
  <p>• <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/abishek-v-p/" target="_blank" class="term-link">linkedin.com/in/abishek-v-p</a></p>
  <p>• <strong>GitHub:</strong> <a href="https://github.com/abishekvp" target="_blank" class="term-link">github.com/abishekvp</a></p>
  <p>• <strong>Web Form:</strong> Scroll to <a href="#contact" class="term-link">#contact</a> to send a direct message.</p>
</div>`;

        default:
          return `<span class="text-red">zsh: command not found: ${esc(cmd)}</span>. Type <span class="cmd-pill">help</span> for available commands.`;
      }
    },
  },
};
</script>

<style scoped>
.font-mono {
  font-family: var(--font-mono);
}

.terminal-container {
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: rgba(10, 15, 28, 0.88);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  border: 1px solid var(--glass-border);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(16, 185, 129, 0.1);
}

.terminal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.25rem;
  background: rgba(15, 23, 42, 0.85);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.terminal-dots {
  display: flex;
  gap: 0.45rem;
}

.terminal-dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform var(--transition-fast);
}

.terminal-dot:hover {
  transform: scale(1.15);
}

.terminal-dot.red { background: #ef4444; }
.terminal-dot.yellow { background: #f59e0b; }
.terminal-dot.green { background: #10b981; }

.terminal-title {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.terminal-user {
  color: #10b981;
}

.terminal-path {
  color: #38bdf8;
}

.terminal-status {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: #10b981;
  letter-spacing: 0.05em;
}

.status-indicator {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
}

.terminal-screen {
  height: 380px;
  overflow-y: auto;
  padding: 1.25rem;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.ascii-banner {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  line-height: 1.15;
  color: #10b981;
  margin-bottom: 0.75rem;
  user-select: none;
}

.welcome-text {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.welcome-hint {
  font-size: 0.82rem;
  color: var(--color-text-muted);
  margin-bottom: 1.25rem;
}

.cmd-pill {
  display: inline-block;
  padding: 0.1rem 0.4rem;
  border-radius: var(--radius-sm);
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.3);
  font-weight: 600;
}

.history-item {
  margin-bottom: 0.85rem;
}

.history-cmd-line,
.terminal-input-line {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.prompt-user {
  color: #10b981;
  font-weight: 600;
}

.prompt-path {
  color: #38bdf8;
}

.history-command {
  color: #ffffff;
  font-weight: 600;
}

.history-output {
  margin-top: 0.35rem;
  margin-left: 0.5rem;
  padding-left: 0.75rem;
  border-left: 2px solid rgba(16, 185, 129, 0.3);
  color: var(--color-text-primary);
}

.terminal-input-line {
  margin-top: 0.5rem;
}

.terminal-input {
  flex-grow: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #ffffff;
  font-family: var(--font-mono);
  font-size: 0.9rem;
}

.cursor-blink {
  display: inline-block;
  width: 8px;
  height: 15px;
  background: #10b981;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

.terminal-chips {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: rgba(15, 23, 42, 0.75);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.chips-label {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.chip-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--color-text-secondary);
  font-size: 0.75rem;
  padding: 0.25rem 0.6rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.chip-btn:hover {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  border-color: rgba(16, 185, 129, 0.3);
}

/* Modal view adjustments */
.terminal-modal-view {
  max-width: 100%;
  box-shadow: none;
}

.terminal-modal-view .terminal-screen {
  height: 50vh;
}

:deep(.text-cyan) { color: #38bdf8; }
:deep(.text-green) { color: #10b981; }
:deep(.text-yellow) { color: #f59e0b; }
:deep(.text-red) { color: #ef4444; }
:deep(.text-muted) { color: var(--color-text-muted); }
:deep(.term-link) {
  color: #38bdf8;
  text-decoration: underline;
}
:deep(.cmd-table) {
  display: grid;
  gap: 0.35rem;
}
:deep(.cmd-name) {
  display: inline-block;
  width: 95px;
  color: #10b981;
  font-weight: 600;
}

@media (max-width: 640px) {
  .ascii-banner {
    display: none;
  }

  .terminal-screen {
    height: 320px;
  }
}
</style>

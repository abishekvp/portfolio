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
        <span class="terminal-user">abishek@platform-sec</span>:<span class="terminal-path">~</span> (zsh - 80x24)
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
        <p class="welcome-text">
          <strong class="text-accent">{{ store.profile.name }}</strong> — {{ store.hero.tagline }}<br />
          {{ store.terminal.welcomeSubtitle }}
        </p>
        <p class="welcome-hint">
          Type <span class="cmd-pill">help</span> to view all commands or click the shortcut chips below.
        </p>
      </div>

      <!-- Command History -->
      <div
        v-for="(item, index) in history"
        :key="index"
        class="history-item"
      >
        <div class="history-cmd-line">
          <span class="prompt-user">abishek@sec</span>:<span class="prompt-path">~</span>$
          <span class="history-command">{{ item.command }}</span>
        </div>
        <div class="history-output" v-html="item.output"></div>
      </div>

      <!-- Current Prompt Line -->
      <div class="terminal-input-line">
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
    <div class="terminal-chips">
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
      default: false
    }
  },
  data() {
    return {
      currentCommand: '',
      historyIndex: -1,
      pastCommands: [],
      history: [
        {
          command: 'whoami',
          output: `<span class="text-cyan">abishek.vp</span> &bull; Software Engineer, Product Builder &amp; Mentor — architecting enterprise identity &amp; PAM systems, launching SaaS platforms, and guiding builders.`
        }
      ],
      quickChips: [
        { label: 'help', cmd: 'help' },
        { label: 'philosophy', cmd: 'philosophy' },
        { label: 'launched', cmd: 'launched' },
        { label: 'enterprise', cmd: 'enterprise' },
        { label: 'mentorship', cmd: 'mentorship' },
        { label: 'speaking', cmd: 'speaking' },
        { label: 'contact', cmd: 'contact' },
        { label: 'clear', cmd: 'clear' }
      ]
    };
  },
  computed: {
    store() {
      return portfolioStore;
    }
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
    executeCommand() {
      const rawCmd = this.currentCommand.trim();
      if (!rawCmd) return;

      this.pastCommands.push(rawCmd);
      this.historyIndex = this.pastCommands.length;

      const [command] = rawCmd.split(' ');
      const output = this.handleCommand(command.toLowerCase());

      if (command.toLowerCase() === 'clear') {
        this.history = [];
      } else {
        this.history.push({ command: rawCmd, output });
      }

      this.currentCommand = '';
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    handleCommand(cmd) {
      switch (cmd) {
        case 'help':
          return `
<div class="cmd-table">
  <div><span class="cmd-name">help</span> — Display this command reference guide</div>
  <div><span class="cmd-name">philosophy</span> — Engineering philosophy &amp; advisory pillars</div>
  <div><span class="cmd-name">launched</span> — Independent products &amp; client sites launched</div>
  <div><span class="cmd-name">enterprise</span> — Enterprise platforms &amp; engineering leadership</div>
  <div><span class="cmd-name">mentorship</span> — Developer coaching &amp; guided flagship builds</div>
  <div><span class="cmd-name">speaking</span> — Guest lectures &amp; hackathon jury invitations</div>
  <div><span class="cmd-name">contact</span> — Connect via Email, LinkedIn or GitHub</div>
  <div><span class="cmd-name">whoami</span> — Identity and current focus</div>
  <div><span class="cmd-name">clear</span> — Clear terminal output</div>
</div>`;

        case 'about':
        case 'philosophy': {
          const items = (this.store.about?.whatIDo?.items || [])
            .map((line) => {
              const idx = line.indexOf(':');
              if (idx > 0) {
                return `<p>&bull; <strong>${esc(line.slice(0, idx))}:</strong> ${esc(line.slice(idx + 1).trim())}</p>`;
              }
              return `<p>&bull; ${esc(line)}</p>`;
            })
            .join('\n');
          return `<p><strong>${esc(this.store.profile?.name)}</strong> — ${esc(this.store.about?.bio?.title || this.store.hero?.tagline)}</p>\n${items}`;
        }

        case 'launched':
        case 'projects':
        case 'products':
        case 'sites': {
          const allProjects = (this.store.projects?.groups || []).flatMap((g) => g.items || []);
          const lines = allProjects
            .map((p) => {
              const linkHtml = p.link
                ? ` <a href="${esc(p.link)}" target="_blank" rel="noopener" class="term-link">${esc(p.linkLabel || p.link)}</a>`
                : '';
              return `<div class="project-line">&bull; <strong class="text-cyan">${esc(p.title)}</strong> — ${esc(p.tagline || p.description)}${linkHtml}</div>`;
            })
            .join('\n');
          return `<div class="projects-output">\n${lines}\n<p class="mt-2 text-muted">Explore the <a href="#projects" class="term-link">Launched Products &amp; Sites section</a>.</p>\n</div>`;
        }

        case 'enterprise':
        case 'experience': {
          return (this.store.experience?.jobs || [])
            .map(
              (j) =>
                `<p><strong>${esc(j.company)}</strong> &bull; ${esc(j.title)} (${esc(j.period)})</p>\n<p>- ${esc(j.description)}</p>`
            )
            .join('\n');
        }

        case 'mentorship':
        case 'guided': {
          const pillars = (this.store.mentorship?.pillars || [])
            .map((p) => `<p>&bull; <strong>${esc(p.title)}:</strong> ${esc(p.description)}</p>`)
            .join('\n');
          const guided = (this.store.mentorship?.guidedProjects || [])
            .map((g) => esc(g.title))
            .join(', ');
          const guidedLine = guided
            ? `<p>&bull; <strong>Flagship Guided Builds:</strong> <span class="text-yellow">${guided}</span>.</p>`
            : '';
          return `${pillars}\n${guidedLine}\n<p class="text-muted">See <a href="#mentorship" class="term-link">Mentorship &amp; Guided Projects</a>.</p>`;
        }

        case 'speaking':
        case 'events': {
          return (this.store.events?.items || [])
            .map(
              (ev) =>
                `<p>&bull; <strong>${esc(ev.role || 'Event')}</strong> — ${esc(ev.title)}, ${esc(ev.venue || ev.host)} (${esc(ev.date)})</p>`
            )
            .join('\n');
        }

        case 'contact': {
          const methods = (this.store.contact?.methods || [])
            .map((m) => {
              const val = m.link
                ? `<a href="${esc(m.link)}" target="_blank" rel="noopener" class="term-link">${esc(m.value)}</a>`
                : esc(m.value);
              return `<div>&bull; <strong>${esc(m.name)}:</strong> ${val}</div>`;
            })
            .join('\n');
          return `<div class="contact-output">\n${methods}\n</div>`;
        }

        case 'whoami':
          return `<span class="text-cyan">${esc(this.store.profile?.name)}</span> &bull; ${esc(this.store.hero?.tagline)} — ${esc(this.store.hero?.description)}`;

        case 'sudo':
          return `<span class="text-green">[ACCESS GRANTED]</span> Let's build or collaborate: <a href="#contact" class="term-link">#contact</a>.`;

        default:
          return `<span class="text-red">zsh: command not found: ${esc(cmd)}</span>. Type <span class="cmd-pill">help</span> for a list of valid commands.`;
      }
    },
    navigateHistory(direction) {
      if (direction === 'up' && this.historyIndex > 0) {
        this.historyIndex--;
        this.currentCommand = this.pastCommands[this.historyIndex];
      } else if (direction === 'down' && this.historyIndex < this.pastCommands.length - 1) {
        this.historyIndex++;
        this.currentCommand = this.pastCommands[this.historyIndex];
      } else if (direction === 'down') {
        this.historyIndex = this.pastCommands.length;
        this.currentCommand = '';
      }
    },
    scrollToBottom() {
      const screen = this.$refs.screenRef;
      if (screen) {
        screen.scrollTop = screen.scrollHeight;
      }
    },
    clearTerminal() {
      this.history = [];
      this.currentCommand = '';
    },
    handleDotClose() {
      this.clearTerminal();
    },
    toggleMaximize() {
      const el = this.$el;
      if (el) el.classList.toggle('terminal-maximized');
    }
  }
};
</script>

<style scoped>
.terminal-container {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(var(--accent-rgb, 14, 165, 233), 0.15);
  transition: all var(--transition-base);
}

.terminal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1.25rem;
  background: rgba(13, 20, 36, 0.85);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  user-select: none;
}

.terminal-dots {
  display: flex;
  gap: 8px;
}

.terminal-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.15s ease;
}

.terminal-dot:hover {
  transform: scale(1.2);
}

.terminal-title {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: var(--color-text-muted);
  letter-spacing: 0.4px;
}

.terminal-user {
  color: var(--color-accent-tertiary);
}

.terminal-path {
  color: #10b981;
}

.terminal-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: #10b981;
  letter-spacing: 1px;
}

.status-indicator {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
}

.terminal-screen {
  padding: 1.5rem;
  min-height: 380px;
  max-height: 520px;
  overflow-y: auto;
  font-family: var(--font-mono);
  font-size: 0.88rem;
  line-height: 1.65;
  color: #e2e8f0;
  cursor: text;
}

.ascii-banner {
  color: var(--color-accent-primary);
  font-size: clamp(0.55rem, 1.3vw, 0.82rem);
  line-height: 1.15;
  margin-bottom: 0.8rem;
  font-weight: 700;
  overflow-x: hidden;
  text-shadow: 0 0 12px var(--color-glow-1);
}

.welcome-text {
  margin-bottom: 0.5rem;
  color: #cbd5e1;
}

.welcome-hint {
  color: var(--color-text-muted);
  font-size: 0.82rem;
  margin-bottom: 1.25rem;
  padding-bottom: 0.85rem;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
}

.history-item {
  margin-bottom: 1rem;
}

.history-cmd-line {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #94a3b8;
  margin-bottom: 0.35rem;
}

.prompt-user {
  color: #10b981;
  font-weight: 600;
}

.prompt-path {
  color: var(--color-accent-tertiary);
  font-weight: 600;
}

.history-command {
  color: #ffffff;
  font-weight: 500;
}

.history-output {
  color: #cbd5e1;
  padding-left: 0.5rem;
  border-left: 2px solid rgba(255, 255, 255, 0.08);
}

.terminal-input-line {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.terminal-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-family: var(--font-mono);
  font-size: 0.88rem;
  color: #ffffff;
  caret-color: transparent; /* custom cursor */
}

/* Chips Toolbar */
.terminal-chips {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: rgba(8, 12, 22, 0.8);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.chips-label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin-right: 0.3rem;
}

.chip-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--glass-border);
  color: var(--color-accent-tertiary);
  font-family: var(--font-mono);
  font-size: 0.76rem;
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.2s ease;
}

.chip-btn:hover {
  background: var(--color-accent-primary);
  color: #ffffff;
  border-color: var(--color-accent-primary);
  transform: translateY(-1px);
}

/* Helpers */
.cmd-pill {
  display: inline-block;
  padding: 0.1rem 0.4rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: var(--color-accent-primary);
  font-family: var(--font-mono);
}

.text-accent { color: var(--color-accent-primary); }
.text-cyan { color: #38bdf8; }
.text-green { color: #10b981; }
.text-purple { color: #c084fc; }
.text-yellow { color: #fbbf24; }
.text-red { color: #f87171; }

.term-link {
  color: var(--color-accent-primary);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.cmd-table {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin: 0.4rem 0;
}

.cmd-name {
  color: #38bdf8;
  font-weight: 600;
  display: inline-block;
  width: 100px;
}

@media (max-width: 768px) {
  .terminal-screen {
    padding: 1rem;
    min-height: 280px;
    max-height: 380px;
    font-size: 0.8rem;
  }

  .terminal-chips {
    padding: 0.5rem 0.8rem;
  }
}
</style>

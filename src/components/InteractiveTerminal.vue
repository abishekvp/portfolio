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
          <strong class="text-accent">Abishek VP</strong> — Software Engineer · Identity, Access &amp; Platform Security<br />
          Securden • Builder of Portfolio Manager, Family Finance &amp; Credentials.
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
          output: `<span class="text-cyan">abishek.vp</span> &bull; Software Engineer at Securden, building identity, access and secrets infrastructure.`
        }
      ],
      quickChips: [
        { label: 'help', cmd: 'help' },
        { label: 'about', cmd: 'about' },
        { label: 'skills', cmd: 'skills' },
        { label: 'experience', cmd: 'experience' },
        { label: 'products', cmd: 'products' },
        { label: 'events', cmd: 'events' },
        { label: 'resume.pdf', cmd: 'resume' },
        { label: 'clear', cmd: 'clear' }
      ]
    };
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
  <div><span class="cmd-name">about</span> — Who I am and what I focus on</div>
  <div><span class="cmd-name">experience</span> — Securden, DAAT and ROOK</div>
  <div><span class="cmd-name">products</span> — Live products I build and run</div>
  <div><span class="cmd-name">skills</span> — Technical stack</div>
  <div><span class="cmd-name">education</span> — Degree, internships and college projects</div>
  <div><span class="cmd-name">events</span> — Guest lectures and hackathon juries</div>
  <div><span class="cmd-name">resume</span> — Download my resume (PDF)</div>
  <div><span class="cmd-name">contact</span> — Email, LinkedIn and GitHub</div>
  <div><span class="cmd-name">whoami</span> — Identity and current context</div>
  <div><span class="cmd-name">clear</span> — Clear terminal output</div>
</div>`;

        case 'about':
          return `
<p><strong>Abishek VP</strong> — Software Engineer building enterprise identity, access and secrets infrastructure.</p>
<p>&bull; <strong>Identity &amp; Access:</strong> PAM, Just-In-Time approvals and password self-service across AD, Entra ID and Google Workspace.</p>
<p>&bull; <strong>Secrets in CI/CD:</strong> Published Terraform, Jenkins, Ansible, Chef and Puppet plugins.</p>
<p>&bull; <strong>Product Engineering:</strong> Designs, ships and runs his own products end to end.</p>`;

        case 'skills':
          return `
<div class="skills-output">
  <div><span class="text-cyan">Backend:</span> Python, Django, Node.js, Express, REST APIs, PostgreSQL, MongoDB</div>
  <div><span class="text-green">Identity:</span> Active Directory, Entra ID (Azure AD), Google Workspace, PAM, SSPR</div>
  <div><span class="text-purple">DevOps:</span> Terraform, Ansible, Jenkins, Chef, Puppet</div>
  <div><span class="text-yellow">Automation:</span> Playwright, Selenium, BeautifulSoup4</div>
</div>`;

        case 'projects':
        case 'products':
          return `
<div class="projects-output">
  <div class="project-line">&bull; <strong class="text-cyan">Portfolio Manager</strong> — Headless CMS for personal websites. <a href="https://admin.abishek.in" target="_blank" rel="noopener" class="term-link">admin.abishek.in</a></div>
  <div class="project-line">&bull; <strong class="text-cyan">Family Finance</strong> — Household money, managed together. <a href="https://finance.abishek.in" target="_blank" rel="noopener" class="term-link">finance.abishek.in</a></div>
  <div class="project-line">&bull; <strong class="text-cyan">Credentials</strong> — Zero-knowledge password vault. <a href="https://credentials.abishek.in" target="_blank" rel="noopener" class="term-link">credentials.abishek.in</a></div>
  <div class="project-line">&bull; <strong class="text-cyan">Service Subscription Manager</strong> — Every recurring charge in one place.</div>
  <p class="mt-2 text-muted">See the <a href="#projects" class="term-link">Products section</a> for details.</p>
</div>`;

        case 'experience':
          return `
<p><strong>Securden</strong> &bull; Software Engineer &bull; Mar 2024 – Present</p>
<p>- PAM, Just-In-Time access, SSPR and identity provider integrations; DevOps secrets plugins.</p>
<p><strong>DAAT</strong> &bull; Software Engineer &bull; May 2022 – Feb 2024</p>
<p>- Backend workflows for a SaaS platform and a student management system; internal project management tool.</p>
<p><strong>ROOK</strong> &bull; Software Engineer &bull; Aug 2020 – Apr 2022</p>
<p>- Full-stack modules in Python, Django and JavaScript, from research to production.</p>`;

        case 'education':
          return `
<p><strong>B.E. Computer Science Engineering</strong> &bull; Rajalakshmi Institute of Technology, Chennai (2020 – 2024)</p>
<p>- Internship at Madras Defence Academy; big data fault analysis project with SetConnect.</p>
<p>- <span class="text-yellow">Smart India Hackathon 2022 winner</span> with GrantBase.</p>
<p>- Led AI Horizon 2022 and ran placement training for my batch.</p>
<p class="text-muted">More in the <a href="#education" class="term-link">Education section</a>.</p>`;

        case 'events':
          return `
<p>&bull; <strong>Guest Lecture</strong> — Java concurrency for enterprise systems, Vel Tech High Tech, Chennai (26 Sep 2026)</p>
<p>&bull; <strong>Jury Member</strong> — Internal Hackathon, Rajalakshmi Institute of Technology (2026)</p>
<p>&bull; <strong>Jury Member</strong> — Internal Hackathon, St. Joseph College of Engineering (2024)</p>`;

        case 'resume':
          this.triggerResumeDownload();
          return `
<p class="text-green">&#x2714; Initiating download for <strong>${portfolioStore.resumeFilename}</strong>...</p>
<p class="text-muted">Direct link: <a href="${portfolioStore.resumeUrl}" download="${portfolioStore.resumeFilename}" data-track="resume" class="term-link">Click here if download did not start</a>.</p>`;

        case 'contact':
          return `
<div class="contact-output">
  <div>&bull; <strong>Email:</strong> <a href="mailto:contact@abishek.in" class="term-link">contact@abishek.in</a></div>
  <div>&bull; <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/abishek-v-p" target="_blank" class="term-link">linkedin.com/in/abishek-v-p</a></div>
  <div>&bull; <strong>GitHub:</strong> <a href="https://github.com/abishekvp" target="_blank" class="term-link">github.com/abishekvp</a></div>
  <div>&bull; <strong>Instagram:</strong> <a href="https://www.instagram.com/abiraj.vp06/" target="_blank" class="term-link">abiraj.vp06</a></div>
</div>`;

        case 'whoami':
          return `guest &bull; exploring Abishek's work. Try <span class="cmd-pill">products</span> or <span class="cmd-pill">events</span>.`;

        case 'sudo':
          return `<span class="text-green">[ACCESS GRANTED]</span> Let's build something together: <a href="#contact" class="term-link">#contact</a>.`;

        default:
          return `<span class="text-red">zsh: command not found: ${cmd}</span>. Type <span class="cmd-pill">help</span> for a list of valid commands.`;
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
    triggerResumeDownload() {
      const link = document.createElement('a');
      link.href = portfolioStore.resumeUrl;
      link.download = portfolioStore.resumeFilename;
      link.setAttribute('data-track', 'resume');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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

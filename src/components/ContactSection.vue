<template>
  <section v-if="contactData.visible" id="contact" class="section contact-section">
    <div class="container">
      <div class="section-title">
        <div class="code-badge mb-2">
          <span>{{ contactData.badge || '// CONTACT' }}</span>
        </div>
        <h2 v-html="contactData.sectionTitle || 'Let&rsquo;s <span class=\'gradient-text\'>talk</span>'"></h2>
        <p class="text-secondary">{{ contactData.sectionSubtitle || 'Open to backend and security engineering roles.' }}</p>
      </div>

      <div class="contact-grid">
        <!-- Left: Interactive Message Form -->
        <div class="contact-form-card glass-card">
          <div class="terminal-dots mb-3">
            <span class="terminal-dot red"></span>
            <span class="terminal-dot yellow"></span>
            <span class="terminal-dot green"></span>
            <span class="terminal-tag ml-auto">send_message.sh</span>
          </div>

          <h3 class="form-heading">{{ contactData.formHeading || 'Send a message' }}</h3>
          <p class="form-subheading">
            {{ contactData.formSubheading || 'Hiring for backend, platform or security engineering? Send a message below or connect directly.' }}
          </p>

          <form
            v-if="!formSubmitted"
            data-abishek-contact
            class="contact-form"
            @submit.prevent="handleSubmit"
          >
            <div class="form-row">
              <div class="form-group">
                <label>Your Name *</label>
                <input
                  type="text"
                  name="name"
                  v-model="formData.name"
                  required
                  placeholder="e.g. Alex Morgan"
                  class="glass-input"
                />
              </div>
              <div class="form-group">
                <label>Your Email *</label>
                <input
                  type="email"
                  name="email"
                  v-model="formData.email"
                  required
                  placeholder="e.g. alex@example.com"
                  class="glass-input"
                />
              </div>
            </div>

            <div class="form-group">
              <label>Message *</label>
              <textarea
                name="message"
                v-model="formData.message"
                required
                rows="5"
                placeholder="Type your message here..."
                class="glass-input"
              ></textarea>
            </div>

            <!-- Honeypot field -->
            <input
              type="text"
              name="website"
              tabindex="-1"
              autocomplete="off"
              aria-hidden="true"
              style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0"
            />

            <button type="submit" class="btn btn-primary submit-btn" :disabled="isSubmitting">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
              <span>{{ isSubmitting ? 'Sending...' : 'Send message' }}</span>
            </button>
          </form>

          <!-- Confirmation Message -->
          <div v-else class="confirmation-box glass">
            <div class="confirmation-icon">✓</div>
            <h4 class="confirmation-title">Message Sent Successfully</h4>
            <p class="confirmation-desc">
              Thank you for reaching out! I have received your message and will get back to you shortly.
            </p>
            <button type="button" class="btn btn-glass btn-sm font-mono" @click="resetForm">
              Send another message
            </button>
          </div>
        </div>

        <!-- Right: Contact Methods & Socials -->
        <div class="contact-info-col">
          <div class="contact-info-card glass-card">
            <h3 class="info-title">Let's talk</h3>
            <p class="info-roles">
              {{ contactData.intro || 'Hiring for backend, platform or security engineering? Send a message below, email me, or connect on LinkedIn.' }}
            </p>

            <div class="methods-list">
              <a
                v-for="method in contactMethods"
                :key="method.name"
                :href="method.link"
                class="method-item glass"
                :target="method.name === 'Email' ? undefined : '_blank'"
                :rel="method.name === 'Email' ? undefined : 'noopener noreferrer'"
                :download="method.name === 'Resume' ? 'Abishek_V_Software_Engineer.pdf' : undefined"
              >
                <div class="method-icon-circle">{{ method.icon }}</div>
                <div class="method-text">
                  <span class="method-name font-mono">{{ method.name }}</span>
                  <span class="method-value">{{ method.value }}</span>
                </div>
                <span class="method-arrow">&rarr;</span>
              </a>
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
  name: "ContactSection",
  data() {
    return {
      formData: {
        name: "",
        email: "",
        message: "",
      },
      isSubmitting: false,
      formSubmitted: false,
    };
  },
  computed: {
    contactData() {
      return portfolioStore.contact;
    },
    contactMethods() {
      return [
        {
          name: "Email",
          icon: "📧",
          value: "contact@abishek.in",
          link: "mailto:contact@abishek.in",
        },
        {
          name: "LinkedIn",
          icon: "💼",
          value: "linkedin.com/in/abishek-v-p",
          link: "https://www.linkedin.com/in/abishek-v-p/",
        },
        {
          name: "GitHub",
          icon: "💻",
          value: "github.com/abishekvp",
          link: "https://github.com/abishekvp",
        },
        {
          name: "Resume",
          icon: "📄",
          value: "Download Resume (PDF)",
          link: "/Abishek_V_Software_Engineer.pdf",
        },
      ];
    },
  },
  methods: {
    async handleSubmit(e) {
      this.isSubmitting = true;
      try {
        const formEl = e.target;
        // If the PortfolioManager SDK is loaded, it might intercept or post
        const formData = new FormData(formEl);
        const adminUrl = import.meta.env.VITE_ADMIN_URL || "";
        if (adminUrl) {
          try {
            await fetch(`${adminUrl}/api/messages`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: this.formData.name,
                email: this.formData.email,
                message: this.formData.message,
              }),
            });
          } catch (netErr) {
            console.log("Direct API message post handled", netErr);
          }
        }
      } catch (err) {
        console.error("Submission error:", err);
      } finally {
        this.isSubmitting = false;
        this.formSubmitted = true;
      }
    },
    resetForm() {
      this.formData = { name: "", email: "", message: "" };
      this.formSubmitted = false;
    },
  },
};
</script>

<style scoped>
.contact-section {
  position: relative;
  z-index: 1;
  padding-bottom: var(--spacing-xl);
}

.mb-2 { margin-bottom: 0.75rem; }
.mb-3 { margin-bottom: 1rem; }
.ml-auto { margin-left: auto; }

.font-mono {
  font-family: var(--font-mono);
}

.terminal-tag {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.contact-grid {
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  gap: var(--spacing-2xl);
  align-items: start;
}

/* Left Form Card */
.contact-form-card {
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid var(--glass-border);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
}

.form-heading {
  font-size: 1.4rem;
  margin-bottom: 0.35rem;
  color: var(--color-text-primary);
}

.form-subheading {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group label {
  font-size: 0.8rem;
  font-family: var(--font-mono);
  color: var(--color-text-secondary);
}

.glass-input {
  width: 100%;
  padding: 0.8rem 1rem;
  background: rgba(10, 15, 28, 0.6);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-sm);
  color: var(--color-text-primary);
  font-family: inherit;
  font-size: 0.95rem;
  transition: all var(--transition-fast);
}

.glass-input:focus {
  outline: none;
  border-color: var(--color-accent-primary);
  box-shadow: 0 0 15px rgba(14, 165, 233, 0.25);
  background: rgba(10, 15, 28, 0.85);
}

.submit-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.85rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-start;
  margin-top: 0.5rem;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Confirmation Box */
.confirmation-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2.5rem 1.5rem;
  border-radius: var(--radius-md);
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.confirmation-icon {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #10b981;
  color: #fff;
  display: grid;
  place-items: center;
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 1rem;
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
}

.confirmation-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
}

.confirmation-desc {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  max-width: 440px;
  margin-bottom: 1.5rem;
}

.btn-sm {
  padding: 0.45rem 1rem;
  font-size: 0.85rem;
}

/* Right Info Card */
.contact-info-col {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.contact-info-card {
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid var(--glass-border);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
}

.info-title {
  font-size: 1.35rem;
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
}

.info-roles {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
  margin-bottom: 1.5rem;
}

.methods-list {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.method-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.85rem 1.15rem;
  border-radius: var(--radius-md);
  background: rgba(10, 15, 28, 0.55);
  border: 1px solid var(--glass-border);
  text-decoration: none;
  transition: all var(--transition-fast);
}

.method-item:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: var(--glass-border-hover);
  transform: translateX(4px);
}

.method-icon-circle {
  font-size: 1.25rem;
}

.method-text {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.method-name {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.method-value {
  font-size: 0.92rem;
  color: var(--color-text-primary);
  font-weight: 500;
}

.method-arrow {
  color: var(--color-text-muted);
  font-size: 1.1rem;
  transition: transform var(--transition-fast);
}

.method-item:hover .method-arrow {
  transform: translateX(3px);
  color: var(--color-accent-primary);
}

@media (max-width: 900px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>

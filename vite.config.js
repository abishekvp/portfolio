import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

/**
 * Adds the Portfolio Manager SDK to index.html from .env:
 *   VITE_ADMIN_URL      admin server (e.g. https://admin.abishek.in)
 *   VITE_PORTFOLIO_KEY  this site's API key (admin → API keys & integration). When it is empty
 *                       the admin serves its default site, so the key is optional for that one.
 * Preconnects open the connections early so the content check on each page load returns fast
 * (script = normal, fetch = CORS).
 */
function portfolioSdk(env) {
  const adminUrl = (env.VITE_ADMIN_URL || "").replace(/\/+$/, "");
  const key = (env.VITE_PORTFOLIO_KEY || "").trim();
  return {
    name: "portfolio-sdk",
    transformIndexHtml() {
      if (!adminUrl) return [];
      return [
        { tag: "link", attrs: { rel: "preconnect", href: adminUrl }, injectTo: "head" },
        { tag: "link", attrs: { rel: "preconnect", href: adminUrl, crossorigin: true }, injectTo: "head" },
        {
          tag: "script",
          attrs: { src: `${adminUrl}/api/portfolio_manager.js`, ...(key && { "data-key": key }), async: true },
          injectTo: "head",
        },
      ];
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  return {
    plugins: [vue(), portfolioSdk(env)],
    build: {
      chunkSizeWarningLimit: 800,
      rollupOptions: {},
    },
    server: {
      port: 5173,
      open: true,
    },
  };
});

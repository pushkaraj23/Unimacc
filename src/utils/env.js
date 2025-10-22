// src/utils/env.js
/**
 * Centralized environment configuration for Unimacc React App
 * Safely manages API URLs, tokens, and runtime feature flags
 */

const ENV = {
  APP_ENV: import.meta.env.VITE_APP_ENV || "development",

  // 🔗 Backend API
  API_BASE_URL:
    import.meta.env.VITE_API_BASE_URL || "http://4.247.21.119:4798/api/",

  // 🔒 Authentication Keys
  TOKEN_KEY: import.meta.env.VITE_TOKEN_KEY || "unimacc_access_token",
  REFRESH_TOKEN_KEY:
    import.meta.env.VITE_REFRESH_TOKEN_KEY || "unimacc_refresh_token",

  // ⚙️ Feature Toggles
  ENABLE_LOGS: import.meta.env.VITE_ENABLE_LOGS === "true",
  ENABLE_REACT_QUERY_DEVTOOLS:
    import.meta.env.VITE_ENABLE_RQ_DEVTOOLS === "true",

  // 📊 Integrations (optional)
  GA_TRACKING_ID: import.meta.env.VITE_GA_TRACKING_ID || "",
  SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN || "",
};

// 🧩 Dev Helper Log
if (ENV.APP_ENV === "development" && ENV.ENABLE_LOGS) {
  console.log("🧠 Environment Config:", ENV);
}

export default ENV;

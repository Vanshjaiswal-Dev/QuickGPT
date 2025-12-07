import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { useAuthStore } from "./store/authStore.js";
import { useChatStore } from "./store/chatStore.js";
import { useUIStore } from "./store/uiStore.js";

// Initialize stores
useUIStore.getState().initializeTheme();

// Expose stores to window for debugging (only in development)
if (import.meta.env.DEV) {
  window.__STORES__ = {
    auth: useAuthStore,
    chat: useChatStore,
    ui: useUIStore,
  };
  console.log('🔧 Dev Mode: Stores available at window.__STORES__');
  console.log('   Example: window.__STORES__.auth.getState()');
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

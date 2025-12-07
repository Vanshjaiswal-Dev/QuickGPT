import { create } from 'zustand';

export const useUIStore = create((set) => ({
  // State
  theme: localStorage.getItem("theme") || "light",

  // Actions
  setTheme: (theme) => {
    set({ theme });
    localStorage.setItem("theme", theme);
    
    // Apply theme to document
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  },

  toggleTheme: () => {
    set((state) => {
      const newTheme = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      
      // Apply theme to document
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      
      return { theme: newTheme };
    });
  },

  // Initialize theme on app load
  initializeTheme: () => {
    set((state) => {
      if (state.theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return state;
    });
  }
}));

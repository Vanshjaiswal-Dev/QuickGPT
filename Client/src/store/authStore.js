import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

export const useAuthStore = create((set, get) => ({
  // State
  user: null,
  token: localStorage.getItem("token") || null,
  loadingUser: true,

  // Actions
  setUser: (user) => set({ user }),
  
  setToken: (token) => {
    set({ token });
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  },

  fetchUser: async (providedToken) => {
    const token = providedToken || get().token;
    try {
      const { data } = await axios.get('api/user/data', {
        headers: { Authorization: token }
      });
      if (data.success) {
        set({ user: data.user });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loadingUser: false });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null });
    toast.success("Logged out successfully");
  },

  // Initialize auth on app load
  initializeAuth: async () => {
    const { token, fetchUser } = get();
    if (token) {
      await fetchUser();
    } else {
      set({ user: null, loadingUser: false });
    }
  }
}));

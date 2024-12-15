import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  hasProfilePicture:
    localStorage.getItem("hasProfilePicture") === "true" || false,

  login: (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    set({ user: userData, token, isAuthenticated: true });
  },

  logOut: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("hasProfilePicture");
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      hasProfilePicture: false,
    });
  },

  setProfilePicture: (profilePicture) => {
    set((state) => {
      const updatedUser = { ...state.user, avatar: profilePicture };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      localStorage.setItem("hasProfilePicture", "true");
      return { user: updatedUser, hasProfilePicture: true };
    });
  },
}));

export default useAuthStore;

import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: (userData, token) => {
    set({ user: userData, token, isAuthenticated: true });
  },

  logOut: () => {
    set({ user: null, token: null, isAuthenticated: false });
  },

  setProfilePicture: (profilPicture) => {
    set((state) => ({ user: { ...state.user, avatar: profilPicture } }));
  },
}));

export default useAuthStore;

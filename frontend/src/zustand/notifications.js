import { create } from "zustand";

const useNotificationStore = create((set) => ({
  message: null,
  setMessage: (msg) => set({ message: msg }),
  clearMessage: () => set({ message: null }),
}));

export default useNotificationStore;

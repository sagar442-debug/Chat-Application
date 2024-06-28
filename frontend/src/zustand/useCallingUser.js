import { create } from "zustand";

const useCallingUser = create((set) => ({
  currentUser: null,
  setCurrentUser: (currentUser) => set({ currentUser }),
  isCalling: false,
  setIsCalling: (isCalling) => set({ isCalling }),
}));

export default useCallingUser;

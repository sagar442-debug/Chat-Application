import { create } from "zustand";

const useCallingUser = create((set) => ({
  continuingCall: false,
  setContinuingCall: (continuingCall) => set({ continuingCall }),
  currentUser: null,
  setCurrentUser: (currentUser) => set({ currentUser }),
  isCalling: false,
  setIsCalling: (isCalling) => set({ isCalling }),
}));

export default useCallingUser;

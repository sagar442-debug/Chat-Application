import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  sidebarPage: "friends",
  setSidebarPage: (sidebarPage) => set({ sidebarPage }),
  searchInput: " ",
  setSearchInput: (searchInput) => set({ searchInput }),
}));

export default useConversation;

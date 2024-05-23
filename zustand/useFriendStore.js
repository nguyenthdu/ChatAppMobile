import { create } from "zustand";

export const useFriendStore = create((set) => ({
  senderId: "",
  receiverId: "",
  isAccept: false,
  listFriend: [],
  listPendingRequest: [],
  listPendingSended: [],
  setSenderId: (senderId) => set({ senderId }),
  setReceiverId: (receiverId) => set({ receiverId }),
  setListFriend: (listFriend) => set({ listFriend }),
  setListPendingRequest: (listPendingRequest) => set({ listPendingRequest }),
  setListPendingSended: (listPendingSended) => set({ listPendingSended }),
  setIsAccept: (isAccept) => set({ isAccept }),
  resetFriendStore: () => set({ senderId: "", receiverId: "" }),
}));

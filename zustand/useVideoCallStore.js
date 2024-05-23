/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

export const useVideoCallStore = create((set) => ({
  callingUserId: "",
  callingUserName: "",
  callingUserAvatar: "",
  isCalling: false,
  isCallInProgress: false,
  callEnded: false,
  isMicEnabled: true,

  setCallingUserId: (callingUserId) => set({ callingUserId }),
  setCallingUserName: (callingUserName) => set({ callingUserName }),
  setCallingUserAvatar: (callingUserAvatar) => set({ callingUserAvatar }),
  setCalling: (isCalling) => set({ isCalling }),
  setCallInProgress: (isCallInProgress) => set({ isCallInProgress }),
  setCallEnded: (callEnded) => set({ callEnded }),
  toggleMic: () => set((state) => ({ isMicEnabled: !state.isMicEnabled })),
}));

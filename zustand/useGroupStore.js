import { create } from "zustand";

export const useGroupStore = create((set) => ({
  listMember: [],
  listAdmin: [],
  listGroup: [],
  setListMember: (listMember) => set({ listMember }),
  setListAdmin: (listAdmin) => set({ listAdmin }),
  setListGroup: (listGroup) => set({ listGroup }),
}));

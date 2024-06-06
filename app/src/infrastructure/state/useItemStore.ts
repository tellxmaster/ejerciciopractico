import { create } from "zustand";
import { Item } from "../../domain/models/Item";

interface ItemStore {
  items: Item[];
  addItem: (item: Item) => void;
  setItems: (items: Item[]) => void;
}

export const useItemStore = create<ItemStore>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),
  setItems: (items) => set({ items }),
}));

// src/infrastructure/state/useCustomerOrderStore.ts
import { create } from "zustand";
import { CustomerOrder } from "../../domain/models/CustomerOrder";

interface CustomerOrderStore {
  customerOrders: CustomerOrder[];
  setCustomerOrders: (orders: CustomerOrder[]) => void;
}

export const useCustomerOrderStore = create<CustomerOrderStore>((set) => ({
  customerOrders: [],
  setCustomerOrders: (orders) => set({ customerOrders: orders }),
}));

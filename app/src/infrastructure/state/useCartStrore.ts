import { create } from "zustand";
import { OrderItem } from "../../domain/models/OrderItem";
import { Item } from "../../domain/models/Item";

interface CartStore {
  cart: OrderItem[];
  addToCart: (item: Item, quantity: number) => void;
  removeFromCart: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  increaseQuantity: (id: number) => void; // Added increaseQuantity function
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  addToCart: (item, quantity) => {
    set((state) => {
      const existingItem = state.cart.find(
        (orderItem) => orderItem.item.id === item.id
      );
      if (existingItem) {
        return {
          cart: state.cart.map((orderItem) =>
            orderItem.item.id === item.id
              ? { ...orderItem, quantity: orderItem.quantity + quantity }
              : orderItem
          ),
        };
      } else {
        return { cart: [...state.cart, { item, quantity }] };
      }
    });
  },
  removeFromCart: (id) => {
    set((state) => ({
      cart: state.cart.filter((orderItem) => orderItem.item.id !== id),
    }));
  },
  decreaseQuantity: (id) => {
    set((state) => ({
      cart: state.cart
        .map((orderItem) =>
          orderItem.item.id === id && orderItem.quantity > 1
            ? { ...orderItem, quantity: orderItem.quantity - 1 }
            : orderItem
        )
        .filter((orderItem) => orderItem.quantity > 0),
    }));
  },
  increaseQuantity: (id) => {
    set((state) => ({
      cart: state.cart.map((orderItem) =>
        orderItem.item.id === id
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      ),
    }));
  },
  clearCart: () => {
    set({ cart: [] });
  },
}));

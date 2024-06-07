import { create } from "zustand";
import { Client } from "../../domain/models/Client";

interface ClientStore {
  clients: Client[];
  addClient: (client: Client) => void;
  setClients: (clients: Client[]) => void;
  removeClient: (clientId: number) => void; // Add removeClient method
}

export const useClientStore = create<ClientStore>((set) => ({
  clients: [],
  addClient: (client) =>
    set((state) => ({
      clients: [...state.clients, client],
    })),
  setClients: (clients) => set({ clients }),
  removeClient: (clientId) =>
    set((state) => ({
      clients: state.clients.filter((client) => client.id !== clientId),
    })),
}));

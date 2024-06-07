import endpoints from "../../config/endpoints";
import api from "../../infrastructure/api/api";
import { Client } from "../models/Client";

export const fetchClientsRepository = async (): Promise<Client[]> => {
  const response = await api.get<Client[]>(endpoints.clients);
  return response.data;
};

export const createClientRepository = async (
  client: Client
): Promise<Client> => {
  const response = await api.post<Client>(endpoints.clients, client);
  return response.data;
};

export const deleteClientRepository = async (
  clientId: number
): Promise<void> => {
  await api.delete(`${endpoints.clients}/${clientId}`);
};

export const updateClientRepository = async (
  clientId: string,
  client: Client
): Promise<Client> => {
  const response = await api.put<Client>(
    `${endpoints.clients}/${clientId}`,
    client
  );
  return response.data;
};

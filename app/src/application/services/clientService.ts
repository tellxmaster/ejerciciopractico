import { Client } from "../../domain/models/Client";
import {
  fetchClientsRepository,
  createClientRepository,
  deleteClientRepository,
  updateClientRepository,
} from "../../domain/repositories/clientRepository";

export const fetchClientsService = async (): Promise<Client[]> => {
  return await fetchClientsRepository();
};

export const createClientService = async (client: Client): Promise<Client> => {
  return await createClientRepository(client);
};

export const deleteClientService = async (clientId: string): Promise<void> => {
  return await deleteClientRepository(clientId);
};

export const updateClientService = async (
  clientId: string,
  client: Client
): Promise<Client> => {
  return await updateClientRepository(clientId, client);
};

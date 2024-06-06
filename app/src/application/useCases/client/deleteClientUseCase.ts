import { deleteClientService } from "../../services/clientService";

export const deleteClient = async (clientId: string): Promise<void> => {
  return await deleteClientService(clientId);
};

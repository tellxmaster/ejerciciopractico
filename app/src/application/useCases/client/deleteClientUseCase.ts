import { deleteClientService } from "../../services/clientService";

export const deleteClientUseCase = async (clientId: number): Promise<void> => {
  return await deleteClientService(clientId);
};

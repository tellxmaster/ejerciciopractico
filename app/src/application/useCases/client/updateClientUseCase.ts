import { Client } from "../../../domain/models/Client";
import { updateClientService } from "../../services/clientService";

export const updateClientUseCase = async (
  clientId: string,
  client: Client
): Promise<Client> => {
  return await updateClientService(clientId, client);
};

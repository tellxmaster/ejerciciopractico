import { Client } from "../../../domain/models/Client";
import { createClientService } from "../../services/clientService";

export const createClientUseCase = async (client: Client): Promise<Client> => {
  return await createClientService(client);
};

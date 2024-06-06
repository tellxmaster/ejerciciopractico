import { Client } from "../../../domain/models/Client";
import { fetchClientsService } from "../../services/clientService";

export const fetchClientsUseCase = async (): Promise<Client[]> => {
  return await fetchClientsService();
};

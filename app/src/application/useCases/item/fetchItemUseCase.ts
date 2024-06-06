import { Item } from "../../../domain/models/Item";
import { fetchItemsService } from "../../services/itemService";

export const fetchItemsUseCase = async (): Promise<Item[]> => {
  return await fetchItemsService();
};

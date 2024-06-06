import { Item } from "../../../domain/models/Item";
import { createItemService } from "../../services/itemService";

export const createItemUseCase = async (item: Item): Promise<Item> => {
  return await createItemService(item);
};

import { Item } from "../../../domain/models/Item";
import { updateItemService } from "../../services/itemService";

export const updateItemUseCase = async (
  itemId: string,
  item: Item
): Promise<Item> => {
  return await updateItemService(itemId, item);
};

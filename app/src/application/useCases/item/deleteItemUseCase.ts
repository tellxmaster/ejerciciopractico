import { deleteItemService } from "../../services/itemService";

export const deleteItem = async (itemId: string): Promise<void> => {
  return await deleteItemService(itemId);
};

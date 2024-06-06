import { Item } from "../../domain/models/Item";
import {
  fetchItemsRepository,
  createItemRepository,
  deleteItemRepository,
  updateItemRepository,
} from "../../domain/repositories/itemRepository";

export const fetchItemsService = async (): Promise<Item[]> => {
  return await fetchItemsRepository();
};

export const createItemService = async (item: Item): Promise<Item> => {
  return await createItemRepository(item);
};

export const deleteItemService = async (itemId: string): Promise<void> => {
  return await deleteItemRepository(itemId);
};

export const updateItemService = async (
  itemId: string,
  item: Item
): Promise<Item> => {
  return await updateItemRepository(itemId, item);
};

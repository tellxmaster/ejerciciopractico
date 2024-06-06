import endpoints from "../../config/endpoints";
import api from "../../infrastructure/api/api";
import { Item } from "../models/Item";

export const fetchItemsRepository = async (): Promise<Item[]> => {
  const response = await api.get<Item[]>(endpoints.items);
  return response.data;
};

export const createItemRepository = async (item: Item): Promise<Item> => {
  const response = await api.post<Item>(endpoints.items, item);
  return response.data;
};

export const deleteItemRepository = async (itemId: string): Promise<void> => {
  await api.delete(`${endpoints.items}/${itemId}`);
};

export const updateItemRepository = async (
  itemId: string,
  item: Item
): Promise<Item> => {
  const response = await api.put<Item>(`${endpoints.items}/${itemId}`, item);
  return response.data;
};

import { Item } from "./Item";

export interface OrderItem {
  id?: number;
  quantity: number;
  item: Item;
}

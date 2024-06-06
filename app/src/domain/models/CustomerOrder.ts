import { Client } from "./Client";
import { Item } from "./Item";

export interface CustomerOrder {
  id: number;
  code: string;
  date: Date;
  client: Client;
  items: Item[];
}

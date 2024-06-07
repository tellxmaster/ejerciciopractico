import { Client } from "./Client";
import { OrderItem } from "./OrderItem";

export interface CustomerOrder {
  id?: number;
  code?: string;
  date: Date;
  client?: Client;
  orderItems: OrderItem[];
}

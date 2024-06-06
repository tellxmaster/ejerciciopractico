import { CustomerOrder } from "./CustomerOrder";

export interface Item {
  id: number;
  code: string | null;
  imageUrl: string;
  name: string;
  price: number;
  customerOrder: CustomerOrder | null;
}

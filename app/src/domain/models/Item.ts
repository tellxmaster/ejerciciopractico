import { CustomerOrder } from "./CustomerOrder";

export interface Item {
  id: number;
  code: string | null;
  imgUrl: string;
  name: string;
  price: number;
  customerOrder: CustomerOrder | null;
}

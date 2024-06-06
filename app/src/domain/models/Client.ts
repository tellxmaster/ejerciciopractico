import { CustomerOrder } from "./CustomerOrder";

export interface Client {
  id: number;
  name: string;
  lastname: string;
  customerOrders: CustomerOrder[];
}

import { CustomerOrder } from "../../../domain/models/CustomerOrder";
import { createCustomerOrderService } from "../../services/customerOrderService";

export const createCustomerOrderUseCase = async (
  customerOrder: CustomerOrder
): Promise<CustomerOrder> => {
  return await createCustomerOrderService(customerOrder);
};

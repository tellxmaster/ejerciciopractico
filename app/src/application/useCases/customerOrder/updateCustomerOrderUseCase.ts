import { CustomerOrder } from "../../../domain/models/CustomerOrder";
import { updateCustomerOrderService } from "../../services/customerOrderService";

export const updateCustomerOrderUseCase = async (
  customerOrderId: string,
  customerOrder: CustomerOrder
): Promise<CustomerOrder> => {
  return await updateCustomerOrderService(customerOrderId, customerOrder);
};

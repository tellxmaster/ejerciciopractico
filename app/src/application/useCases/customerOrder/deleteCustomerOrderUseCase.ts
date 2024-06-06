import { deleteCustomerOrderService } from "../../services/customerOrderService";

export const deleteCustomerOrder = async (
  customerOrderId: string
): Promise<void> => {
  return await deleteCustomerOrderService(customerOrderId);
};

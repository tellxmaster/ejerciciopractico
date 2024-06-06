import { CustomerOrder } from "../../domain/models/CustomerOrder";
import {
  fetchCustomerOrdersRepository,
  createCustomerOrderRepository,
  deleteCustomerOrderRepository,
  updateCustomerOrderRepository,
} from "../../domain/repositories/customerOrderRepository";

export const fetchCustomerOrdersService = async (): Promise<
  CustomerOrder[]
> => {
  return await fetchCustomerOrdersRepository();
};

export const createCustomerOrderService = async (
  customerOrder: CustomerOrder
): Promise<CustomerOrder> => {
  return await createCustomerOrderRepository(customerOrder);
};

export const deleteCustomerOrderService = async (
  customerOrderId: string
): Promise<void> => {
  return await deleteCustomerOrderRepository(customerOrderId);
};

export const updateCustomerOrderService = async (
  customerOrderId: string,
  customerOrder: CustomerOrder
): Promise<CustomerOrder> => {
  return await updateCustomerOrderRepository(customerOrderId, customerOrder);
};

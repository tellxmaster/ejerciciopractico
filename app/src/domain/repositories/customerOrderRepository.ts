import endpoints from "../../config/endpoints";
import api from "../../infrastructure/api/api";
import { CustomerOrder } from "../models/CustomerOrder";

export const fetchCustomerOrdersRepository = async (): Promise<
  CustomerOrder[]
> => {
  const response = await api.get<CustomerOrder[]>(endpoints.customerOrders);
  return response.data;
};

export const createCustomerOrderRepository = async (
  customerOrder: CustomerOrder
): Promise<CustomerOrder> => {
  const response = await api.post<CustomerOrder>(
    endpoints.customerOrders,
    customerOrder
  );
  return response.data;
};

export const deleteCustomerOrderRepository = async (
  customerOrderId: string
): Promise<void> => {
  await api.delete(`${endpoints.customerOrders}/${customerOrderId}`);
};

export const updateCustomerOrderRepository = async (
  customerOrderId: string,
  customerOrder: CustomerOrder
): Promise<CustomerOrder> => {
  const response = await api.put<CustomerOrder>(
    `${endpoints.customerOrders}/${customerOrderId}`,
    customerOrder
  );
  return response.data;
};

import { CustomerOrder } from "../../../domain/models/CustomerOrder";
import { fetchCustomerOrdersService } from "../../services/customerOrderService";

export const fetchCustomerOrdersUseCase = async (): Promise<
  CustomerOrder[]
> => {
  return await fetchCustomerOrdersService();
};

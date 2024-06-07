import { useEffect } from "react";

import { fetchCustomerOrdersUseCase } from "../../../application/useCases/customerOrder/fetchCustomerOrdersUseCase";
import { useCustomerOrderStore } from "../../../infrastructure/state/useCustomerOrderStore";

const CustomerOrderList = () => {
  const { customerOrders, setCustomerOrders } = useCustomerOrderStore();

  useEffect(() => {
    const loadCustomerOrders = async () => {
      try {
        const customerOrdersData = await fetchCustomerOrdersUseCase();
        setCustomerOrders(customerOrdersData);
      } catch (error) {
        console.error("Error fetching customer orders:", error);
      }
    };

    loadCustomerOrders();
  }, [setCustomerOrders]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Customer Orders</h1>
      <ul className="space-y-4">
        {customerOrders.map((order) => (
          <li key={order.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="mb-2">
              <p className="text-gray-700 font-bold">
                Order Code: {order.code}
              </p>
              <p className="text-gray-700">
                Date: {new Date(order.date).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                Client: {order.client?.name} {order.client?.lastname}
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold mb-2">Order Items:</h2>
              <ul className="space-y-2">
                {order.orderItems.map((item) => (
                  <li
                    key={item.item.id}
                    className="flex justify-between text-gray-500 text-sm"
                  >
                    <div>
                      <p className="text-gray-700">
                        {item.item.name} (x{item.quantity})
                      </p>
                      <p className="text-gray-600 text-sm">{item.item.code}</p>
                    </div>
                    <p className="text-gray-900 font-bold">
                      ${(item.item.price * item.quantity).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerOrderList;

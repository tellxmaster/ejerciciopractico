import Modal from "../common/Modal";
import { CustomerOrder } from "../../../domain/models/CustomerOrder";
import { createCustomerOrderUseCase } from "../../../application/useCases/customerOrder/createCustomerOrderUseCase";

import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import { OrderItem } from "../../../domain/models/OrderItem";
import { useCartStore } from "../../../infrastructure/state/useCartStrore";

const CartModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const {
    cart,
    clearCart,
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
  } = useCartStore();

  const total = cart.reduce(
    (sum, orderItem) => sum + orderItem.item.price * orderItem.quantity,
    0
  );

  const handleOrder = async () => {
    const newOrder: CustomerOrder = {
      date: new Date(),
      orderItems: cart,
    };

    try {
      const createdOrder = await createCustomerOrderUseCase(newOrder);
      console.log("Pedido realizado:", createdOrder);
      clearCart();
      onClose();
    } catch (error) {
      console.error("Error al realizar el pedido:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <div>
          <p className="text-gray-700">There are no products in the cart.</p>
          <div className="flex justify-end mt-4 space-x-2">
            <button
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <div>
          <ul className="mb-4">
            {cart.map((orderItem: OrderItem) => (
              <li
                key={orderItem.item.id}
                className="mb-2 flex justify-between items-center"
              >
                <div>
                  <p className="font-bold">{orderItem.item.name}</p>
                  <p className="text-gray-600">{orderItem.item.code}</p>
                  <p className="text-gray-600">
                    Quantity: {orderItem.quantity}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-gray-900 font-bold">
                    ${(orderItem.item.price * orderItem.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => increaseQuantity(orderItem.item.id)}
                    className="text-gray-700 px-2 py-1 rounded hover:text-gray-500 focus:outline-none"
                  >
                    <FaPlus size={12} />
                  </button>
                  <button
                    onClick={() => decreaseQuantity(orderItem.item.id)}
                    className="text-gray-700 px-2 py-1 rounded hover:text-gray-500 focus:outline-none"
                  >
                    <FaMinus size={12} />
                  </button>
                  <button
                    onClick={() => removeFromCart(orderItem.item.id)}
                    className="text-gray-700 px-2 py-1 rounded hover:text-gray-500 focus:outline-none"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t pt-4">
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
          </div>
          <div className="flex justify-end mt-4 space-x-2">
            <button
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none"
            >
              Cancel
            </button>
            <button
              onClick={handleOrder}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CartModal;

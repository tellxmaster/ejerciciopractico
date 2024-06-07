import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import CartModal from "./CartModal";
import { useCartStore } from "../../../infrastructure/state/useCartStrore";

const Cart = () => {
  const { cart } = useCartStore();
  const itemCount = cart.length;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative inline-block cursor-pointer">
      <div className="absolute bottom-0 right-0 bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center transform translate-x-2 translate-y-1">
        <span className="text-gray-700 text-xs">{itemCount}</span>
      </div>
      <div className="p-2 flex items-center justify-center" onClick={openModal}>
        <FaShoppingCart size={18} className="text-gray-700" />
      </div>
      <CartModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Cart;

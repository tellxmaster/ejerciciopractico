import { FaShoppingCart } from "react-icons/fa";

const Cart = () => {
  const itemCount = 5; // Replace with the actual number of items in the cart

  return (
    <div className="relative inline-block cursor-pointer">
      <div className="absolute bottom-0 right-0 bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center transform translate-x-2 ">
        <span className="text-gray-700 text-sm">{itemCount}</span>
      </div>
      <div className="p-2 flex items-center justify-center">
        <FaShoppingCart size={18} className="text-gray-700" />
      </div>
    </div>
  );
};

export default Cart;

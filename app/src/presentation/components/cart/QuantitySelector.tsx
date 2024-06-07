interface QuantitySelectorProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  setQuantity,
}) => {
  const handleDecrease = () => {
    setQuantity(Math.max(1, quantity - 1));
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleDecrease}
        className="bg-gray-200 text-gray-800 px-2 py-1 rounded hover:bg-gray-300 focus:outline-none"
      >
        -
      </button>
      <span className="text-lg px-2">{quantity}</span>
      <button
        onClick={handleIncrease}
        className="bg-gray-200 text-gray-800 px-2 py-1 rounded hover:bg-gray-300 focus:outline-none"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;

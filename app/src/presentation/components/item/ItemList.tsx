import { useEffect, useState } from "react";

import Modal from "../common/Modal"; // Make sure the path is correct
import { useItemStore } from "../../../infrastructure/state/useItemStore";
import { fetchItemsUseCase } from "../../../application/useCases/item/fetchItemUseCase";
import CreateItem from "./CreateItem";

const ItemList = () => {
  const { items, setItems } = useItemStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const itemsData = await fetchItemsUseCase();
        setItems(itemsData);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    loadItems();
  }, [setItems]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-8">
      <div className="flex justify-end mb-4">
        <button
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={openModal}
        >
          <span className="text-lg">New Item</span>
          <span className="text-xl">+</span>
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-6">Items</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-32 object-cover mb-4 rounded-lg"
            />
            <h2 className="text-lg font-bold">{item.name}</h2>
            <p className="text-gray-600">{item.code}</p>
            <p className="text-gray-900 font-bold">${item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <CreateItem onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default ItemList;

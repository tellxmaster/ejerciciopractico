import React, { useState } from "react";

import { createItemUseCase } from "../../../application/useCases/item/createItemUseCase";
import { Item } from "../../../domain/models/Item";
import { useItemStore } from "../../../infrastructure/state/useItemStore";

const CreateItem = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState<File | null>(null);
  const { addItem } = useItemStore();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: Item = {
      id: Date.now(),
      name,
      code: null,
      price: price || 0,
      imageUrl: imageUrl
        ? URL.createObjectURL(imageUrl)
        : "/public/images/default-product-image.png",
      customerOrder: null,
    };
    try {
      const createdItem = await createItemUseCase(newItem);
      addItem(createdItem);
      onClose();
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add New Item</h2>
      <form onSubmit={handleSave}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter item name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter item price"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="imageUrl"
            className="block text-gray-700 font-bold mb-2"
          >
            Image
          </label>
          <input
            type="file"
            id="imageUrl"
            onChange={(e) =>
              setImageUrl(e.target.files ? e.target.files[0] : null)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="Select file"
          />
        </div>
        <div className="flex justify-end mt-4 space-x-2">
          <button
            type="button"
            className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateItem;

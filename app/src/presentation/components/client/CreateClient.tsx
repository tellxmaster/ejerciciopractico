import React, { useState } from "react";
import { useClientStore } from "../../../infrastructure/state/useClientStore";
import { Client } from "../../../domain/models/Client";
import { createClientUseCase } from "../../../application/useCases/client/createClientUseCase";

const CreateClient = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const { addClient } = useClientStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newClient: Client = {
      id: Date.now(),
      name,
      lastname,
      customerOrders: [],
    };
    try {
      const createdClient = await createClientUseCase(newClient);
      addClient(createdClient);
      onClose();
    } catch (error) {
      console.error("Error creating client:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Lastname
        </label>
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex justify-end mt-4 space-x-2">
        <button
          onClick={onClose}
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default CreateClient;

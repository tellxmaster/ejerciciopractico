import React, { useState } from "react";

import { useClientStore } from "../../../infrastructure/state/useClientStore";
import { Client } from "../../../domain/models/Client";
import { createClientUseCase } from "../../../application/useCases/client/createClientUseCase";

const CreateClient = () => {
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
    } catch (error) {
      console.error("Error creating client:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Nombre
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
          Apellido
        </label>
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Crear Cliente
      </button>
    </form>
  );
};

export default CreateClient;

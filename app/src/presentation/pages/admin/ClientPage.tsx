import { useEffect } from "react";
import { useClientStore } from "../../../infrastructure/state/useClientStore";
import { fetchClientsUseCase } from "../../../application/useCases/client/fetchClientsUseCase";
import { deleteClientUseCase } from "../../../application/useCases/client/deleteClientUseCase";
import { BiTrash } from "react-icons/bi";

const ClientList = () => {
  const { clients, setClients, removeClient } = useClientStore();

  useEffect(() => {
    const loadClients = async () => {
      try {
        const clientsData = await fetchClientsUseCase();
        setClients(clientsData);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    loadClients();
  }, [setClients]);

  const handleDelete = async (clientId: number) => {
    try {
      await deleteClientUseCase(clientId);
      removeClient(clientId);
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Lista de Clientes</h2>
      <ul className="divide-y divide-gray-200 p-4">
        {clients.map((client) => (
          <li
            key={client.id}
            className="flex justify-between items-center py-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex flex-col">
              <span className="text-lg font-semibold">
                <span className="font-bold">Name: </span>
                {client.name}
              </span>
              <span className="text-lg font-semibold">
                <span className="font-bold">Last Name: </span>
                {client.lastname}
              </span>
            </div>
            <button
              onClick={() => handleDelete(client.id)}
              className="text-red-500 hover:text-red-700 focus:outline-none transition-colors"
            >
              <BiTrash size={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientList;

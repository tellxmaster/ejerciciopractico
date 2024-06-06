import { useEffect } from "react";
import { useClientStore } from "../../../infrastructure/state/useClientStore";
import { fetchClientsUseCase } from "../../../application/useCases/client/fetchClientsUseCase";

const ClientList = () => {
  const { clients, setClients } = useClientStore();

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

  return (
    <div>
      <h1>Clients</h1>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            {client.name} {client.lastname}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientList;

import React from "react";
import ClientList from "../components/client/ClientList";
import CreateClient from "../components/client/CreateClient";

const ClientPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Clientes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Crear Cliente</h2>
          <CreateClient />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">Lista de Clientes</h2>
          <ClientList />
        </div>
      </div>
    </div>
  );
};

export default ClientPage;

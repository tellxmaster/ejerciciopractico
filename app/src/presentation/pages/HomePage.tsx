import React from "react";
import ItemList from "../components/item/ItemList";

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <ItemList />
    </div>
  );
};

export default HomePage;

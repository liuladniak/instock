import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Styles
import "./InventoryPage.scss";

// Components
import InventoryHeader from "../../components/InventoryHeader/InventoryHeader";
import InventoryList from "../../components/InventoryList/InventoryList";
import InventoryLabels from "../../components/InventoryLabels/InventoryLabels";

const API_URL = "http://localhost:8080";

const InventoryPage = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/inventories`);
        setInventoryData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchInventory();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="inventory-page">
      <main className="inventory-page__container">
        <InventoryHeader />
        <div className="inventory-page__mobile">
          <InventoryLabels
            inventoryData={inventoryData}
            setInventoryData={setInventoryData}
          />
        </div>
        <div className="inventory-page__non-mobile">
          <InventoryList
            inventoryData={inventoryData}
            setInventoryData={setInventoryData}
          />
        </div>
      </main>
    </div>
  );
};

export default InventoryPage;
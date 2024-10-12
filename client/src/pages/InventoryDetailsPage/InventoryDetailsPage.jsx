import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Styles
import "./InventoryDetailsPage.scss";

// Components
import InventoryDetailsHeader from "../../components/InventoryDetailsHeader/InventoryDetailsHeader";
import InventoryDetails from "../../components/InventoryDetails/InventoryDetails";

const API_URL = "http://localhost:8080";

const InventoryDetailsPage = () => {
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchInventoryItem = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/inventories/${id}`);
        setItem(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchInventoryItem();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="inventorydetails-page">
      <main className="inventorydetails-page__container">
        <InventoryDetailsHeader item={item} />
        <InventoryDetails inventoryData={item} />
      </main>
    </div>
  );
};

export default InventoryDetailsPage;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Styles
import "./WarehouseDetailsPage.scss";

// Components
import WarehouseDetailsHeader from "../../components/InventoryHeader/InventoryHeader";
import WarehouseDetailsList from "../../components/WarehouseDetailsList/WarehouseDetailsList";
import WarehouseDetailsLabels from "../../components/WarehouseDetailsLabels/WarehouseDetailsLabels";
import WarehouseDetails from "../../components/WarehouseDetails/WarehouseDetails";

const API_URL = "http://localhost:8080";

const WarehouseDetailsPage = () => {
  const { id } = useParams();
  const [inventoryData, setInventoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [warehouseToDisplay, setWarehouseToDisplay] = useState([]);

  const warehouseDetails = "${API_URL}/api/warehouses/${id}";

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/warehouses/${id}/inventories`
        );

        const getresponse = await axios.get(`${API_URL}/api/warehouses/${id}`);
        setInventoryData(response.data);
        setWarehouseToDisplay(getresponse.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchInventory();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="warehousedetails-page">
      <main className="warehousedetails-page__container">
        <WarehouseDetails warehouseToDisplay={warehouseToDisplay} />
        <div className="inventory-page__mobile">
          <WarehouseDetailsLabels inventoryData={inventoryData} />
        </div>
        <div className="warehousedetails-page__non-mobile">
          <WarehouseDetailsList inventoryData={inventoryData} />
        </div>
      </main>
    </div>
  );
};

export default WarehouseDetailsPage;

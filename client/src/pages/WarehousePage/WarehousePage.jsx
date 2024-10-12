import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Styles
import "./WarehousePage.scss";

// Components
import WarehouseHeader from "../../components/WarehouseHeader/WarehouseHeader";
import WarehouseList from "../../components/WarehouseList/WarehouseList";
import WarehouseLabels from "../../components/WarehouseLabels/WarehouseLabels";

const API_URL = "http://localhost:8080";

const WarehousePage = () => {
  const [warehouseData, setWarehouseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWarehouse = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/warehouses`);
        setWarehouseData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchWarehouse();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="warehouse-page">
      <main className="warehouse-page__container">
        <WarehouseHeader />
        <div className="warehouse-page__mobile">
          <WarehouseLabels
            warehouseData={warehouseData}
            setWarehouseData={setWarehouseData}
          />
        </div>
        <div className="warehouse-page__non-mobile">
          <WarehouseList
            warehouseData={warehouseData}
            setWarehouseData={setWarehouseData}
          />
        </div>
      </main>
    </div>
  );
};

export default WarehousePage;

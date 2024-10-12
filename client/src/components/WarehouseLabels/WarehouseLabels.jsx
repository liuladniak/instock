import chevron from "../../assets/icons/chevron.svg";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import "./WarehouseLabels.scss";
import { Link, useNavigate } from "react-router-dom";
import React from "react";

import axios from "axios";
import { useState } from "react";
import DeleteWarehouseModal from "../DeleteWarehouseModal/DeleteWarehouseModal";

function WarehouseLabels({ warehouseData, setWarehouseData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const navigate = useNavigate();
  const API_URL = "http://localhost:8080";

  const openModal = (itemId) => {
    setIsModalOpen(true);
    setSelectedItemId(itemId);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItemId(null);
  };

  const deleteItem = async () => {
    const warehouseDeleteURL = `${API_URL}/api/warehouses/${selectedItemId}`;

    try {
      await axios.delete(warehouseDeleteURL);
      const updatedData = warehouseData.filter(
        (item) => item.id !== selectedItemId
      );
      setWarehouseData(updatedData);
      setIsModalOpen(false); 
    } catch (error) {
      console.error("Error deleting warehouse:", error);
    }
  };

  return (
    <div className="container">
      <div className="warehouse-labels">
        {warehouseData.map((item, index) => (
          <div key={index} className="warehouse-labels__item">
            <div className="warehouse-labels__row">
              <div className="warehouse-labels__column1">
                <div>
                  <p className="warehouse-labels__title">WAREHOUSE</p>
                  <div
                    className="warehouse-labels__item-container"
                    onClick={() => navigate(`/warehouse/${item.id}`)}
                  >
                    <p className="warehouse-labels__item-name">
                      {item.warehouse_name}
                    </p>
                    <img
                      className="warehouse-labels__chevron"
                      src={chevron}
                      alt="chevron"
                    />
                  </div>
                </div>
                <div>
                  <p className="warehouse-labels__title">ADDRESS</p>
                  <p>{`${item.address}, ${item.city}, ${item.country}`}</p>
                </div>
              </div>
              <div className="warehouse-labels__column2">
                <div>
                  <p className="warehouse-labels__title">CONTACT NAME</p>
                  <p>{item.contact_name}</p>
                </div>
                <div>
                  <p className="warehouse-labels__title">CONTACT INFORMATION</p>
                  <p>{`${item.contact_phone}, ${item.contact_email}`}</p>
                </div>
              </div>
            </div>

            <div className="warehouse-labels__actions-row">
              <img
                className="warehouse-labels__actions-delete"
                src={deleteIcon}
                alt="move to trash"
                onClick={() => openModal(item.id)}
              />

              {isModalOpen && selectedItemId === item.id && (
                <DeleteWarehouseModal
                  isOpen={true}
                  closeModal={closeModal}
                  deleteItem={deleteItem}
                  item={item}
                />
              )}

              <Link to={`/warehouse/edit/${item.id}`}>
                <img
                  className="warehouse-labels__actions-edit"
                  src={editIcon}
                  alt="edit item"
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WarehouseLabels;

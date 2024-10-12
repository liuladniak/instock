import chevron from "../../assets/icons/chevron.svg";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import sortIcon from "../../assets/icons/sort.svg";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./WarehouseList.scss";

import axios from "axios";
import { useState } from "react";
import DeleteWarehouseModal from "../DeleteWarehouseModal/DeleteWarehouseModal";

function WarehouseList({ warehouseData, setWarehouseData }) {
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
    <div className="warehouse-list">
      <div className="warehouse-list__header">
        <div className="warehouse-list__header-column">
          <p className="warehouse-list__header-title warehouse-list__header-title--first">
            WAREHOUSE
          </p>
          <img src={sortIcon} alt="sort columns" />
        </div>

        <div className="warehouse-list__header-column">
          <p className="warehouse-list__header-title">ADDRESS</p>
          <img src={sortIcon} alt="sort columns" />
        </div>

        <div className="warehouse-list__header-column">
          <p className="warehouse-list__header-title">CONTACT NAME</p>
          <img src={sortIcon} alt="sort columns" />
        </div>

        <div className="warehouse-list__header-column">
          <p className="warehouse-list__header-title">CONTACT INFORMATION</p>
          <img src={sortIcon} alt="sort columns" />
        </div>

        <div className="warehouse-list__header-column">
          <p className="warehouse-list__header-title">ACTIONS</p>
        </div>
      </div>

      {warehouseData.map((item) => (
        <div className="warehouse-list__item" key={item.id}>
          <div
            className="warehouse-list__item-container"
            onClick={() => navigate(`/warehouse/${item.id}`)}
          >
            <p className="warehouse-list__item-name">{item.warehouse_name}</p>
            <img
              className="warehouse-list__chevron"
              src={chevron}
              alt="chevron"
            />
          </div>
          <p className="warehouse-list__item-address">
            {item.address}
            <br />
            {`${item.city}, ${item.country}`}
          </p>

          <p className="warehouse-list__item-contact-name">
            {item.contact_name}
          </p>
          <p className="warehouse-list__item-contact-info">
            {item.contact_phone} <br /> {item.contact_email}
          </p>

          <div className="warehouse-list__actions-row">
            <img
              className="warehouse-list__actions-delete"
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
                className="warehouse-list__actions-edit"
                src={editIcon}
                alt="edit item"
              />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WarehouseList;

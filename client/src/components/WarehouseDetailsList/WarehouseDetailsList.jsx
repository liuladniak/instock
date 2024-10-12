import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import chevron from "../../assets/icons/chevron.svg";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import sortIcon from "../../assets/icons/sort.svg";
import "./WarehouseDetailsList.scss";
import DeleteInventoryModal from "../DeleteInventoryModal/DeleteInventoryModal";

function WarehouseDetailsList({ inventoryData, setInventoryData }) {
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
    const inventoryDeleteURL = `${API_URL}/api/inventories/${selectedItemId}`;

    try {
      await axios.delete(inventoryDeleteURL);
      const updatedInventoryData = inventoryData.filter(
        (item) => item.id !== selectedItemId
      );
      setInventoryData(updatedInventoryData);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting inventory item:", error);
    }
  };

  return (
    <div className="warehousedetails-list">
      <div className="warehousedetails-list__header">
        <div className="warehousedetails-list__header-column">
          <p className="warehousedetails-list__header-title warehousedetails-list__header-title--first">
            INVENTORY ITEM
          </p>
          <img src={sortIcon} alt="sort columns" />
        </div>

        <div className="warehousedetails-list__header-column">
          <p className="warehousedetails-list__header-title">CATEGORY</p>
          <img src={sortIcon} alt="sort columns" />
        </div>

        <div className="warehousedetails-list__header-column">
          <p className="warehousedetails-list__header-title">STATUS</p>
          <img src={sortIcon} alt="sort columns" />
        </div>

        <div className="warehousedetails-list__header-column">
          <p className="warehousedetails-list__header-title">QTY</p>
          <img src={sortIcon} alt="sort columns" />
        </div>

        <div className="warehousedetails-list__header-column">
          <p className="warehousedetails-list__header-title">ACTIONS</p>
        </div>
      </div>

      {inventoryData.map((item) => (
        <div className="warehousedetails-list__item" key={item.id}>
          <Link to={`/inventory/${item.id}`} className="warehousedetails-list__item-container">
            <p className="warehousedetails-list__item-name">{item.item_name}</p>
            <img
              className="warehousedetails-list__chevron"
              src={chevron}
              alt="chevron"
            />
          </Link>
          <p className="warehousedetails-list__item-category">{item.category}</p>
          <p
            className={`warehousedetails-list__item-stock ${
              item.status === "In Stock"
                ? "warehousedetails-list__item-stock--in-stock"
                : "warehousedetails-list__item-stock--out-of-stock"
            }`}
          >
            {item.status}
          </p>
          <p className="warehousedetails-list__item-quantity">{item.quantity}</p>
          <div className="warehousedetails-list__actions-row">
              <img
                className="warehousedetails-list__actions-delete"
                src={deleteIcon}
                alt="move to trash"
                onClick={() => openModal(item.id)}
              />
            {isModalOpen && selectedItemId === item.id && (
              <DeleteInventoryModal
                isOpen={true}
                closeModal={closeModal}
                deleteItem={deleteItem}
                item={item}
              />
            )}

            <Link to={`/inventory/edit/${item.id}`}>
              <img
                className="warehousedetails-list__actions-edit"
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

export default WarehouseDetailsList;

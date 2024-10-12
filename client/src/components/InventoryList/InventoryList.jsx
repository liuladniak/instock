import chevron from "../../assets/icons/chevron.svg";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import sortIcon from "../../assets/icons/sort.svg";
import React from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import "./InventoryList.scss";
import { useState } from "react";

import DeleteInventoryModal from "../DeleteInventoryModal/DeleteInventoryModal";

function InventoryList({ inventoryData, setInventoryData }) {
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
    <div className="inventory-list">
      <div className="inventory-list__header">
        <div className="inventory-list__header-column">
          <p className="inventory-list__header-title inventory-list__header-title--first">
            INVENTORY ITEM
          </p>
          <img src={sortIcon} alt="sort columns" />
        </div>

        <div className="inventory-list__header-column">
          <p className="inventory-list__header-title">CATEGORY</p>
          <img src={sortIcon} alt="sort columns" />
        </div>

        <div className="inventory-list__header-column">
          <p className="inventory-list__header-title">STATUS</p>
          <img src={sortIcon} alt="sort columns" />
        </div>

        <div className="inventory-list__header-column">
          <p className="inventory-list__header-title">QTY</p>
          <img src={sortIcon} alt="sort columns" />
        </div>

        <div className="inventory-list__header-column">
          <p className="inventory-list__header-title">WAREHOUSE</p>
          <img src={sortIcon} alt="sort columns" />
        </div>

        <div className="inventory-list__header-column">
          <p className="inventory-list__header-title">ACTIONS</p>
        </div>
      </div>

      {inventoryData.map((item) => (
        <div className="inventory-list__item" key={item.id}>
          <div
            className="inventory-list__item-container"
            onClick={() => navigate(`/inventory/${item.id}`)}
          >
            <p className="inventory-list__item-name">{item.item_name}</p>
            <img
              className="inventory-list__chevron"
              src={chevron}
              alt="chevron"
            />
          </div>
          <p className="inventory-list__item-category">{item.category}</p>

          <p
            className={`inventory-list__item-stock ${
              item.status === "In Stock"
                ? "inventory-list__item-stock--in-stock"
                : "inventory-list__item-stock--out-of-stock"
            }`}
          >
            {item.status}
          </p>
          <p className="inventory-list__item-quantity">{item.quantity}</p>
          <p className="inventory-list__item-warehouse">
            {item.warehouse_name}
          </p>

          <div className="inventory-list__actions-row">
            <img
              className="inventory-list__actions-delete"
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
                className="inventory-list__actions-edit"
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

export default InventoryList;

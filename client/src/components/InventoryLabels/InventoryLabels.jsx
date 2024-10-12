import chevron from "../../assets/icons/chevron.svg";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import "./InventoryLabels.scss";
import { Link, useNavigate } from "react-router-dom";

import React from "react";
import axios from "axios";
import { useState } from "react";

import DeleteInventoryModal from "../DeleteInventoryModal/DeleteInventoryModal";

function InventoryLabels({ inventoryData, setInventoryData }) {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
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
    <div className="container">
      <div className="inventory-labels">
        {inventoryData.map((item, index) => (
          <div key={index} className="inventory-labels__item">
            <div className="inventory-labels__row">
              <div className="inventory-labels__column1">
                <div>
                  <p className="inventory-labels__title">INVENTORY ITEM</p>
                  <div
                    className="inventory-labels__item-container"
                    onClick={() => navigate(`/inventory/${item.id}`)}
                  >
                    <p className="inventory-labels__item-name">
                      {item.item_name}
                    </p>
                    <img
                      className="inventory-labels__chevron"
                      src={chevron}
                      alt="chevron"
                    />
                  </div>
                </div>
                <div>
                  <p className="inventory-labels__title">CATEGORY</p>
                  <p>{item.category}</p>
                </div>
              </div>
              <div className="inventory-labels__column2">
                <div>
                  <p className="inventory-labels__title">STATUS</p>
                  <p
                    className={`inventory-labels__stock ${
                      item.status === "In Stock"
                        ? "inventory-labels__stock--in-stock"
                        : "inventory-labels__stock--out-of-stock"
                    }`}
                  >
                    {item.status}
                  </p>
                </div>
                <div>
                  <p className="inventory-labels__title">QTY</p>
                  <p>{item.quantity}</p>
                </div>
                <div>
                  <p className="inventory-labels__title">WAREHOUSE</p>
                  <p>{item.warehouse_name}</p>
                </div>
              </div>
            </div>

            <div className="inventory-labels__actions-row">
              <img
                className="inventory-labels__actions-delete"
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
                  className="inventory-labels__actions-edit"
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

export default InventoryLabels;

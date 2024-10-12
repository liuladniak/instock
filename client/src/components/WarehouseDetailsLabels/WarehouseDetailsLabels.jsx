import chevron from "../../assets/icons/chevron.svg";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import "./WarehouseDetailsLabels.scss";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteInventoryModal from "../DeleteInventoryModal/DeleteInventoryModal";

const API_URL = "http://localhost:8080";

function WarehouseDetailsLabels() {
  const { id } = useParams(); 
  const [inventoryData, setInventoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

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

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/warehouses/${id}/inventories`);
        setInventoryData(response.data);
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

  const handleClick = (e, itemId, itemName) => {
    e.preventDefault();
    console.log(`Delete item ${itemName} with ID ${itemId}`);
  };

  return (
    <div className="container">
      <div className="warehousedetails-labels">
        {inventoryData.map((item, index) => (
          <div key={index} className="warehousedetails-labels__item">
            <div className="warehousedetails-labels__row">
              <div className="warehousedetails-labels__column1">
                <div>
                  <p className="warehousedetails-labels__title">INVENTORY ITEM</p>
                  <Link to={`/inventory/${item.id}`} className="warehousedetails-labels__item-container">
                    <p className="warehousedetails-labels__item-name">
                      {item.item_name}
                    </p>
                    <img
                      className="warehousedetails-labels__chevron"
                      src={chevron}
                      alt="chevron"
                    />
                  </Link>
                </div>
                <div>
                  <p className="warehousedetails-labels__title">CATEGORY</p>
                  <p>{item.category}</p>
                </div>
              </div>
              <div className="warehousedetails-labels__column2">
                <div>
                  <p className="warehousedetails-labels__title">STATUS</p>
                  <p
                    className={`warehousedetails-labels__stock ${
                      item.status === "In Stock"
                        ? "warehousedetails-labels__stock--in-stock"
                        : "warehousedetails-labels__stock--out-of-stock"
                    }`}
                  >
                    {item.status}
                  </p>
                </div>
                <div>
                  <p className="warehousedetails-labels__title">QTY</p>
                  <p>{item.quantity}</p>
                </div>
              </div>
            </div>

            <div className="warehousedetails-labels__actions-row">
              <a href="#" onClick={(e) => handleClick(e, item.id)}>
                <img
                  className="warehousedetails-labels__actions-delete"
                  src={deleteIcon}
                  alt="move to trash"
                  onClick={() => openModal(item.id)}
                />
              </a>
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
                  className="warehousedetails-labels__actions-edit"
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

export default WarehouseDetailsLabels;

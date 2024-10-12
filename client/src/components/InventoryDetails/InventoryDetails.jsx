import React from "react";
import "./InventoryDetails.scss";

const InventoryDetails = ({ inventoryData }) => {
  if (!inventoryData) {
    return <div>Loading...</div>;
  }
  const { description, category, status, quantity, warehouse_name } =
    inventoryData;

  return (
    <div className="inventory-details">
      <section className="inventory-details__section">
        <div className="inventory-details__section-group">
          <label className="inventory-details__section-group-label">
            ITEM DESCRIPTION
          </label>
          <p className="inventory-details__section-group-info">{description}</p>
        </div>
        <div className="inventory-details__section-group">
          <label className="inventory-details__section-group-label">
            CATEGORY
          </label>
          <p className="inventory-details__section-group-info">{category}</p>
        </div>
      </section>
      <section className="inventory-details__section">
        <div className="inventory-details__section-double-group">
          <div className="inventory-details__section-group">
            <label className="inventory-details__section-group-label">
              STATUS
            </label>
            <p
              className={`inventory-details__section-group-info ${
                status === "In Stock"
                  ? "inventory-details__stock inventory-details__stock--in-stock"
                  : "inventory-details__stock inventory-details__stock--out-of-stock"
              }`}
            >
              {status}
            </p>
          </div>
          <div className="inventory-details__section-group">
            <label className="inventory-details__section-group-label">
              QUANTITY
            </label>
            <p className="inventory-details__section-group-info">{quantity}</p>
          </div>
        </div>
        <div className="inventory-details__section-group">
          <label className="inventory-details__section-group-label">
            WAREHOUSE
          </label>
          <p className="inventory-details__section-group-info">
            {warehouse_name}
          </p>
        </div>
      </section>
    </div>
  );
};

export default InventoryDetails;

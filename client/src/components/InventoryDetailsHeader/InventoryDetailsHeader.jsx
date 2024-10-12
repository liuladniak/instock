import React from "react";
import backArrow from "../../assets/icons/arrow_back.svg";
import editIcon from "../../assets/icons/edit-white.svg";
import { Link, useNavigate } from "react-router-dom";
import "./InventoryDetailsHeader.scss";

const InventoryDetailsHeader = ({ item }) => {
  const navigate = useNavigate();

  return (
    <header className="inventorydetails-header">
      <div className="inventorydetails-header__container">
        <button
          className="inventorydetails-header__back"
          onClick={() => navigate(-1)}
        >
          <img src={backArrow} alt="Back" />
        </button>
        <h1 className="inventorydetails-header__title">{item.item_name}</h1>
        <Link
          to={`/inventory/edit/${item.id}`}
          className="inventorydetails-header__edit"
        >
          <img src={editIcon} alt="Edit" />
          <span className="inventorydetails-header__edit-text">Edit</span>
        </Link>
      </div>
    </header>
  );
};

export default InventoryDetailsHeader;

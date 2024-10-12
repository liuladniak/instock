import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import "./InventoryHeader.scss";

function InventoryHeader({ type, text, searchParam }) {
  const navigate = useNavigate();
  return (
    <header className="inventory-header">
      <div className="inventory-header__container">
        <h1 className="inventory-header__title">Inventory</h1>
        <div className="warehouse-header__cta-wrp">
          <input
            type="text"
            className="inventory-header--search"
            placeholder="Search..."
            name="search"
          />
          <Button to="/inventory/add" className="btn--save btn--save-inv">
            + Add New Item
          </Button>
        </div>
      </div>
    </header>
  );
}

export default InventoryHeader;

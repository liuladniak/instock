import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import "./WarehouseHeader.scss";

function WarehouseHeader({ type, text, searchParam }) {
  const navigate = useNavigate();
  return (
    <header className="warehouse-header">
      <div className="warehouse-header__container">
        <h1 className="warehouse-header__title">Warehouses</h1>
        <div className="warehouse-header__cta-wrp">
          <input
            type="text"
            className="warehouse-header--search"
            placeholder="Search..."
            name="search"
          />
          <Button to="/warehouse/add" className="btn--save btn--save-inv">
            + Add New Warehouse
          </Button>
        </div>
      </div>
    </header>
  );
}

export default WarehouseHeader;

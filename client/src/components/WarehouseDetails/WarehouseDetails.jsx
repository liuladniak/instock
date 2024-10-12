import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import "./WarehouseDetails.scss";
import { useParams } from "react-router-dom";

import backArrowIcon from "../../assets/icons/arrow_back.svg";
import edit from "../../assets/icons/edit-white.svg";

function WarehouseHeader({ warehouseToDisplay }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleEditClick = () => {
    navigate(`/warehouse/edit/${id}`);
  };

  const handleBackClick = () => {
    navigate(`/`);
  };
  console.log(warehouseToDisplay[0]);
  const warehouseName = warehouseToDisplay[0].warehouse_name;
  const warehouseAddress = warehouseToDisplay[0].address;
  const city = warehouseToDisplay[0].city;
  const country = warehouseToDisplay[0].country;
  const warehouseContact = warehouseToDisplay[0].contact_name;
  const warehouseContactPosition = warehouseToDisplay[0].contact_position;
  const warehousePhone = warehouseToDisplay[0].contact_phone;
  const warehouseEmail = warehouseToDisplay[0].contact_email;

  console.log(warehouseName);

  return (
    <header className="warehouse">
      <div className="warehouse-header">
        <div className="warehouse-header-title">
          <img
            onClick={handleBackClick}
            src={backArrowIcon}
            alt="back-button"
          />
          <h1 className="warehouse-header__title">{warehouseName}</h1>
        </div>

        <Button className="warehouse-header-button" onClick={handleEditClick}>
          <img src={edit} alt="Edit Icon" />
          <span className="warehouse-header-edit-text">Edit</span>
        </Button>
      </div>

      <div className="warehouse-details">
        <div className="warehouse-details__address">
          <h2 className="warehouse-details__heading">WAREHOUSE ADDRESS:</h2>
          <p className="warehouse-details__text">{`${warehouseAddress},`}</p>
          <p className="warehouse-details__text">{`${city}, ${country}`}</p>
        </div>
        <div className="warehouse-details__all-contact">
          <div className="warehouse-details__contact-name">
            <h2 className="warehouse-details__heading">CONTACT NAME:</h2>
            <p className="warehouse-details__text">{warehouseContact}</p>
            <p className="warehouse-details__text">
              {warehouseContactPosition}
            </p>
          </div>
          <div className="warehouse-details__contact-info">
            <h2 className="warehouse-details__heading">CONTACT INFORMATION:</h2>
            <p className="warehouse-details__text">{warehousePhone}</p>
            <p className="warehouse-details__text">{warehouseEmail}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default WarehouseHeader;

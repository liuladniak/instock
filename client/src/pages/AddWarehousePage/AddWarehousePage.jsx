import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../utils/api";
import {
  formatPhoneNumber,
  validatePhoneNumber,
  validateEmail,
} from "../../utils/formUtils";
import "../../styles/add-edit-section.scss";
import "../../styles/form.scss";
import backArrowIcon from "../../assets/icons/arrow_back.svg";
import WarehouseForm from "../../components/WarehouseForm/WarehouseForm";

function AddWarehousePage() {
  const [formData, setFormData] = useState({
    warehouse_name: "",
    address: "",
    city: "",
    country: "",
    contact_name: "",
    contact_position: "",
    contact_phone: "",
    contact_email: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.warehouse_name) {
      newErrors.warehouse_name = "This field is required";
    }
    if (!formData.address) {
      newErrors.address = "This field is required";
    }
    if (!formData.city) {
      newErrors.city = "This field is required";
    }
    if (!formData.country) {
      newErrors.country = "This field is required";
    }
    if (!formData.contact_name) {
      newErrors.contact_name = "This field is required";
    }
    if (!formData.contact_position) {
      newErrors.contact_position = "This field is required";
    }
    if (!formData.contact_phone) {
      newErrors.contact_phone = "This field is required";
    } else if (!validatePhoneNumber(formData.contact_phone)) {
      newErrors.contact_phone = "Invalid phone number";
    }
    if (!formData.contact_email) {
      newErrors.contact_email = "This field is required";
    } else if (!validateEmail(formData.contact_email)) {
      newErrors.contact_email = "Invalid email address";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const formattedPhone = formatPhoneNumber(formData.contact_phone);
    formData.contact_phone = formattedPhone;

    try {
      await axios.post(`${API_URL}/api/warehouses`, formData);
      setErrors({});
      setMessage({ type: "success", text: "Warehouse added successfully!" });
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        const newErrors = {};
        error.response.data.errors.forEach((err) => {
          newErrors[err.param] = err.msg;
        });
        setErrors(newErrors);
      } else {
        setMessage({
          type: "error",
          text: "Error adding warehouse. Please try again later or refresh the page",
        });
      }
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <section className="section-container">
      <div className="section">
        <div className="section-heading">
          <img
            src={backArrowIcon}
            alt="back arrow icon"
            onClick={() => navigate(-1)}
          />
          <h1>Add New Warehouse</h1>
        </div>

        <WarehouseForm
          handleSubmit={handleSubmit}
          errors={errors}
          formData={formData}
          handleChange={handleChange}
          handleCancel={handleCancel}
          btnCta={"+ Add Warehouse"}
          modifier={"add"}
        />

        {message.text && (
          <div className="status-message">
            <span className={`status-message--${message.type}`}>
              {message.text}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

export default AddWarehousePage;

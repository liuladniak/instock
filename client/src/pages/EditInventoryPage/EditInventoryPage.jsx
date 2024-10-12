import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../utils/api";
import "../AddInventoryPage/AddInventoryPage.scss";
import "../../styles/add-edit-section.scss";
import backArrowIcon from "../../assets/icons/arrow_back.svg";
import InventoryForm from "../../components/InventoryForm/InventoryForm";

function EditInventoryPage() {
  const [formData, setFormData] = useState({
    warehouse_id: "",
    item_name: "",
    description: "",
    category: "",
    status: "In Stock",
    quantity: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });
  const [categories, setCategories] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [inStock, setInStock] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getInventoryData = async () => {
      try {
        const [responseInv, responseWh, responseOneInv] = await Promise.all([
          axios.get(`${API_URL}/api/inventories/`),
          axios.get(`${API_URL}/api/warehouses/`),
          axios.get(`${API_URL}/api/inventories/${id}`),
        ]);
        const inventoriesData = responseInv.data;
        const warehousesData = responseWh.data;
        let inventoryData = responseOneInv.data;

        const uniqueCategories = [
          ...new Set(inventoriesData.map((item) => item.category)),
        ];

        const warehouseOptions = warehousesData.map((item) => ({
          id: item.id,
          name: item.warehouse_name,
        }));

        const matchingWarehouse = warehousesData.find(
          (warehouse) =>
            warehouse.warehouse_name === inventoryData.warehouse_name
        );

        if (matchingWarehouse) {
          inventoryData = {
            ...inventoryData,
            warehouse_id: matchingWarehouse.id,
          };
        }

        setCategories(uniqueCategories);
        setWarehouses(warehouseOptions);
        setFormData(inventoryData);
        setInStock(inventoryData.status === "In Stock");
        setIsLoading(false);
        console.log("Warehouse Options: ", warehouseOptions);
        console.log("Form Data Warehouse ID: ", formData.warehouse_id);
        console.log("FormData", formData);
        console.log("Inventories Data", inventoriesData);
      } catch (error) {
        console.error(
          "There was an error fetching the inventories data!",
          error
        );
        setIsLoading(false);
      }
    };
    getInventoryData();
  }, [id]);

  const handleRadioChange = (event) => {
    const { value } = event.target;
    const inStockValue = value === "true";
    setInStock(inStockValue);
    setFormData((prevData) => ({
      ...prevData,
      status: inStockValue ? "In Stock" : "Out of Stock",
      quantity: inStockValue ? prevData.quantity : 0,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      status: "",
      quantity: "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "quantity") {
      const sanitizedValue = value === "" ? "" : parseInt(value, 10);
      setFormData((prevData) => ({
        ...prevData,
        [name]: sanitizedValue,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleCategoryChange = (categoryId) => {
    setFormData((prevData) => ({
      ...prevData,
      category: categoryId,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      category: "",
    }));
  };

  const handleWarehouseChange = (warehouseId) => {
    setFormData((prevData) => ({
      ...prevData,
      warehouse_id: warehouseId,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      warehouse_id: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.warehouse_id) {
      newErrors.warehouse_id = "This field is required";
    }
    if (!formData.item_name) {
      newErrors.item_name = "This field is required";
    }
    if (!formData.description) {
      newErrors.description = "This field is required";
    }
    if (!formData.category) {
      newErrors.category = "This field is required";
    }

    if (inStock && parseInt(formData.quantity, 10) <= 0) {
      newErrors.quantity =
        "Quantity must be greater than zero for in-stock items";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios.put(`${API_URL}/api/inventories/${id}`, formData);
      setErrors({});
      setMessage({ type: "success", text: "Item updated successfully!" });
      setTimeout(() => {
        navigate("/inventory");
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
          text: "Error updating item. Please try again later or refresh the page",
        });
      }
    }
  };

  const handleCancel = () => {
    navigate("/inventory");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="section-container">
      <div className="section">
        <div className="section-heading">
          <img
            src={backArrowIcon}
            alt="back arrow icon"
            onClick={() => navigate(-1)}
          />
          <h1>Edit Inventory Item</h1>
        </div>

        <InventoryForm
          handleSubmit={handleSubmit}
          errors={errors}
          formData={formData}
          handleChange={handleChange}
          categories={categories}
          handleCategoryChange={handleCategoryChange}
          inStock={inStock}
          handleRadioChange={handleRadioChange}
          warehouses={warehouses}
          handleWarehouseChange={handleWarehouseChange}
          handleCancel={handleCancel}
          btnCta={"Save"}
        />

        {message.text && (
          <div className="status-message">
            <span className={`status-message--${message.type}`}>
              {message.text}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditInventoryPage;

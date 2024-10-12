import "../../styles/form.scss";
import errorIcon from "../../assets/icons/error.svg";
import SelectInput from "../SelectInput/SelectInput";
import RadioButton from "../RadioButton/RadioButton";
import Button from "../Button/Button";

function InventoryForm({
  handleSubmit,
  errors,
  formData,
  handleChange,
  categories,
  handleCategoryChange,
  inStock,
  handleRadioChange,
  warehouses,
  handleWarehouseChange,
  handleCancel,
  btnCta,
}) {
  return (
    <form method="POST" className="warehouse-form" onSubmit={handleSubmit}>
      <div className="form">
        <div className="form--wh">
          <h2 className="form__title">Item Details</h2>

          <div className="form-content">
            <div className="input-wrp">
              <label className="form-label" htmlFor="item_name">
                Item Name
              </label>
              <input
                className={`form-input  form-input--add ${
                  errors.item_name ? "input-error" : ""
                }`}
                type="text"
                name="item_name"
                placeholder="Item Name"
                value={formData.item_name}
                onChange={handleChange}
              />
              {errors.item_name && (
                <div className="error-wrp">
                  <img
                    className="error-icon"
                    src={errorIcon}
                    alt="error icon"
                  />
                  <p className="error">{errors.item_name}</p>
                </div>
              )}
            </div>

            <div className="input-wrp">
              <label className="form-label" htmlFor="description">
                Description
              </label>
              <textarea
                className={`form-textarea ${
                  errors.address ? "input-error" : ""
                }`}
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && (
                <div className="error-wrp">
                  <img
                    className="error-icon"
                    src={errorIcon}
                    alt="error icon"
                  />
                  <p className="error">{errors.description}</p>
                </div>
              )}
            </div>

            <div className="input-wrp">
              <label className="form-label" htmlFor="category">
                Category
              </label>

              <SelectInput
                options={categories.map((category) => ({
                  id: category,
                  name: category,
                }))}
                value={formData.category}
                onChange={handleCategoryChange}
              />

              {errors.category && (
                <div className="error-wrp">
                  <img
                    className="error-icon"
                    src={errorIcon}
                    alt="error icon"
                  />
                  <p className="error">{errors.category}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="form--contact">
          <h2 className="form__title">Item Availability</h2>

          <div className="form-content">
            <div className="input-wrp">
              <label className="radio-button form-label" htmlFor="status">
                Status
              </label>
              <div className="radio-buttons">
                <RadioButton
                  label="In stock"
                  value="true"
                  name="custom-radio"
                  checked={inStock === true}
                  onChange={handleRadioChange}
                />
                <RadioButton
                  label="Out of stock"
                  value="false"
                  name="custom-radio"
                  checked={inStock === false}
                  onChange={handleRadioChange}
                />
              </div>

              {errors.status && (
                <div className="error-wrp">
                  <img
                    className="error-icon"
                    src={errorIcon}
                    alt="error icon"
                  />
                  <p className="error">{errors.status}</p>
                </div>
              )}
            </div>
            {inStock && (
              <div className="input-wrp">
                <label className="form-label" htmlFor="quantity">
                  Quantity
                </label>
                <input
                  className={`form-input form-input--edit ${
                    errors.quantity ? "input-error" : ""
                  }`}
                  type="number"
                  name="quantity"
                  placeholder=""
                  value={formData.quantity}
                  onChange={handleChange}
                />
                {errors.quantity && (
                  <div className="error-wrp">
                    <img
                      className="error-icon"
                      src={errorIcon}
                      alt="error icon"
                    />
                    <p className="error">{errors.quantity}</p>
                  </div>
                )}
              </div>
            )}

            <div className="input-wrp">
              <label className="form-label" htmlFor="warehouse_id">
                Warehouse
              </label>
              <SelectInput
                options={warehouses}
                value={formData.warehouse_id}
                onChange={handleWarehouseChange}
              />
              {errors.warehouse_id && (
                <div className="error-wrp">
                  <img
                    className="error-icon"
                    src={errorIcon}
                    alt="error icon"
                  />
                  <p className="error">{errors.warehouse_id}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="form-cta-container">
        <Button type="button" className="btn--cancel" onClick={handleCancel}>
          Cancel
        </Button>
        <Button className="btn--save" type="submit">
          {btnCta}
        </Button>
      </div>
    </form>
  );
}

export default InventoryForm;

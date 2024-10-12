import "../../styles/form.scss";
import CustomPhoneInput from "../CustomPhoneInput/CustomPhoneInput";
import Button from "../Button/Button";
import errorIcon from "../../assets/icons/error.svg";

function WarehouseForm({
  handleSubmit,
  errors,
  formData,
  handleChange,
  handleCancel,
  btnCta,
  modifier,
}) {
  return (
    <form method="POST" className="warehouse-form" onSubmit={handleSubmit}>
      <div className="form">
        <div className="form--wh">
          <h2 className="form__title">Warehouse Details</h2>

          <div className="form-content">
            <div className="input-wrp">
              <label className="form-label" htmlFor="warehouse_name">
                Warehouse Name
              </label>
              <input
                className={`form-input form-input--${modifier} ${
                  errors.warehouse_name ? "input-error" : ""
                }`}
                type="text"
                name="warehouse_name"
                placeholder="Warehouse Name"
                value={formData.warehouse_name}
                onChange={handleChange}
              />
              {errors.warehouse_name && (
                <div className="error-wrp">
                  <img
                    className="error-icon"
                    src={errorIcon}
                    alt="error icon"
                  />
                  <p className="error">{errors.warehouse_name}</p>
                </div>
              )}
            </div>

            <div className="input-wrp">
              <label className="form-label" htmlFor="street">
                Street Address
              </label>
              <input
                className={`form-input form-input--add ${
                  errors.address ? "input-error" : ""
                }`}
                name="address"
                placeholder="Street Address"
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && (
                <div className="error-wrp">
                  <img
                    className="error-icon"
                    src={errorIcon}
                    alt="error icon"
                  />
                  <p className="error">{errors.address}</p>
                </div>
              )}
            </div>

            <div className="input-wrp">
              <label className="form-label" htmlFor="city">
                City
              </label>
              <input
                className={`form-input form-input--add ${
                  errors.city ? "input-error" : ""
                }`}
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
              {errors.city && (
                <div className="error-wrp">
                  <img
                    className="error-icon"
                    src={errorIcon}
                    alt="error icon"
                  />
                  <p className="error">{errors.city}</p>
                </div>
              )}
            </div>

            <div className="input-wrp">
              <label className="form-label" htmlFor="country">
                Country
              </label>
              <input
                className={`form-input form-input--add ${
                  errors.country ? "input-error" : ""
                }`}
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
              />
              {errors.country && (
                <div className="error-wrp">
                  <img
                    className="error-icon"
                    src={errorIcon}
                    alt="error icon"
                  />
                  <p className="error">{errors.country}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="form--contact">
          <h2 className="form__title">Contact Details</h2>

          <div className="form-content">
            <div className="input-wrp">
              <label className="form-label" htmlFor="contact_name">
                Contact Name
              </label>
              <input
                className={`form-input form-input--add ${
                  errors.contact_name ? "input-error" : ""
                }`}
                type="text"
                name="contact_name"
                placeholder="Contact Name"
                value={formData.contact_name}
                onChange={handleChange}
              />
              {errors.contact_name && (
                <div className="error-wrp">
                  <img
                    className="error-icon"
                    src={errorIcon}
                    alt="error icon"
                  />
                  <p className="error">{errors.contact_name}</p>
                </div>
              )}
            </div>

            <div className="input-wrp">
              <label className="form-label" htmlFor="contact_position">
                Position
              </label>
              <input
                className={`form-input form-input--add ${
                  errors.contact_position ? "input-error" : ""
                }`}
                name="contact_position"
                placeholder="Position"
                value={formData.contact_position}
                onChange={handleChange}
              />
              {errors.contact_position && (
                <div className="error-wrp">
                  <img
                    className="error-icon"
                    src={errorIcon}
                    alt="error icon"
                  />
                  <p className="error">{errors.contact_position}</p>
                </div>
              )}
            </div>

            <CustomPhoneInput
              value={formData.contact_phone}
              onChange={handleChange}
              errors={errors}
            />

            <div className="input-wrp">
              <label className="form-label" htmlFor="contact_email">
                Email
              </label>
              <input
                className={`form-input form-input--add ${
                  errors.contact_email ? "input-error" : ""
                }`}
                type="text"
                name="contact_email"
                placeholder="Email"
                value={formData.contact_email}
                onChange={handleChange}
              />
              {errors.contact_email && (
                <div className="error-wrp">
                  <img
                    className="error-icon"
                    src={errorIcon}
                    alt="error icon"
                  />
                  <p className="error">{errors.contact_email}</p>
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

export default WarehouseForm;

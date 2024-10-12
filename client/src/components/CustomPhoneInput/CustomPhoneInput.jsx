import { useState, useEffect } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import "./CustomPhoneInput.scss";
import errorIcon from "../../assets/icons/error.svg";

const CustomPhoneInput = ({ value, onChange, errors }) => {
  const [phone, setPhone] = useState(value);

  useEffect(() => {
    setPhone(value);
  }, [value]);

  const handlePhoneChange = (value) => {
    setPhone(value);
    onChange({ target: { name: "contact_phone", value } });
  };

  return (
    <div className="input-wrp">
      <label className="form-label" htmlFor="contact_phone">
        Phone Number
      </label>
      <PhoneInput
        value={phone}
        onChange={handlePhoneChange}
        disableDialCodePrefill={true}
        containerStyle={{ display: "flex", alignItems: "center" }}
        inputStyle={{ paddingLeft: 0 }}
        inputProps={{
          name: "contact_phone",
          className: `form-input form-input--add form-input-phone ${
            errors.contact_phone ? "input-error" : ""
          }`,
          placeholder: "Phone Number",
        }}
      />
      {errors.contact_phone && (
        <div className="error-wrp">
          <img className="error-icon" src={errorIcon} alt="error icon" />
          <p className="error">{errors.contact_phone}</p>
        </div>
      )}
    </div>
  );
};

export default CustomPhoneInput;

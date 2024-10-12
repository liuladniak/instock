import "./RadioButton.scss";

const RadioButton = ({ label, value, name, checked, onChange }) => {
  return (
    <label className="radio-button">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="radio-input"
      />
      <span className="radio-control"></span>
      {label}
    </label>
  );
};

export default RadioButton;

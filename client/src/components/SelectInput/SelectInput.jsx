import { useEffect, useRef, useState } from "react";
import "./SelectInput.scss";
import "../../styles/add-edit-section.scss";
import selectIconActive from "../../assets/icons/down_arrow-blue.svg";
import selectIconDefault from "../../assets/icons/down_arrow-default.svg";

function SelectInput({ options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "Please select");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const selectedOption = options.find((option) => option.id === value);
    if (selectedOption) {
      setSelectedValue(selectedOption.name);
    } else {
      setSelectedValue("Please select");
    }
  }, [value, options]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    setSelectedValue(option.name);
    onChange(option.id);
    setIsOpen(false);
  };

  return (
    <div className="select" ref={dropdownRef}>
      <div
        className={`form-input select--selected ${
          isOpen ? "input-active" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={selectedValue === "Please select" ? "placeholder" : ""}
        >
          {selectedValue}
        </span>

        <img
          className="select__icon"
          src={
            selectedValue !== "Please select"
              ? selectIconActive
              : selectIconDefault
          }
          alt="select icon"
        />
      </div>
      {isOpen && (
        <ul className="select__options">
          {options.map((option) => (
            <li
              key={option.id}
              value={option.id}
              className="select__option"
              onClick={() => handleSelect(option)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SelectInput;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./user.css"; // Import your global styles

const UserPage = () => {
  const configuredFields = useSelector((state) => state.admin.config.fields);
  const [formData, setFormData] = useState({});

  const handleInputChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleSubmit = () => {
    // You can perform any action with the form data here
    console.log("Form Data:", formData);
    // Reset the form data after submission
    setFormData({});
  };

  const renderInput = (field) => {
    switch (field.type) {
      case "textbox":
        return (
          <input
            type="text"
            className="form-control"
            onChange={(e) => handleInputChange(field.config.displayName, e.target.value)}
          />
        );
      case "dropdown":
        return (
          <select
            className="form-control"
            onChange={(e) => handleInputChange(field.config.displayName, e.target.value)}
          >
            {/* Map through field.config.fieldData and render options */}
            {field.config.fieldData &&
              field.config.fieldData.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
          </select>
        );
      case "datepicker":
        return (
          <input
            type="date"
            className="form-control"
            onChange={(e) => handleInputChange(field.config.displayName, e.target.value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h2>User Page</h2>
      <form>
        {configuredFields.map((field, index) => (
          <div key={index} className="form-group">
            <label>{field.config.displayName}</label>
            {renderInput(field)}
          </div>
        ))}
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserPage;

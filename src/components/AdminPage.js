import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../src/App.css";

const AdminPage = () => {
  const [fields, setFields] = useState([]);
  const [currentField, setCurrentField] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const dispatch = useDispatch();
  const savedConfig = useSelector((state) => state.admin.config);

  const startAddField = () => {
    if (fields.length < 4) {
      setCurrentField({ type: "", config: {} });
    } else {
      alert("Maximum number of fields reached (4). You cannot add more.");
    }
  };
  const renderFieldValidation = (field) => {
    switch (field.type) {
      case 'textbox':
        return <span>Max Length: {field.config.maxLength || '-'}</span>;
      case 'dropdown':
        return <span>Nil</span>;
      case 'datepicker':
        return (
          <span>
            between {field.config.minDate || '-'} to {field.config.maxDate || '-'}
          </span>
        );
      default:
        return <span>No validation</span>;
    }
  };

  const handleAddField = () => {
    if (currentField) {
      setFields([...fields, currentField]);
      setCurrentField(null);
    }
  };

  const handleConfirm = () => {
    dispatch({
      type: "SAVE_CONFIG",
      payload: { option: selectedOption, fields },
    });
    setFields([]);
    setSelectedOption("");
  };

  const updateFieldConfig = (key, value) => {
    setCurrentField({
      ...currentField,
      config: {
        ...currentField.config,
        [key]: key === 'fieldData' ? value.split(',').map(item => item.trim()) : value,
      },
    });
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setFields([]);
  };

  const renderFieldTypeConfig = () => {
    if (!currentField) return null;

    switch (currentField.type) {
      case "textbox":
        return renderTextboxConfig();
      case "dropdown":
        return renderDropDownConfig();
      case "datepicker":
        return renderDatepickerConfig();
      default:
        return (
          <div className="select-with-icon">
            <select
              value={currentField.type}
              onChange={(e) =>
                setCurrentField({ ...currentField, type: e.target.value })
              }
              className="wide-select"
            >
              <option value="">Select Field Type</option>
              <option value="textbox">Textbox</option>
              <option value="dropdown">Dropdown</option>
              <option value="datepicker">Datepicker</option>
            </select>
            <i className="fas fa-caret-down"></i>
          </div>
        );
    }
  };

  const renderTextboxConfig = () => {
    // Configuration inputs for textbox
    return (
      <div className="config-row">
        <div className="config-item">
          <label>Field Type</label>
          <select className="btn btn-secondary">
            <option value="textbox">Textbox</option>
            <option value="dropdown">Dropdown</option>
            <option value="datepicker">Datepicker</option>
          </select>
        </div>
        <div className="config-item">
          <label>Field Display Name:</label>
          <input
            type="text"
            className="form-control rounded border-dark"
            placeholder="Field Display Name"
            onChange={(e) => updateFieldConfig("displayName", e.target.value)}
          />
        </div>

        <div className="config-item">
          <label>Field Data Type:</label>
          <select
            className="btn btn-primary"
            onChange={(e) => updateFieldConfig("dataType", e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Select Data Type
            </option>
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
          </select>
        </div>

        <div className="config-item">
          <label>Max Length:</label>
          <input
            type="number"
            placeholder="Max Length (up to 10)"
            className="form-control rounded border-dark"
            max="10"
            onChange={(e) => updateFieldConfig("maxLength", e.target.value)}
          />
        </div>

        <div className="config-item">
          <label>Mandatory:</label>
          <select
            className="btn btn-primary"
            onChange={(e) => updateFieldConfig("mandatory", e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Mandatory
            </option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="config-item">
          <label>Field Data: </label>
          <input
            type="text"
            className="form-control rounded border-dark"
            onChange={(e) => updateFieldConfig("fieldData", e.target.value)} // Assuming 'fieldData' is the correct property
          />
        </div>
        <div className="config-item">
          <br />
          <button
            onClick={handleAddField}
            className="btn btn-outline-secondary"
          >
            Confirm
          </button>
        </div>
      </div>
    );
  };

  const renderDropDownConfig = () => {
    // Configuration inputs for dropdown
    return (
      <div className="config-row">
        <div className="config-item">
          <label>Field Type</label>
          <select className="btn btn-secondary">
            <option value="dropdown">Dropdown</option>
            <option value="datepicker">Datepicker</option>
            <option value="textbox">Textbox</option>
          </select>
        </div>
        <div className="config-item">
          <label>Field Display Name:</label>
          <input
            type="text"
            className="form-control rounded border-dark"
            placeholder="Department"
            onChange={(e) => updateFieldConfig("displayName", e.target.value)}
          />
        </div>

        <div className="config-item">
          <label>Field Data Type:</label>
          <select
            className="btn btn-primary"
            onChange={(e) => updateFieldConfig("dataType", e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Select Data Type
            </option>
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
          </select>
        </div>
        <div className="config-item">
          <label>Mandatory:</label>
          <select
            className="btn btn-primary"
            onChange={(e) => updateFieldConfig("mandatory", e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Mandatory
            </option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="config-item">
        <label>Field Data:</label>
        <input
          type="text"
          className="form-control rounded border-dark"
          placeholder="Separate multiple values with commas"
          onChange={(e) => updateFieldConfig("fieldData", e.target.value)}
        />
      </div>
        <div className="config-item">
          <br />
          <button
            onClick={handleAddField}
            className="btn btn-outline-secondary"
          >
            Confirm
          </button>
        </div>
      </div>
    );
  };

  const renderDatepickerConfig = () => {
    // Configuration inputs for datepicker
    return (
      <div className="config-row">
        <div className="config-item">
          <label>Field Type</label>
          <select className="btn btn-secondary">
            <option value="datepicker">Datepicker</option>
            <option value="textbox">Textbox</option>
            <option value="dropdown">Dropdown</option>
          </select>
        </div>
        <div className="config-item">
          <label>Field Display Name:</label>
          <input
            type="text"
            className="form-control rounded border-dark"
            placeholder="Date of Birth"
            onChange={(e) => updateFieldConfig("displayName", e.target.value)}
          />
        </div>

        <div className="config-item">
          <label>Field Data Type:</label>
          <select
            className="btn btn-primary"
            onChange={(e) => updateFieldConfig("dataType", e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Select Data Type
            </option>
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
          </select>
        </div>

        <div className="config-item">
          <label>Date Range Validation:</label>
          <div className="d-flex">
            <div className="config-item me-2">
              <label>Min Date:</label>
              <input
                type="date"
                className="form-control rounded border-dark small-datepicker"
                onChange={(e) => updateFieldConfig("minDate", e.target.value)}
              />
            </div>
            <div className="config-item ms-2">
              <label>Max Date:</label>
              <input
                type="date"
                className="form-control rounded border-dark small-datepicker"
                onChange={(e) => updateFieldConfig("maxDate", e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="config-item">
          <label>Mandatory:</label>
          <select
            className="btn btn-primary"
            onChange={(e) => updateFieldConfig("mandatory", e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Mandatory
            </option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="config-item">
          <label>Field Data: </label>
          <input
            type="text"
            className="form-control rounded border-dark"
            onChange={(e) => updateFieldConfig("fieldData", e.target.value)} // Assuming 'fieldData' is the correct property
          />
        </div>
        <div className="config-item">
          <br />
          <button
            onClick={handleAddField}
            className="btn btn-outline-secondary"
          >
            Confirm
          </button>
        </div>
      </div>
    );
  };

  const renderConfiguredFieldsTable = () => {
    if (fields.length === 0) return null;
  
    return (
        <table className="table table-bordered">
          <thead>
            <tr>List of Added Fileds</tr>
            <tr>
              <th>No.</th>
              <th>Field Name</th>
              <th>Field Type</th>
              <th>Field Data Type</th>
              <th>Field Validations</th>
              <th>Field Data</th>
              <th>Is Mandatory</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{field.config.displayName || 'N/A'}</td>
                <td>{field.type}</td>
                <td>{field.config.dataType || 'N/A'}</td>
                <td>
                  {renderFieldValidation(field)}
                </td>
                <td>{field.config.fieldData || '-'}</td>
                <td>{field.config.mandatory ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
      );          
  };
 
  return (
    <div>
      <div className="centered-dropdown">
        <div className="dropdown">
          <select
            className="btn btn-secondary dropdown-toggle"
            value={selectedOption}
            onChange={(e) => handleOptionSelect(e.target.value)}
          >
            <option value="">👤Select Option</option>
            <option value="Student">👤 Student</option>
            <option value="Salaried">👤 Salaried</option>
            <option value="Business">👤 Business</option>
          </select>
        </div>
      </div>
      <div>
        {selectedOption && (
          <button onClick={startAddField} className="btn btn-outline-secondary">
            Add Field
          </button>
        )}
      </div>
      <br />
      {renderFieldTypeConfig()}

      <div>
        {fields.map((field, index) => (
          <div key={index}>
            Type: {field.type}, Config: {JSON.stringify(field.config)}
          </div>
        ))}
      </div>

      {fields.length > 0 && (
        <>
          <h3>Configured Fields:</h3>
          {renderConfiguredFieldsTable()}
          <button onClick={handleConfirm}>Confirm All</button>
          <button onClick={() => setFields([])}>Reset</button>
        </>
      )}


{savedConfig && (
  <div className="admin-saved-configuration">
    <h3>Saved Configuration:</h3>
    <table>
      <thead>
        <tr>
          <th>Option</th>
          <th>No.</th>
          <th>Field Name</th>
          <th>Field Type</th>
          <th>Field Data Type</th>
          <th>Field Validations</th>
          <th>Field Data</th>
          <th>Is Mandatory</th>
        </tr>
      </thead>
      <tbody>
        {savedConfig.fields.map((field, index) => (
          <tr key={index}>
            <td>{savedConfig.option}</td>
            <td>{index + 1}</td>
            <td>{field.config.displayName || 'N/A'}</td>
            <td>{field.type}</td>
            <td>{field.config.dataType || 'N/A'}</td>
            <td>{renderFieldValidation(field)}</td>
            <td>
              {field.type === 'dropdown' && typeof field.config.fieldData === 'string'
                ? field.config.fieldData.split(',').map((item, i) => (
                    <div key={i}>{item.trim()}</div>
                  ))
                : field.config.fieldData || '-'}
            </td>
            <td>{field.config.mandatory ? 'Yes' : 'No'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

    </div>
  );
};

export default AdminPage;
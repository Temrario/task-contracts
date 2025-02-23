import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/modal.scss";
import CalendarIcon from "../icon/calendar.svg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: {
    name?: string;
    number: string;
    company: string;
    dateCreated: Date;
    startDate: Date;
    expiryDate: Date;
  }) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    company: "",
    dateCreated: new Date(),
    startDate: new Date(),
    expiryDate: new Date(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date, field: string) => {
    setFormData((prev) => ({ ...prev, [field]: date }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  const CustomInput = ({ value, onClick }: any) => (
    <div className="datepicker-input-wrapper">
      <input
        type="text"
        value={value}
        onClick={onClick}
        readOnly
        placeholder="Select date"
        className="date-input"
      />
      <img src={CalendarIcon} alt="calendar" className="calendar-icon" />
    </div>
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="contract-modal" onClick={(e) => e.stopPropagation()}>
        <h2>New Contract</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Contract Name (optional)</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="New Contract"
              />
            </div>
            <div className="form-group">
              <label>Contract Number</label>
              <input
                name="number"
                value={formData.number}
                onChange={handleChange}
                placeholder="C20220420-000001"
              />
            </div>
          </div>


          <div className="form-group full-width">
            <label>Company</label>
            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Shell"
            />
          </div>

          <div className="form-row three-col">
            <div className="form-group">
              <label>Date Created</label>
              <DatePicker
                selected={formData.dateCreated}
                onChange={(date) => handleDateChange(date!, "dateCreated")}
                dateFormat="dd-MMM-yyyy"
                customInput={<CustomInput />}
              />
            </div>
            <div className="form-group">
              <label>Start Date</label>
              <DatePicker
                selected={formData.startDate}
                onChange={(date) => handleDateChange(date!, "startDate")}
                dateFormat="dd-MMM-yyyy"
                customInput={<CustomInput />}
              />
            </div>
            <div className="form-group">
              <label>Expiry Date</label>
              <DatePicker
                selected={formData.expiryDate}
                onChange={(date) => handleDateChange(date!, "expiryDate")}
                dateFormat="dd-MMM-yyyy"
                customInput={<CustomInput />}
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="create-btn">
              Create Contract
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
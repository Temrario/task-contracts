import React, { useState } from 'react';
import Modal from './modal';
import '../styles/button.scss';

interface Props {
  onCreateContract: (data: {
    name?: string;
    number: string;
    company: string;
    dateCreated: Date;
    startDate: Date;
    expiryDate: Date;
  }) => void;  
}

const AddContractButton: React.FC<Props> = ({ onCreateContract }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (data: {
    name?: string;
    number: string;
    company: string;
    dateCreated: Date;
    startDate: Date;
    expiryDate: Date;
  }) => {
    onCreateContract(data);
    setIsModalOpen(false);
  };

  return (
    <>
      <button 
        className="add-contract-button"
        onClick={() => setIsModalOpen(true)} 
      >
        + Add Contract
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default AddContractButton;

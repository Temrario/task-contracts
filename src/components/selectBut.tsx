import React from 'react';
import '../styles/selectBut.scss';
import SelectIcon from '../icon/selected.svg';

interface SelectButProps {
  selectedCount: number;
}

const SelectBut: React.FC<SelectButProps> = ({ selectedCount }) => {
  return (
    <div className="select-button-container">
      <img src={SelectIcon} alt="select" className="select-Icon" />
      <span className="selected-count">
        {selectedCount} Selected
      </span>
    </div>
  );
};

export default SelectBut;


import React from 'react';
import '../styles/actionbutton.scss';

interface ActionMenuProps {
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

const ActionMenu: React.FC<ActionMenuProps> = ({ onDelete, onClose }) => {
  return (
    <div className="action-menu">
      <button className='dropdown-item delete' onClick={onDelete}>Delete</button>
      <button className='dropdown-item clear' onClick={onClose}>Close</button>
    </div>
  );
};

export default ActionMenu;

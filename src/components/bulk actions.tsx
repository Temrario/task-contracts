import React, { useState, useRef, useEffect } from 'react';
import '../styles/bulkaction.scss';

interface BulkActionsProps {
  onDelete: () => void;
  onClear: () => void;
}

const BulkActions: React.FC<BulkActionsProps> = ({ onDelete, onClear }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bulk-actions-container" ref={dropdownRef}>
      <button 
        className="bulk-actions-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        Bulk Actions
      </button>
      
      {isOpen && (
        <div className="dropdown-menu">
          <button className="dropdown-item delete" onClick={onDelete}>
            Delete Selected
          </button>
          <button className="dropdown-item clear" onClick={onClear}>
            Clear Selection
          </button>
        </div>
      )}
    </div>
  );
};

export default BulkActions;
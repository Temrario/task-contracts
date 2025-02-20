import React, { useState } from 'react';
import { Contract } from '../types';
import '../styles/table.scss';
import ActionMenu from './actionmenu';

interface TableProps {
  contracts: Contract[];
  selectedContracts: string[];
  onSelectContract: (id: string) => void;
  onDeleteContract: (id: string) => void;
}

const Table: React.FC<TableProps> = ({ contracts, selectedContracts, onSelectContract, onDeleteContract }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const totalPages = Math.ceil(contracts.length / rowsPerPage);
  const allSelected = contracts.length > 0 && selectedContracts.length === contracts.length;

  const handleSelectAll = () => {
    if (allSelected) {
      contracts.forEach((contract) => onSelectContract(contract.id));
    } else {
      contracts.forEach((contract) => {
        if (!selectedContracts.includes(contract.id)) onSelectContract(contract.id);
      });
    }
  };

  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); 
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedContracts = contracts.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="table-container">
      <table className="contract-table">
        <thead>
          <tr>
            <th>
              <input 
                type="checkbox" 
                checked={allSelected} 
                onChange={handleSelectAll} 
              />
            </th>
            <th>Contract Name</th>
            <th>Contract Number</th>
            <th>Company</th>
            <th>Contract Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {paginatedContracts.map((contract) => (
            <tr key={contract.id}>
              <td>
                <input 
                  type="checkbox" 
                  checked={selectedContracts.includes(contract.id)}
                  onChange={() => onSelectContract(contract.id)}
                />
              </td>
              <td>{contract.name}</td>
              <td>{contract.number}</td>
              <td>{contract.company}</td>
              <td>{contract.type}</td>
              <td>{contract.startDate}</td>
              <td>{contract.endDate}</td>
              <td>
                <span className={`status ${contract.status.toLowerCase()}`}>
                  {contract.status}
                </span>
              </td>
              <td className="action-cell">
                <button 
                  className="action-button" 
                  onClick={() => setActiveMenu(activeMenu === contract.id ? null : contract.id)}
                >
                  ⋮
                </button>
                {activeMenu === contract.id && (
                  <ActionMenu 
                    onEdit={() => console.log(`Editing ${contract.id}`)} 
                    onDelete={() => { 
                      onDeleteContract(contract.id);
                      setActiveMenu(null);
                    }} 
                    onClose={() => setActiveMenu(null)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Пагінація */}
      <div className="pagination">
        <button className="prev-page" onClick={handlePrevPage} disabled={currentPage === 1}>
          {'<'}
        </button>
        <span className="page-number">{currentPage} / {totalPages}</span>
        <button className="next-page" onClick={handleNextPage} disabled={currentPage === totalPages}>
          {'>'}
        </button>
        <select className="rows-per-page" value={rowsPerPage} onChange={handleChangeRowsPerPage}>
          <option value="5">5 / page</option>
          <option value="10">10 / page</option>
          <option value="20">20 / page</option>
        </select>
      </div>
    </div>
  );
};

export default Table;

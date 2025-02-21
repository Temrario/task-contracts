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
  const [sortColumn, setSortColumn] = useState<keyof Contract | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

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

  const handleSort = (column: keyof Contract) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedContracts = [...contracts].sort((a, b) => {
    if (!sortColumn) return 0;

    const valueA = a[sortColumn];
    const valueB = b[sortColumn];

    if (sortColumn === 'name' || sortColumn === 'company' || sortColumn === 'type') {
      return sortDirection === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    if (sortColumn === 'number') {
      const numA = parseInt(valueA, 10);
      const numB = parseInt(valueB, 10);
      if (!isNaN(numA) && !isNaN(numB)) {
        return sortDirection === 'asc' ? numA - numB : numB - numA;
      }
      return sortDirection === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    if (sortColumn === 'startDate' || sortColumn === 'endDate') {
      const dateA = new Date(valueA).getTime();
      const dateB = new Date(valueB).getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    }

    if (sortColumn === 'status') {
      return sortDirection === 'asc'
        ? valueA === 'Active' ? -1 : 1
        : valueA === 'Active' ? 1 : -1;
    }

    return 0;
  });

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
  const paginatedContracts = sortedContracts.slice(startIndex, startIndex + rowsPerPage);

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
            <th onClick={() => handleSort('name')}>
              Contract Name
              <button>{sortColumn === 'name' ? (sortDirection === 'asc' ? '▲' : '▼') : '⇅'}</button>
            </th>
            <th onClick={() => handleSort('number')}>
              Contract Number
              <button>{sortColumn === 'number' ? (sortDirection === 'asc' ? '▲' : '▼') : '⇅'}</button>
            </th>
            <th onClick={() => handleSort('company')}>
              Company
              <button>{sortColumn === 'company' ? (sortDirection === 'asc' ? '▲' : '▼') : '⇅'}</button>
            </th>
            <th onClick={() => handleSort('type')}>
              Contract Type
              <button>{sortColumn === 'type' ? (sortDirection === 'asc' ? '▲' : '▼') : '⇅'}</button>
            </th>
            <th onClick={() => handleSort('startDate')}>
              Start Date
              <button>{sortColumn === 'startDate' ? (sortDirection === 'asc' ? '▲' : '▼') : '⇅'}</button>
            </th>
            <th onClick={() => handleSort('endDate')}>
              End Date
              <button>{sortColumn === 'endDate' ? (sortDirection === 'asc' ? '▲' : '▼') : '⇅'}</button>
            </th>
            <th onClick={() => handleSort('status')}>
              Status
              <button>{sortColumn === 'status' ? (sortDirection === 'asc' ? '▲' : '▼') : '⇅'}</button>
            </th>
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

      <div className="pagination">
        <button className="prev-page" onClick={handlePrevPage} disabled={currentPage === 1}>
          {'<'}
        </button>
        <span className="current-page">{currentPage}</span>
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

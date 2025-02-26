import React, { useState, useEffect } from 'react';
import { Contract } from '../types';
import '../styles/table.scss';
import ActionMenu from './actionmenu';
import Icon from "../icon/IconPlaceholder.svg";

export interface TableProps {
  contracts: Contract[];
  selectedContracts: string[];
  onSelectContract: (id: string) => void;
  onDeleteContract: (id: string) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
  rowsPerPage: number;
  currentPage: number;
  onPaginatedDataChange?: (paginatedData: Contract[]) => void;
  onPageChange?: (newPage: number) => void; 
}

const Table: React.FC<TableProps> = ({
  contracts,
  selectedContracts,
  onSelectContract,
  onDeleteContract,
  onRowsPerPageChange,
  rowsPerPage: parentRowsPerPage,
  currentPage: parentCurrentPage,
  onPaginatedDataChange,
  onPageChange,
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(parentCurrentPage);
  const [rowsPerPage, setRowsPerPage] = useState(parentRowsPerPage);
  const [sortColumn, setSortColumn] = useState<keyof Contract | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [paginatedContracts, setPaginatedContracts] = useState<Contract[]>([]);

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

  useEffect(() => {
    const sortedContracts = [...contracts].sort((a, b) => {
      if (!sortColumn) return 0;
  
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];
  
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortDirection === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }
  
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
      }
  
      if (valueA instanceof Date && valueB instanceof Date) {
        return sortDirection === 'asc' ? valueA.getTime() - valueB.getTime() : valueB.getTime() - valueA.getTime();
      }
  
      return 0;
    });
  
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginated = sortedContracts.slice(startIndex, startIndex + rowsPerPage);
  
    setPaginatedContracts((prev) => {
      if (JSON.stringify(prev) !== JSON.stringify(paginated)) {
        return paginated;
      }
      return prev;
    });
  
    onPaginatedDataChange?.(paginated);
  }, [contracts, currentPage, rowsPerPage, sortColumn, sortDirection]);
  

  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRowsPerPage = Number(e.target.value);
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
    onRowsPerPageChange(newRowsPerPage);
    if (onPageChange) onPageChange(1); 
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => {
      const newPage = Math.max(prev - 1, 1);
      if (onPageChange) onPageChange(newPage);
      return newPage;
    });
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => {
      const newPage = Math.min(prev + 1, totalPages);
      if (onPageChange) onPageChange(newPage);
      return newPage;
    });
  };

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
              <button>
                <img src={Icon} className={sortColumn === 'name' ? (sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''} alt="sort" />
              </button>
            </th>
            <th onClick={() => handleSort('number')}>
              Contract Number
              <button>
                <img src={Icon} className={sortColumn === 'number' ? (sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''} alt="sort" />
              </button>
            </th>
            <th onClick={() => handleSort('company')}>
              Company
              <button>
                <img src={Icon} className={sortColumn === 'company' ? (sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''} alt="sort" />
              </button>
            </th>
            <th onClick={() => handleSort('type')}>
              Contract Type
              <button>
                <img src={Icon} className={sortColumn === 'type' ? (sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''} alt="sort" />
              </button>
            </th>
            <th onClick={() => handleSort('startDate')}>
              Start Date
              <button>
                <img src={Icon} className={sortColumn === 'startDate' ? (sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''} alt="sort" />
              </button>
            </th>
            <th onClick={() => handleSort('endDate')}>
              End Date
              <button>
                <img src={Icon} className={sortColumn === 'endDate' ? (sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''} alt="sort" />
              </button>
            </th>
            <th onClick={() => handleSort('status')}>
              Status
              <button>
                <img src={Icon} className={sortColumn === 'status' ? (sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''} alt="sort" />
              </button>
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
              <td>{contract.startDate instanceof Date ? contract.startDate.toLocaleDateString() : contract.startDate}</td>
              <td>{contract.endDate instanceof Date ? contract.endDate.toLocaleDateString() : contract.endDate}</td>
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
import React from 'react';
import { Contract } from '../types';
import '../styles/table.scss';

interface TableProps {
  contracts: Contract[];
}

const Table: React.FC<TableProps> = ({ contracts }) => {
  return (
    <div className="table-container">
      <table className="contract-table">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Contract Name</th>
            <th>Contract Number</th>
            <th>Company</th>
            <th>Contract Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th></th>            {/* випадна кнопка */}
          </tr>
        </thead>
        <tbody>
          {contracts.map((contract) => (
            <tr key={contract.id}>
              <td><input type="checkbox" /></td>
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
              <td>
                <button className="action-button">⋮</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>



      {/* спроба типу пагінації */}
      <div className="pagination">
        <button className="prev-page">{'<'}</button>
        <span className="current-page">1</span>
        <button className="next-page">{'>'}</button>
        <select className="rows-per-page">
          <option value="10">10 / page</option>
          <option value="20">20 / page</option>
          <option value="50">50 / page</option>
        </select>
      </div>
    </div>
  );
};

export default Table;

import React from 'react';
import '../styles/button.scss';
import Icon from "../icon/Group.svg";

interface DownloadCSVButtonProps {
  data: any[];  
  rowsPerPage: number;
  currentPage: number;
}

const DownloadCSVButton: React.FC<DownloadCSVButtonProps> = ({ data, rowsPerPage, currentPage }) => {
  const generateCSV = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = data.slice(startIndex, startIndex + rowsPerPage);

    const headers = Object.keys(paginatedData[0]);
    const rows = paginatedData.map((item) => headers.map((header) => item[header]));

    let csvContent = "data:text/csv;charset=utf-8," + [headers.join(",")].concat(rows.map(row => row.join(","))).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "contracts.csv");
    link.click();
  };

  return (
    <button className="download-csv-button" onClick={generateCSV}>
      <div className="button-content">
        <img src={Icon} alt="download icon" className="csv-icon" />
        Download as CSV
      </div>
    </button>
  );
};

export default DownloadCSVButton;
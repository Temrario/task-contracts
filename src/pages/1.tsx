import React from 'react';
import Header from '../components/header';
import SearchBar from '../components/searchbar';
import Buttons from '../components/buttons';

const Page1: React.FC = () => {
    return (
        <div className="contracts-page">
          <Header />
          <div className="actions-container">
            <div className="top-actions">
              <SearchBar />
              <div className="right-actions">
                <button className="add-contract-button">+ Add Contract</button>
                <button className="download-csv-button">Download as CSV</button>
              </div>
            </div>
            <div className="bottom-actions">
              <span className="selected-count">0 Selected</span>
              <Buttons /> {/* Тут лише Bulk Actions */}
            </div>
          </div>
          {/* Тут буде таблиця */}
        </div>
      );
    }

export default Page1;
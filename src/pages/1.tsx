import React from 'react';
import Header from '../components/header';
import SearchBar from '../components/searchbar';
import Buttons from '../components/bulk actions';
import Table from '../components/table';
import AddContractButton from '../components/addcontractBut';
import DownloadCSVButton from '../components/csvBut';
import { contractsData } from '../data';


const Page1: React.FC = () => {
  return (
    <div className="contracts-page">
      <Header />
      <div className="actions-container">
        <div className="top-actions">
          <SearchBar />
          <div className="right-actions">
            <AddContractButton />
            <DownloadCSVButton />
          </div>
        </div>
        <div className="bottom-actions">
          <span className="selected-count">0 Selected</span>
          <Buttons />
        </div>
      </div>
      <Table contracts={contractsData} />
    </div>
  );
};

export default Page1;

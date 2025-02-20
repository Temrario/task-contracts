import React, { useState } from 'react';
import Header from '../components/header';
import SearchBar from '../components/searchbar';
import BulkActions from '../components/bulk actions'; 
import Table from '../components/table';
import AddContractButton from '../components/addcontractBut';
import DownloadCSVButton from '../components/csvBut';
import SelectedCount from '../components/selectBut';
import { contractsData } from '../data';
import { Contract } from '../types';

const Page1: React.FC = () => {
  const [contracts, setContracts] = useState<Contract[]>(contractsData);
  const [selectedContracts, setSelectedContracts] = useState<string[]>([]);

  const handleSelectContract = (id: string) => {
    setSelectedContracts(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    setContracts(prev => prev.filter(c => !selectedContracts.includes(c.id)));
    setSelectedContracts([]);
  };

  const handleClearSelection = () => {
    setSelectedContracts([]);
  };

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
          <SelectedCount 
            selectedCount={selectedContracts.length} 
          />
          <BulkActions 
            onDelete={handleBulkDelete} 
            onClear={handleClearSelection} 
          />
        </div>
      </div>
      <Table 
        contracts={contracts} 
        onSelectContract={handleSelectContract} 
        selectedContracts={selectedContracts} 
      />
    </div>
  );
};

export default Page1;
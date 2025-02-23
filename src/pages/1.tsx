import React, { useState } from 'react';
import Header from '../components/header';
import SearchBar from '../components/searchbar';
import BulkActions from '../components/bulk actions'; 
import Table from '../components/table';
import AddContractButton from '../components/addcontractBut';
import DownloadCSVButton from '../components/csvBut';
import SelectedCount from '../components/selectBut';
import Modal from '../components/modal'; 
import { contractsData } from '../data';
import { Contract } from '../types';
import { v4 as uuidv4 } from 'uuid';

const Page1: React.FC = () => {
  const [contracts, setContracts] = useState<Contract[]>(contractsData);
  const [selectedContracts, setSelectedContracts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage,] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5); 

  const handleCreateContract = (formData: {
    name?: string;
    number: string;
    company: string;
    dateCreated: Date;
    startDate: Date;
    expiryDate: Date;
    type?: string;
  }) => {
    const newContract: Contract = {
      id: uuidv4(),
      name: formData.name || 'New Contract', 
      number: formData.number,
      company: formData.company,
      dateCreated: formData.dateCreated, 
      startDate: formData.startDate, 
      endDate: formData.expiryDate, 
      status: 'Active', 
    };
    
    setContracts(prev => [...prev, newContract]);
    setIsModalOpen(false); 
  };

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

  const handleDeleteContract = (id: string) => {
    setContracts((prevContracts) => prevContracts.filter((contract) => contract.id !== id));
  };

  const filteredContracts = contracts.filter(contract => 
    contract.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contract.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contract.number.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
  };

  return (
    <div className="contracts-page">
      <Header />
      <div className="actions-container">
        <div className="top-actions">
          <SearchBar onSearch={setSearchQuery} />
          <div className="right-actions">
            <AddContractButton onCreateContract={handleCreateContract} /> 
            <DownloadCSVButton 
              data={contracts} 
              rowsPerPage={rowsPerPage} 
              currentPage={currentPage} 
            />
          </div>
        </div>
        <div className="bottom-actions">
          <SelectedCount selectedCount={selectedContracts.length} />
          <BulkActions 
            onDelete={handleBulkDelete} 
            onClear={handleClearSelection} 
            isDisabled={selectedContracts.length === 0} 
          />
        </div>
      </div>
      <Table 
        contracts={filteredContracts} 
        onSelectContract={handleSelectContract} 
        selectedContracts={selectedContracts}
        onDeleteContract={handleDeleteContract} 
        onRowsPerPageChange={handleRowsPerPageChange} 
        rowsPerPage={rowsPerPage} 
        currentPage={currentPage} 
      />
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleCreateContract} 
      />
    </div>
  );
};

export default Page1;

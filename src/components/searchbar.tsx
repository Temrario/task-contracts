import React, { useState } from 'react';
import searchIcon from '../icon/search.svg'; 

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Searching for:', searchQuery);
// вилл би
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <img src={searchIcon} alt="Search" className="search-icon" /> 
      <input
        type="text"
        placeholder="Search Contracts"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
    </form>
  );
};

export default SearchBar;
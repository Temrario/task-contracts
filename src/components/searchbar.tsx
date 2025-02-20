import React, { useState, useEffect } from 'react';
import searchIcon from '../icon/search.svg';
import '../styles/searchbar.scss';

interface SearchBarProps {
  onSearch: (query: string) => void; 
}

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300); 

  useEffect(() => {
    onSearch(debouncedSearchQuery); 
  }, [debouncedSearchQuery, onSearch]);

  return (
    <div className="search-bar">
      <img src={searchIcon} alt="Search" className="search-icon" />
      <input
        type="text"
        placeholder="Search Contracts"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;

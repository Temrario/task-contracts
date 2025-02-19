import React, { useState, useEffect } from 'react';
import searchIcon from '../icon/search.svg';
import '../styles/searchbar.scss';

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

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (debouncedSearchQuery) {
      console.log('Searching for:', debouncedSearchQuery);   // виккли(доробити)
    }
  }, [debouncedSearchQuery]);

  return (
    <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
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

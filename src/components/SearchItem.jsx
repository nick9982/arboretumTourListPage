// SearchItem.jsx
import React from 'react';
import styles from './SearchItem.module.css';

const SearchItem = ({ onSearch }) => {
  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search for a tour..."
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchItem;

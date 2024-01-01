import React from 'react';
import './SearchBar.css'; // Import the CSS file for styling

const SearchBar = ({ searchQuery, handleSearchChange }) => {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search by title or description..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;

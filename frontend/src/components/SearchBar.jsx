// src/components/SearchBar.jsx
import React from 'react';

export default function SearchBar({ searchTerm, setSearchTerm, onSearch }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(e); // pass the event along
      }}
      style={{ width: '100%' }}
    >
      <input
        type="text"
        className="search-input"
        placeholder="Search units, degrees, or universities..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '100%', padding: '0.5rem' }}
      />
    </form>
  );
}

import React from 'react';

const Filter = ({ filterType, onFilterChange }) => {
  return (
    <div className="filter">
      <label>
        <input
          type="radio"
          value="all"
          checked={filterType === 'all'}
          onChange={() => onFilterChange('all')}
        />
        All
      </label>
      <label>
        <input
          type="radio"
          value="Movie"
          checked={filterType === 'Movie'}
          onChange={() => onFilterChange('Movie')}
        />
        Movie
      </label>
      <label>
        <input
          type="radio"
          value="TV Show"
          checked={filterType === 'TV Show'}
          onChange={() => onFilterChange('TV Show')}
        />
        TV Show
      </label>
    </div>
  );
};

export default Filter;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import SearchBar from './Common/SearchBar';
import Filter from './Common/Filter';
import Pagination from './Common/Pagination';
import { Link } from 'react-router-dom';
import { Button, TextField, Container, Typography, Grid } from '@mui/material';
import './ShowList.css';

const ShowList = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const userAge = parseInt(localStorage.getItem('age'));

  const history = useNavigate();

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await api.get('/shows', {
          params: {
            page: currentPage,
            limit: 15,
            search: searchTerm,
            filterType: filterType,
          },
        });
  
        
        const filteredMovies = userAge < 18 && (filterType === 'all' || filterType === 'Movie' || filterType === 'TV Show' )
          ? response.data.shows.filter(movie => movie.rating !== 'R')
          : response.data.shows;
  
        setMovies(filteredMovies);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching shows:', error);
      }
    };
  
    fetchShows();
  }, [currentPage, searchTerm, filterType, userAge]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
    setCurrentPage(1);
  };
  const handleLogout = () => {
    localStorage.removeItem('age');

    history('/');
  };
  
  const filteredMovies = movies.filter((movie) => {
    if (filterType === 'all') {
      return true; 
    } else {
      return movie.type === filterType; 
    }
  });
  return (
    <div className="show-list-container">
      <button onClick={handleLogout} className="logout-button">Logout</button>
      <h2 className="show-list-title">Show List</h2>
      <SearchBar onSearch={handleSearch} />
      <Filter filterType={filterType} onFilterChange={handleFilterChange} />

      <ul className="show-list">
        {filteredMovies.map((movie) => (
          <li key={movie.show_id}>
            <Link to={`/shows/${movie._id}`} className="movie-link">
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ShowList;

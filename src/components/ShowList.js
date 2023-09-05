import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import SearchBar from './Common/SearchBar';
import Filter from './Common/Filter';
import Pagination from './Common/Pagination';
import { Link } from 'react-router-dom';
import { Button, TextField, Container, Typography, Grid, MenuItem} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import SearchIcon from '@mui/icons-material/Search';
import './ShowList.css';
import FletNix from '../FletNix-Movies-9-5-2023.png'
import Logo from '../FletNix-9-5-2023.png'
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

  const calculateMovieNumber = (page, index) => {
    return (page - 1) * 15 + index + 1;
  };
  
  const filteredMovies = movies.filter((movie) => {
    if (filterType === 'all') {
      return true; 
    } else {
      return movie.type === filterType; 
    }
  });
  return (
    <div className="show-list-container" >
      
      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
        className="logout-button"
      >
        Logout
      </Button>
      <img src={Logo} alt="FletNix Logo" className="logo" />
      <h2 className="show-list-title">LIST OF GREAT MOVIES AND SHOWS</h2>
      <div className="search-container">
  <TextField
    label="Search"
    variant="outlined"
    fullWidth
    value={searchTerm}
    onChange={(e) => handleSearch(e.target.value)}
    InputProps={{
      endAdornment: <SearchIcon />,
    }}
    className="search-bar"
  />
  <TextField
    select
    label="Filter"
    variant="outlined"
    value={filterType}
    style={{marginLeft: '8rem'}}
    onChange={(e) => handleFilterChange(e.target.value)}
    className="filter-dropdown"
  >
    <MenuItem value="all">All</MenuItem>
    <MenuItem value="Movie">Movie</MenuItem>
    <MenuItem value="TV Show">TV Show</MenuItem>
  </TextField>
</div>

      <ul className="show-list">
        {filteredMovies.map((movie, index) => (
          <li key={movie.show_id} className="movie-item">
            <div className="movie-image">
              <img src={FletNix} alt={movie.title} />
            </div>
            <div className="movie-details">
              <span className="movie-number">
                {calculateMovieNumber(currentPage, index)}.
              </span>
              <Link to={`/shows/${movie._id}`} className="movie-link">
                {movie.title}
              </Link>
              
              <div className="movie-rating">
                <StarIcon fontSize="small" color="primary" /> {movie.rating}
              </div>
            </div>
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

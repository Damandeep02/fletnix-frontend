import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import './ShowDetails.css'; 

const ShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await api.get(`/shows/${id}`);
        setShow(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchShowDetails();
  }, [id]);

  if (!show) {
    return <div className="loading">Loading...</div>; 
  }

  return (
    <div className="show-details">
      <h2>Show Details</h2>
      <div className="show-info">
        <h3>{show.title}</h3>
        <p>{show.description}</p>
        <ul>
          <li>Type: {show.type}</li>
          <li>Director: {show.director}</li>
          <li>Cast: {show.cast}</li>
          <li>Country: {show.country}</li>
          <li>Date Added: {show.date_add}</li>
          <li>Release Year: {show.release_year}</li>
          <li>Rating: {show.rating}</li>
          <li>Duration: {show.duration}</li>
          <li>Listed In: {show.listed_in}</li>
        </ul>
      </div>
      <Link to="/shows" className="button login-button3">
        Back
      </Link>
    </div>
  );
};

export default ShowDetails;

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import './ShowDetails.css';
import backgroundVideo from '../../bg_video.mp4'; 

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
      <video autoPlay muted loop className="background-video">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="content-overlay">
        <h2 className="show-title">{show.title}</h2>
        <div className="show-info">
          <p className="show-description">{show.description}</p>
          <ul className="show-details-list">
            <li>
              <strong>Type:</strong> {show.type}
            </li>
            <li>
              <strong>Director:</strong> {show.director}
            </li>
            <li>
              <strong>Cast:</strong> {show.cast}
            </li>
            <li>
              <strong>Country:</strong> {show.country}
            </li>
            <li>
              <strong>Date Added:</strong> {show.date_add}
            </li>
            <li>
              <strong>Release Year:</strong> {show.release_year}
            </li>
            <li>
              <strong>Rating:</strong> {show.rating}
            </li>
            <li>
              <strong>Duration:</strong> {show.duration}
            </li>
            <li>
              <strong>Listed In:</strong> {show.listed_in}
            </li>
          </ul>
        </div>
        <Link to="/shows" className="button back-button">
          Back
        </Link>
      </div>
    </div>
  );
};

export default ShowDetails;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fletnixImage from '../Fletnix-9-2-2023.png';
import './HomePage.css';
import backgroundVideo from '../bg_video.mp4'; 

function HomePage() {
  const [showGif, setShowGif] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGif(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`home-container ${showGif ? 'black-background' : 'colorful-background'}`}>
      {showGif && (
        <img src={fletnixImage} alt="Your GIF" className="netflix-gif" />
      )}
      {!showGif && (
        <div>
          <video autoPlay loop muted className="background-video">
            <source src={backgroundVideo} type="video/mp4" />
            
          </video>
          <div className="content">
            <h1 className="title white-text">
              WELCOME TO FLETNIX
            </h1>
            <div className="button-container">
              <Link to="/login" className="button login-button">
                Sign In
              </Link>
              <Link to="/register" className="button register-button">
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;



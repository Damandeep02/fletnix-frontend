import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fletnixImage from '../Fletnix-9-2-2023.png';
import './HomePage.css';

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
      <div className="content">
        {showGif && (
          <img src={fletnixImage} alt="Your GIF" className="netflix-gif" />
        )}
        {!showGif && (
          <div>
            <h1 className="title white-text">
              Welcome to Fletnix
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
        )}
      </div>
    </div>
  );
}

export default HomePage;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/api';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('age', response.data.age);
      console.log(response.data.age);
      setAuthenticated(true);

      
      toast.success('Login successful!', {
        position: 'top-right',
        autoClose: 2000, 
        hideProgressBar: true,
      });
    } catch (error) {
      console.error("Authentication error:", error);

      
      toast.error('Login failed. Please check your credentials.', {
        position: 'top-right',
        autoClose: 2000, 
        hideProgressBar: true,
      });
    }
  };

  useEffect(() => {
    if (authenticated) {
      history('/shows');
    }
  }, [authenticated, history]);

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      <p className="register-link">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>

      
      <ToastContainer />
    </div>
  );
};

export default Login;

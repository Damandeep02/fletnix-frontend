import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Homepage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ShowList from './components/ShowList';
import ShowDetails from './components/Details/ShowDetails';

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<HomePage/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/shows" element={<ShowList/>} />
        <Route path="/shows/:id" element={<ShowDetails/>} />
      </Routes>
    </Router>
  );
}

export default App;

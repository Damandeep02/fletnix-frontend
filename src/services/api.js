import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fletnix-un0t.onrender.com', 
});

export default api;

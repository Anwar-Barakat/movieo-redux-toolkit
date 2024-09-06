import axios from 'axios';

// Set config defaults when creating the instance
axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common['Authorization'] = `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`;

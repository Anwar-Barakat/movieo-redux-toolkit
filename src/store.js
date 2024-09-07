import { configureStore } from '@reduxjs/toolkit';
import moviesSlices from './features/movies/moviesSlice';

// Extract individual reducers from the default export of moviesSlices
const { trendingMoviesReducer, nowPlayingMoviesReducer } = moviesSlices;

const store = configureStore({
    reducer: {
        trendingMovies: trendingMoviesReducer,
        nowPlayingMovies: nowPlayingMoviesReducer,
        // Add other reducers here if necessary
    },
});

export default store;

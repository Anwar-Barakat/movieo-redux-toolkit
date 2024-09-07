import { configureStore } from "@reduxjs/toolkit";
import moviesSlices from "./features/movies/moviesSlice";

// Extract individual reducers from the default export of moviesSlices
const {
    trendingMoviesReducer,
    nowPlayingMoviesReducer,
    popularMoviesReducer,
    topRatedMoviesReducer,
    upcomingMoviesReducer
} = moviesSlices;

const store = configureStore({
    reducer: {
        trendingMovies: trendingMoviesReducer,
        nowPlayingMovies: nowPlayingMoviesReducer,
        popularMovies: popularMoviesReducer,
        topRatedMovies: topRatedMoviesReducer,
        upcomingMovies: upcomingMoviesReducer
    },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import moviesSlices from "./features/movies/moviesSlice";
import movieDetailReducer from './features/movies/movieDetailSlice';

const {
    trendingMoviesReducer,
    nowPlayingMoviesReducer,
    popularMoviesReducer,
    topRatedMoviesReducer,
    upcomingMoviesReducer,
    exploreMoviesReducer,
    searchMoviesReducer,
} = moviesSlices;

const store = configureStore({
    reducer: {
        trendingMovies: trendingMoviesReducer,
        nowPlayingMovies: nowPlayingMoviesReducer,
        popularMovies: popularMoviesReducer,
        topRatedMovies: topRatedMoviesReducer,
        upcomingMovies: upcomingMoviesReducer,
        exploreMovies: exploreMoviesReducer,
        searchMovies: searchMoviesReducer,
        movieDetail: movieDetailReducer,
    },
});

export default store;

// src/features/movies/moviesSlice.jsx
import { createSlice } from '@reduxjs/toolkit';
import { fetchTrendingMovies, fetchNowPlayingMovies } from '../../api/moviesApi';

const createMovieSlice = (name, fetchMovieAction) => createSlice({
    name,
    initialState: {
        movies: [],
        status: 'idle',
        error: null,
        imageUrl: 'https://image.tmdb.org/t/p/original',
    },
    reducers: {
        setImageUrl: (state, action) => {
            state.imageUrl = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovieAction.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMovieAction.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.movies = action.payload.results;
            })
            .addCase(fetchMovieAction.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const trendingMoviesSlice = createMovieSlice('trendingMovies', fetchTrendingMovies);
export const nowPlayingMoviesSlice = createMovieSlice('nowPlayingMovies', fetchNowPlayingMovies);

export const { setImageUrl } = trendingMoviesSlice.actions;
export const { setImageUrl: setNowPlayingImageUrl } = nowPlayingMoviesSlice.actions;

export default {
    trendingMoviesReducer: trendingMoviesSlice.reducer,
    nowPlayingMoviesReducer: nowPlayingMoviesSlice.reducer,
};

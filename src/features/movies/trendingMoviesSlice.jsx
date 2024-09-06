import { createSlice } from '@reduxjs/toolkit';
import { fetchConfiguration, fetchTrendingMovies } from '../../api/moviesApi';

const initialState = {
    trendingMovies: [],
    configuration: null,
    status: 'idle',
    configStatus: 'idle',
    error: null,
    configError: null,
    imageUrl: 'https://image.tmdb.org/t/p/original',
};

const trendingMoviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setImageUrl: (state, action) => {
            state.imageUrl = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrendingMovies.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.trendingMovies = action.payload.results;
            })
            .addCase(fetchTrendingMovies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })


            // Handle fetchConfiguration
            .addCase(fetchConfiguration.pending, (state) => {
                state.configStatus = 'loading';
            })
            .addCase(fetchConfiguration.fulfilled, (state, action) => {
                state.configStatus = 'succeeded';
                state.configuration = action.payload; // Assuming configuration object is returned
            })
            .addCase(fetchConfiguration.rejected, (state, action) => {
                state.configStatus = 'failed';
                state.configError = action.payload;
            });
    },
});

export const { setImageUrl } = trendingMoviesSlice.actions;

export default trendingMoviesSlice.reducer;

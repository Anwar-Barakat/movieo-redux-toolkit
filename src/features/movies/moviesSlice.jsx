import { createSlice } from '@reduxjs/toolkit';
import { fetchTrendingMovies } from '../../api/moviesApi';

const initialState = {
    trendingMovies: [],
    status: 'idle',
    error: null,
};

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrendingMovies.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.trendingMovies = action.payload.results; // Assuming results array is returned
            })
            .addCase(fetchTrendingMovies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default moviesSlice.reducer;

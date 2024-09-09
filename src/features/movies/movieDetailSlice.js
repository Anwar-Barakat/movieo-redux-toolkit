import { createSlice } from '@reduxjs/toolkit';
import { fetchMovieDetails } from '../../api/moviesApi';

const movieDetailSlice = createSlice({
    name: 'movieDetail',
    initialState: {
        movie: null,
        cast: [],
        similar: [],
        recommended: [],
        status: 'idle',
        error: null,
        imageUrl: 'https://image.tmdb.org/t/p/original',
        video : null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovieDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMovieDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log(action.payload);
                
                state.movie = action.payload.movieDetails;
                state.cast = action.payload.movieCredits.cast;
                state.similar = action.payload.similarMovies.results;
                state.recommended = action.payload.recommendedMovies.results;
                state.video = action.payload.videoMovie;
            })
            .addCase(fetchMovieDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default movieDetailSlice.reducer;

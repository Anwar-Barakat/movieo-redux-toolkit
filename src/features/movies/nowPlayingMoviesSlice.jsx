import { createSlice } from '@reduxjs/toolkit';
import { fetchNowPlayingMovies} from '../../api/moviesApi';

const initialState = {
    nowPlayingMovies: [],
    nowPlayingStatus: 'idle',
    nowPlayingError : null,
    nowPlayingImageUrl: 'https://image.tmdb.org/t/p/original',
};

const nowPlayingMoviesSlice = createSlice({
    name: 'movies',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchNowPlayingMovies.pending, (state) => {
                state.nowPlayingStatus = 'loading';
            })
            .addCase(fetchNowPlayingMovies.fulfilled, (state, action) => {
                state.nowPlayingStatus = 'succeeded';
                state.nowPlayingMovies = action.payload.results;
            })
            .addCase(fetchNowPlayingMovies.rejected, (state, action) => {
                state.nowPlayingStatus = 'failed';
                state.nowPlayingError = action.error.message;
            })
    },
});

export default nowPlayingMoviesSlice.reducer;

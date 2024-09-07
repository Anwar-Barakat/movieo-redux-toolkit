import { configureStore } from '@reduxjs/toolkit'
import trendingMoviesSlice from './features/movies/trendingMoviesSlice.jsx'
import nowPlayingMoviesSlice from './features/movies/nowPlayingMoviesSlice.jsx'

export const store = configureStore({
    reducer: {
        trendingMoviesData: trendingMoviesSlice,
        nowPlayingMoviesData: nowPlayingMoviesSlice,
    },
})
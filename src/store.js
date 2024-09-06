import { configureStore } from '@reduxjs/toolkit'
import trendingMoviesSlice from './features/movies/trendingMoviesSlice.jsx'

export const store = configureStore({
    reducer: {
        trendingMoviesData: trendingMoviesSlice
    },
})
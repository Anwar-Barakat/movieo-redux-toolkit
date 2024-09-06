import { configureStore } from '@reduxjs/toolkit'
import moviesSlice from './features/movies/moviesSlice.jsx'

export const store = configureStore({
    reducer: {
        moviesData: moviesSlice
    },
})
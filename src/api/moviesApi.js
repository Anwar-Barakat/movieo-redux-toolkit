import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Utility function for API calls
const fetchMoviesData = async (url, thunkAPI) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
};

// Fetch trending movies
export const fetchTrendingMovies = createAsyncThunk('movies/fetchTrendingMovies', (_, thunkAPI) =>
    fetchMoviesData('/trending/all/week', thunkAPI)
);

// Fetch now playing movies
export const fetchNowPlayingMovies = createAsyncThunk('movies/fetchNowPlayingMovies', (_, thunkAPI) =>
    fetchMoviesData('/movie/now_playing', thunkAPI)
);

// Fetch configuration
export const fetchConfiguration = createAsyncThunk('movies/fetchConfiguration', (_, thunkAPI) =>
    fetchMoviesData('/configuration', thunkAPI)
);

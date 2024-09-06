import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch trending movies
export const fetchTrendingMovies = createAsyncThunk('movies/fetchTrendingMovies', async (_, thunkAPI) => {
    try {
        const response = await axios.get('/trending/all/week');
        return response.data; // Return the data to be handled by the extraReducers
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const fetchConfiguration = createAsyncThunk('movies/fetchConfiguration', async (_, thunkAPI) => {
    try {
        const response = await axios.get('/configuration');
        return response.data; // Return the data to be handled by the extraReducers

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
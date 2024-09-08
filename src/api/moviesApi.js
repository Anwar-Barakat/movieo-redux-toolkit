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

// Fetch Popular movies
export const fetchPopularMovies = createAsyncThunk('movies/fetchPopularMovies', (_, thunkAPI) =>
    fetchMoviesData('/tv/popular', thunkAPI)
);


// Fetch Popular movies
export const fetchTopRatedMovies = createAsyncThunk('movies/fetchTopRatedMovies', (_, thunkAPI) =>
    fetchMoviesData('/movie/top_rated', thunkAPI)
);

// fetch upcoming movies
export const fetchUpcomingMovies = createAsyncThunk('movies/fetchUpcomingMovies', (_, thunkAPI) =>
    fetchMoviesData('/movie/upcoming', thunkAPI)
);


export const fetchExploreData = createAsyncThunk('movies/fetchExploreData', async ({exploreType, page = 1}, thunkAPI) => {
    console.log(exploreType);

    const url = exploreType === 'tv' ? '/discover/tv' : '/discover/movie';

    return fetchMoviesData(url, thunkAPI, page);
});

// Fetch configuration
export const fetchConfiguration = createAsyncThunk('movies/fetchConfiguration', (_, thunkAPI) =>
    fetchMoviesData('/configuration', thunkAPI)
);

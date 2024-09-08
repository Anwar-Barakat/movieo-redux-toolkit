import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Utility function for API calls
const fetchMoviesData = async (url, thunkAPI,  params = { page: 1 }) => {
    try {
        console.log('hello', params);
        
        const response = await axios.get(url, {
            params : {
                ...params
              }
        });
        
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


export const fetchExploreMovies = createAsyncThunk('movies/fetchExploreMovies', async ({exploreType, page =1}, thunkAPI) => {
    console.log(exploreType);

    const url = exploreType === 'tv' ? `/discover/tv?page=${page}` : `/discover/movie?page=${page}`;

    return fetchMoviesData(url, thunkAPI, page);
});

export const fetchSearchMovies = createAsyncThunk('movies/fetchSearchMovies', async ({ query, page = 1 }, thunkAPI) => {
    try {
        return fetchMoviesData('search/collection', thunkAPI, {query, page});
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});



// Fetch configuration
export const fetchConfiguration = createAsyncThunk('movies/fetchConfiguration', (_, thunkAPI) =>
    fetchMoviesData('/configuration', thunkAPI)
);

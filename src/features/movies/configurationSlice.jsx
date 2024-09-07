import { createSlice } from '@reduxjs/toolkit';
import { fetchConfiguration } from '../../api/moviesApi';

const configurationSlice = createSlice({
    name: 'configuration',
    initialState: {
        configuration: null,
        status: 'idle',
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchConfiguration.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchConfiguration.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.configuration = action.payload;
            })
            .addCase(fetchConfiguration.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default configurationSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const countrySlice = createSlice({
    name: 'country',
    initialState,
    reducers: {
        FETCH: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            return action.payload.result;
        },
        CREATE: (state, action) => {
            return [...state, action.payload.result];
        },
        UPDATE: (state, action) => {
            return state.map((country) => (country.country_id === action.payload.result.country_id ? action.payload.result : country));
        },
        DELETE: (state, action) => {
            return state.filter((country) => country.country_id !== action.payload);
        }
    }
});

// Action creators are generated for each case reducer function
export const { FETCH, CREATE, UPDATE, DELETE } = countrySlice.actions;

export default countrySlice.reducer;

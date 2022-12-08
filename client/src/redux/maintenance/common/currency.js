import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const currencySlice = createSlice({
    name: 'currency',
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
            return state.map((currency) => (currency.currency_id === action.payload.result.currency_id ? action.payload.result : currency));
        },
        DELETE: (state, action) => {
            return state.filter((currency) => currency.currency_id !== action.payload);
        }
    }
});

// Action creators are generated for each case reducer function
export const { FETCH, CREATE, UPDATE, DELETE } = currencySlice.actions;

export default currencySlice.reducer;

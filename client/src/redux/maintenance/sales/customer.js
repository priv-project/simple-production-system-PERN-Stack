import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const customerSlice = createSlice({
    name: 'customer',
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
            return state.map((customer) => (customer.customer_id === action.payload.result.customer_id ? action.payload.result : customer));
        },
        DELETE: (state, action) => {
            return state.filter((customer) => customer.customer_id !== action.payload);
        }
    }
});

// Action creators are generated for each case reducer function
export const { FETCH, CREATE, UPDATE, DELETE } = customerSlice.actions;

export default customerSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const productCustomerSlice = createSlice({
    name: 'Product Customer',
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
            return state.map((product_customer) =>
                product_customer.prod_cust_id === action.payload.result.prod_cust_id ? action.payload.result : product_customer
            );
        },
        DELETE: (state, action) => {
            return state.filter((product_customer) => product_customer.prod_cust_id !== action.payload);
        }
    }
});

// Action creators are generated for each case reducer function
export const { FETCH, CREATE, UPDATE, DELETE } = productCustomerSlice.actions;

export default productCustomerSlice.reducer;

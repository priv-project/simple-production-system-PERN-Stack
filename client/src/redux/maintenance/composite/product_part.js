import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const productPartSlice = createSlice({
    name: 'product part',
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
        // UPDATE: (state, action) => {
        //     return state.map((product) => (product.product_id === action.payload.result.product_id ? action.payload.result : product));
        // },
        DELETE: (state, action) => {
            return state.filter((productPart) => !action.payload.includes(productPart.prod_part_id));
        }
    }
});

// Action creators are generated for each case reducer function
export const { FETCH, CREATE, UPDATE, DELETE } = productPartSlice.actions;

export default productPartSlice.reducer;

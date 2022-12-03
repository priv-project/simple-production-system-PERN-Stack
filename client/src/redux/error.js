import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isError: false,
    data: []
};

export const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        ERROR: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            // console.log(action.payload);
            state.isError = true;
            state.data = action.payload.data;
        },
        UPDATE_ERROR: (state) => {
            state.isError = false;
        }
    }
});

// Action creators are generated for each case reducer function
export const { ERROR, UPDATE_ERROR } = errorSlice.actions;

export default errorSlice.reducer;

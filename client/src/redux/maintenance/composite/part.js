import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const partSlice = createSlice({
    name: 'part',
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
            return state.map((part) => (part.part_id === action.payload.result.part_id ? action.payload.result : part));
        },
        DELETE: (state, action) => {
            return state.filter((part) => part.part_id !== action.payload);
        }
    }
});

// Action creators are generated for each case reducer function
export const { FETCH, CREATE, UPDATE, DELETE } = partSlice.actions;

export default partSlice.reducer;

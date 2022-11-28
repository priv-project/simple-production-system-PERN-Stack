import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const modelSlice = createSlice({
    name: 'model',
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
            return state.map((model) => (model.model_id === action.payload.result.part_id ? action.payload.result : model));
        },
        DELETE: (state, action) => {
            return state.filter((model) => model.model_id !== action.payload);
        }
    }
});

// Action creators are generated for each case reducer function
export const { FETCH, CREATE, UPDATE, DELETE } = modelSlice.actions;

export default modelSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        AUTH: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
            return { ...state, authData: action.data, loading: false, errors: null };
        },
        LOGOUT: (state) => {
            localStorage.clear();
            return { ...state, authData: null, loading: false, errors: null };
        }
    }
});

// Action creators are generated for each case reducer function
export const { AUTH, LOGOUT } = authSlice.actions;

export default authSlice.reducer;

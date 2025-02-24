import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    userData: {}
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.userData = {};
        }
    }
});

export const { login, logout } = authSlice.actions;

export const authReducers = authSlice.reducer;
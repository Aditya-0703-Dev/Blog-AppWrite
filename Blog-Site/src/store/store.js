import {configureStore} from '@reduxjs/toolkit';
import {authReducers} from '../features/authSlice';

export const store = configureStore({
    reducer: authReducers
});
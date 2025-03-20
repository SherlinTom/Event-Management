import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import eventReducer from './eventSlice';
const store = configureStore({
    reducer: {
        users: userReducer,
        events: eventReducer
    }
});

export default store;
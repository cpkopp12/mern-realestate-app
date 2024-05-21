import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';

// redux configure store -----------------------------
export const store = configureStore({
  reducer: { user: userReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

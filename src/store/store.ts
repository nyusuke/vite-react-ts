import { configureStore } from '@reduxjs/toolkit';
import { nameApi } from './api/nameApi';

export const store = configureStore({
  reducer: {
    [nameApi.reducerPath]: nameApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(nameApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
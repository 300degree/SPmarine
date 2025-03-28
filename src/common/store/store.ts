import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const reducer = {};

export const store = configureStore({
  reducer,
  // devTools: 'development',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

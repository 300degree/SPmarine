import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import plansReducer from './slices/plansSlice';
import planReducer from './slices/planSlice';

const reducer = {
  plansReducer,
  planReducer,
};

export const store = configureStore({
  reducer,
  // devTools: 'development',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

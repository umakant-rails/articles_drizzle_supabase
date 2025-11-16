import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
// import rootReducer from "./rootReducer"; // adjust this import
import reducers from '@/app/slices';

export const store = configureStore({
  reducer: reducers
});


// Export types for later
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks (recommended by Redux Toolkit)
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
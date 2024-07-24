import { configureStore } from '@reduxjs/toolkit';
import userReducers from './user';
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
   reducer: {
      user: userReducers,
   },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useUserDispatch = useDispatch.withTypes<AppDispatch>();
export const useUserSelector = useSelector.withTypes<RootState>();

export const getTokenData = store.getState().user.userToken;

export const getUserData = store.getState().user.userData;
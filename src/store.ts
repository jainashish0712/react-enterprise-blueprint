import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { thisWillBeUsedInstoreForCounter } from './features/counter/counterSlice';
import { thisIsThePostsApi, thisWillBeUsedInstoreForApi } from './services/apiService';

export const thisIsTheMainStore = configureStore({
  reducer: {
    thisIsCounterState: thisWillBeUsedInstoreForCounter,
    [thisIsThePostsApi.reducerPath]: thisWillBeUsedInstoreForApi,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thisIsThePostsApi.middleware),
});

export type RootState = ReturnType<typeof thisIsTheMainStore.getState>;
export type AppDispatch = typeof thisIsTheMainStore.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

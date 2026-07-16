import { createSlice, createSelector, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

export interface CounterState {
  value: number;
  hasVisitedPosts: boolean;
}

const initialState: CounterState = {
  value: 2,
  hasVisitedPosts: false,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    setVisitedPosts: (state) => {
      state.hasVisitedPosts = true;
    },
  },
});

export const { increment, decrement, incrementByAmount, setVisitedPosts } = counterSlice.actions;

export const counterReducer = counterSlice.reducer;

export const selectCounterState = (state: RootState) => state.counter;

export const selectCount = createSelector(
  [selectCounterState],
  (counterState) => counterState.value
);

export const selectHasVisitedPosts = createSelector(
  [selectCounterState],
  (counterState) => counterState.hasVisitedPosts
);

import { createSlice, createSelector, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

export interface CounterState {
  thisIsTheCounterValue: number;
  hasVisitedPostsPage: boolean;
}

const initialState: CounterState = {
  thisIsTheCounterValue: 2,
  hasVisitedPostsPage: false,
};

export const thisIsCounterSlice = createSlice({
  name: 'counterSliceName',
  initialState,
  reducers: {
    incrementTheCounter: (state) => {
      state.thisIsTheCounterValue += 1;
    },
    decrementTheCounter: (state) => {
      state.thisIsTheCounterValue -= 1;
    },
    incrementTheCounterByAmount: (state, action: PayloadAction<number>) => {
      state.thisIsTheCounterValue += action.payload;
    },
    setVisitedPostsPage: (state) => {
      state.hasVisitedPostsPage = true;
    },
  },
});

export const { incrementTheCounter, decrementTheCounter, incrementTheCounterByAmount, setVisitedPostsPage } = thisIsCounterSlice.actions;

export const thisWillBeUsedInstoreForCounter = thisIsCounterSlice.reducer;

export const selectCounterState = (state: RootState) => state.thisIsCounterState;

// export const selectCounterState = (state: RootState) => state.thisIsCounterState;

export const selectCounterValue = createSelector(
  [selectCounterState],
  (counterState) => counterState.thisIsTheCounterValue
);

export const selectHasVisitedPostsPage = createSelector(
  [selectCounterState],
  (counterState) => counterState.hasVisitedPostsPage
);

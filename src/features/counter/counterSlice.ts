import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
  thisIsTheCounterValue: number;
}

const initialState: CounterState = {
  thisIsTheCounterValue: 2,
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
  },
});

export const { incrementTheCounter, decrementTheCounter, incrementTheCounterByAmount } = thisIsCounterSlice.actions;

export const thisWillBeUsedInstoreForCounter = thisIsCounterSlice.reducer;

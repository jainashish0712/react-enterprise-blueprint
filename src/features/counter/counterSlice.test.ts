import { describe, it, expect } from 'vitest';
import {
  counterReducer,
  increment,
  decrement,
  incrementByAmount,
  type CounterState
} from './counterSlice';

describe('counter reducer', () => {
  const initialState: CounterState = {
    value: 2,
    hasVisitedPosts: false,
  };

  it('should handle initial state', () => {
    expect(counterReducer(undefined, { type: 'unknown' })).toEqual({
      value: 2,
      hasVisitedPosts: false,
    });
  });

  it('should handle increment', () => {
    const actual = counterReducer(initialState, increment());
    expect(actual.value).toEqual(3);
  });

  it('should handle decrement', () => {
    const actual = counterReducer(initialState, decrement());
    expect(actual.value).toEqual(1);
  });

  it('should handle incrementByAmount', () => {
    const actual = counterReducer(initialState, incrementByAmount(5));
    expect(actual.value).toEqual(7);
  });
});

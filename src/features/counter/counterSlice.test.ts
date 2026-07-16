import {
  thisWillBeUsedInstoreForCounter,
  incrementTheCounter,
  decrementTheCounter,
  incrementTheCounterByAmount,
  type CounterState
} from './counterSlice';

describe('counter reducer', () => {
  const initialState: CounterState = {
    thisIsTheCounterValue: 2,
    hasVisitedPostsPage: false,
  };

  it('should handle initial state', () => {
    expect(thisWillBeUsedInstoreForCounter(undefined, { type: 'unknown' })).toEqual({
      thisIsTheCounterValue: 2,
      hasVisitedPostsPage: false,
    });
  });

  it('should handle incrementTheCounter', () => {
    const actual = thisWillBeUsedInstoreForCounter(initialState, incrementTheCounter());
    expect(actual.thisIsTheCounterValue).toEqual(3);
  });

  it('should handle decrementTheCounter', () => {
    const actual = thisWillBeUsedInstoreForCounter(initialState, decrementTheCounter());
    expect(actual.thisIsTheCounterValue).toEqual(1);
  });

  it('should handle incrementTheCounterByAmount', () => {
    const actual = thisWillBeUsedInstoreForCounter(initialState, incrementTheCounterByAmount(5));
    expect(actual.thisIsTheCounterValue).toEqual(7);
  });
});

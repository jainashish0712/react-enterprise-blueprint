import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';
import { thisIsTheMainStore } from '../store';
import '@testing-library/jest-dom';

// Mock the RTK query hook
jest.mock('../services/apiService', () => {
  const originalModule = jest.requireActual('../services/apiService');
  return {
    ...originalModule,
    useGetThePostsDummyResQuery: jest.fn(() => ({
      data: {
        posts: [
          { id: 1, title: 'Test Post 1', body: 'Body 1', userId: 1, tags: [], reactions: { likes: 0, dislikes: 0 } },
          { id: 2, title: 'Test Post 2', body: 'Body 2', userId: 1, tags: [], reactions: { likes: 0, dislikes: 0 } },
          { id: 3, title: 'Test Post 3', body: 'Body 3', userId: 1, tags: [], reactions: { likes: 0, dislikes: 0 } },
        ]
      },
      isLoading: false,
    })),
  };
});

describe('Home Component', () => {
  it('renders correctly and displays initial count', () => {
    render(
      <Provider store={thisIsTheMainStore}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Redux Toolkit Setup/i)).toBeInTheDocument();

    // The initial state of the store is 2 (from counterSlice.ts)
    expect(screen.getByText(/Count is 2/i)).toBeInTheDocument();

    // Shows the slice of posts based on current count
    expect(screen.getByText(/Test Post 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Post 2/i)).toBeInTheDocument();
    expect(screen.queryByText(/Test Post 3/i)).not.toBeInTheDocument();
  });

  it('handles increment and decrement actions', () => {
    render(
      <Provider store={thisIsTheMainStore}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    const incrementButton = screen.getByText('+');
    const decrementButton = screen.getByText('-');

    // Increment
    fireEvent.click(incrementButton);
    expect(screen.getByText(/Count is 3/i)).toBeInTheDocument();
    // Test Post 3 should now be visible because count is 3
    expect(screen.getByText(/Test Post 3/i)).toBeInTheDocument();

    // Decrement
    fireEvent.click(decrementButton);
    expect(screen.getByText(/Count is 2/i)).toBeInTheDocument();
  });
});

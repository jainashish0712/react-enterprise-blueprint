import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';
import { store } from '../store';
import { setVisitedPosts } from '../features/counter/counterSlice';
import '@testing-library/jest-dom';

// Mock the RTK query hook
vi.mock('../services/apiService', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../services/apiService')>();
  const mockQueryState = vi.fn(() => ({
    data: {
      posts: [
        { id: 1, title: 'Test Post 1', body: 'Body 1', userId: 1, tags: [], reactions: { likes: 0, dislikes: 0 } },
        { id: 2, title: 'Test Post 2', body: 'Body 2', userId: 1, tags: [], reactions: { likes: 0, dislikes: 0 } },
        { id: 3, title: 'Test Post 3', body: 'Body 3', userId: 1, tags: [], reactions: { likes: 0, dislikes: 0 } },
      ]
    },
    isLoading: false,
  }));

  return {
    ...actual,
    useGetPostsQuery: mockQueryState,
    apiService: {
      ...actual.apiService,
      endpoints: {
        ...actual.apiService?.endpoints,
        getPosts: {
          ...actual.apiService?.endpoints?.getPosts,
          useQueryState: mockQueryState,
        }
      },
      usePrefetch: vi.fn(() => vi.fn()),
    }
  };
});

describe('Home Component', () => {
  it('renders correctly and displays initial count', () => {
    store.dispatch(setVisitedPosts());
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/React Enterprise Blueprint/i)).toBeInTheDocument();

    // The initial state of the store is 2 (from counterSlice.ts)
    expect(screen.getByText(/Count is 2/i)).toBeInTheDocument();

    // Shows the slice of posts based on current count
    expect(screen.getByText(/Test Post 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Post 2/i)).toBeInTheDocument();
    expect(screen.queryByText(/Test Post 3/i)).not.toBeInTheDocument();
  });

  it('handles increment and decrement actions', () => {
    store.dispatch(setVisitedPosts());
    render(
      <Provider store={store}>
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

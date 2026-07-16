import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PostsPage from './PostsPage';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../store';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const originalModule = await vi.importActual<any>('react-router-dom');
  return {
    ...originalModule,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('../services/apiService', async (importOriginal) => {
  const actual = await importOriginal<any>();
  return {
    ...actual,
    useGetPostsQuery: vi.fn(() => ({
      data: {
        posts: [
          { id: 1, title: 'DataGrid Post 1', body: 'DataGrid Body 1' }
        ]
      },
      isLoading: false,
      error: undefined,
    }))
  };
});

// Mock MUI DataGrid to avoid ResizeObserver / JSDOM complexities
vi.mock('@mui/x-data-grid', () => ({
  DataGrid: ({ rows }: any) => (
    <div data-testid="mock-data-grid">
      {rows.map((row: any) => (
        <div key={row.id}>{row.title}</div>
      ))}
    </div>
  )
}));

describe('PostsPage Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders posts correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PostsPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Back to Home')).toBeInTheDocument();
    expect(screen.getByTestId('mock-data-grid')).toBeInTheDocument();
    expect(screen.getByText('DataGrid Post 1')).toBeInTheDocument();
  });

  it('handles back navigation', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PostsPage />
        </MemoryRouter>
      </Provider>
    );

    const backButton = screen.getByText('Back to Home');
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});

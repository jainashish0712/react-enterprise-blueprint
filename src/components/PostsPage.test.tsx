import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PostsPage from './PostsPage';
import '@testing-library/jest-dom';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: () => mockNavigate,
  };
});

jest.mock('../services/apiService', () => ({
  useGetThePostsDummyResQuery: jest.fn(() => ({
    data: {
      posts: [
        { id: 1, title: 'DataGrid Post 1', body: 'DataGrid Body 1' }
      ]
    },
    isLoading: false,
    error: undefined,
  }))
}));

// Mock MUI DataGrid to avoid ResizeObserver / JSDOM complexities
jest.mock('@mui/x-data-grid', () => ({
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
      <MemoryRouter>
        <PostsPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Back to Home')).toBeInTheDocument();
    expect(screen.getByTestId('mock-data-grid')).toBeInTheDocument();
    expect(screen.getByText('DataGrid Post 1')).toBeInTheDocument();
  });

  it('handles back navigation', () => {
    render(
      <MemoryRouter>
        <PostsPage />
      </MemoryRouter>
    );

    const backButton = screen.getByText('Back to Home');
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});

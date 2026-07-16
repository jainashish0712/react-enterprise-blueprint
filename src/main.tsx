import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { thisIsTheMainStore } from './store.ts'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'

const Fallback = ({ error }: FallbackProps) => (
  <div role="alert" style={{ padding: '20px', color: 'red' }}>
    <p>Something went wrong:</p>
    <pre style={{ color: 'red' }}>{error instanceof Error ? error.message : String(error)}</pre>
  </div>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={Fallback}>
      <Provider store={thisIsTheMainStore}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
)

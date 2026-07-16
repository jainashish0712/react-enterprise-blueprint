import { GlobalStyles as MUIGlobalStyles } from '@mui/material';

export default function GlobalStyles() {
  return (
    <MUIGlobalStyles styles={{
      ':root': {
        '--text': '#6b6375',
        '--text-h': '#08060d',
        '--bg': '#fff',
        '--border': '#e5e4e7',
        '--code-bg': '#f4f3ec',
        '--accent': '#aa3bff',
        '--accent-bg': 'rgba(170, 59, 255, 0.1)',
        '--accent-border': 'rgba(170, 59, 255, 0.5)',
        '--social-bg': 'rgba(244, 243, 236, 0.5)',
        '--shadow': 'rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px',
        '--sans': "system-ui, 'Segoe UI', Roboto, sans-serif",
        '--heading': "system-ui, 'Segoe UI', Roboto, sans-serif",
        '--mono': "ui-monospace, Consolas, monospace",
        font: '18px/145% var(--sans)',
        letterSpacing: '0.18px',
        colorScheme: 'light dark',
        color: 'var(--text)',
        background: 'var(--bg)',
        fontSynthesis: 'none',
        textRendering: 'optimizeLegibility',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        '@media (max-width: 1024px)': {
          fontSize: '16px',
        },
      },
      '@media (prefers-color-scheme: dark)': {
        ':root': {
          '--text': '#9ca3af',
          '--text-h': '#f3f4f6',
          '--bg': '#16171d',
          '--border': '#2e303a',
          '--code-bg': '#1f2028',
          '--accent': '#c084fc',
          '--accent-bg': 'rgba(192, 132, 252, 0.15)',
          '--accent-border': 'rgba(192, 132, 252, 0.5)',
          '--social-bg': 'rgba(47, 48, 58, 0.5)',
          '--shadow': 'rgba(0, 0, 0, 0.4) 0 10px 15px -3px, rgba(0, 0, 0, 0.25) 0 4px 6px -2px',
        },
        '#social .button-icon': {
          filter: 'invert(1) brightness(2)',
        }
      },
      '#root': {
        width: '1126px',
        maxWidth: '100%',
        margin: '0 auto',
        textAlign: 'center',
        borderInline: '1px solid var(--border)',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
      },
      body: {
        margin: 0,
      },
      'h1, h2': {
        fontFamily: 'var(--heading)',
        fontWeight: 500,
        color: 'var(--text-h)',
      },
      h1: {
        fontSize: '56px',
        letterSpacing: '-1.68px',
        margin: '32px 0',
        '@media (max-width: 1024px)': {
          fontSize: '36px',
          margin: '20px 0',
        }
      },
      h2: {
        fontSize: '24px',
        lineHeight: '118%',
        letterSpacing: '-0.24px',
        margin: '0 0 8px',
        '@media (max-width: 1024px)': {
          fontSize: '20px',
        }
      },
      p: {
        margin: 0,
      },
      'code': {
        fontFamily: 'var(--mono)',
        display: 'inline-flex',
        borderRadius: '4px',
        color: 'var(--text-h)',
        fontSize: '15px',
        lineHeight: '135%',
        padding: '4px 8px',
        background: 'var(--code-bg)',
      }
    }} />
  );
}

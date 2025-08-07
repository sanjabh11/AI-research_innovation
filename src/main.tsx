import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { AnalyticsDashboard } from './components/analytics/AnalyticsDashboard';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// Note: AnalyticsDashboard is imported and available for use elsewhere if needed.

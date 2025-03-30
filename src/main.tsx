
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Get the root element
const container = document.getElementById("root");

// Ensure the container exists
if (!container) throw new Error('Failed to find the root element');

// Create the root
const root = createRoot(container);

// Render with StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

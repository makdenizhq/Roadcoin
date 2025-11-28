// Fix: Import React to resolve the "React refers to a UMD global" error, which is necessary for using JSX.
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (!container) {
  const errorMsg = "Fatal Error: Root element not found.";
  console.error(errorMsg);
  document.body.innerHTML = errorMsg;
} else {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    console.error("React render failed:", err);
    container.innerHTML = '<div style="color:red; padding:20px">Failed to load application. Check console for details.</div>';
  }
}

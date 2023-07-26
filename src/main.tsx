import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense
      fallback={
        <div className="relative w-full h-full flex justify-center items-center bg-gray-950 text-white">
          <h1>Loading</h1>
        </div>
      }
    >
      <App />
    </Suspense>
  </React.StrictMode>
);

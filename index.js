import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import './index.css'; // Importing TailwindCSS
import App from './App';
import { ToastContainer } from 'react-toastify'; // Import React-Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

// Create a root using React 18's createRoot() method
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app with createRoot
root.render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>
);
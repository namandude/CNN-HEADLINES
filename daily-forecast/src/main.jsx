import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { NewsAppProvider } from './components/organisms/context/NewsAppProvider';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NewsAppProvider>
      <App />
    </NewsAppProvider>
  </React.StrictMode>
);

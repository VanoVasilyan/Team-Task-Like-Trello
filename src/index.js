import React from 'react';
import { createRoot } from "react-dom/client";
import store from './app/store';
import { Provider } from 'react-redux';
import App from './components/App';
import './index.css';

const root = document.getElementById('root')
createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>
)

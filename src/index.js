import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { persistor, store } from './components/redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import App from './App';
import { compose } from '@reduxjs/toolkit';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


ReactDOM.render(
  <React.StrictMode>
     <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


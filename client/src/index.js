import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import 'tailwindcss/dist/tailwind.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import 'popper.js/dist/popper.js';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css';
import './index.css'
import { store } from './Redux/store';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter><App /></BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

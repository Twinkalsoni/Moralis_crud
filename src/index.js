import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import reportWebVitals from './reportWebVitals';
import { MoralisProvider } from "react-moralis";
import {BrowserRouter as Router,Route,Routes}from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MoralisProvider appId='s90MzvJYYwPUMYCj04z6UH7IuizUSH6SU9u8ZB8G' serverUrl='https://etpho6eqimtw.usemoralis.com:2053/server'>
  <React.StrictMode>
    <Router>
    <App />
    </Router>
  </React.StrictMode>
  </MoralisProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

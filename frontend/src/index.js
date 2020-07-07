import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// https://stackoverflow.com/questions/49314386/what-is-service-worker-in-react-js
import App from './App';
import '../public/bootstrap.css'
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../node_modules/react-bootstrap';
ReactDOM.render(
  // <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </React.StrictMode>
  ,
  document.getElementById('root')
);
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css"

// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min"

//import "./index.css"

//import Amplify
import { Amplify } from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

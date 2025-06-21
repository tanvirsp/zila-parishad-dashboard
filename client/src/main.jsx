import React from 'react';
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import router from './router/routes/Routes';
import './assets/css/style.css'
import 'animate.css';
import 'react-loading-skeleton/dist/skeleton.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
     
  </React.StrictMode>,
)

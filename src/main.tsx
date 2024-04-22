import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes.tsx'
import { createBrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
  
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

const router = createBrowserRouter(routes);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

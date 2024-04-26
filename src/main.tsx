import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes.tsx'
import { createBrowserRouter } from "react-router-dom";
import {BasketProvider, useBasketState} from "./Complex/BasketContext.tsx";
import {TotalProvider} from "./Complex/TotalContext.tsx";


const router = createBrowserRouter(routes);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BasketProvider>
          <TotalProvider>
              <RouterProvider router={router} />
          </TotalProvider>
      </BasketProvider>
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes.tsx'
import { createBrowserRouter } from "react-router-dom";
import {BasketProvider} from "./Complex/BasketContext.tsx";
import {TotalProvider} from "./Complex/TotalContext.tsx";
import {DeliveryProvider} from "./Complex/DeliveryContext.tsx";


const router = createBrowserRouter(routes);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BasketProvider>
          <TotalProvider>
              <DeliveryProvider>
                <RouterProvider router={router} />
              </DeliveryProvider>
          </TotalProvider>
      </BasketProvider>
  </React.StrictMode>,
)

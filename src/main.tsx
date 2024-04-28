import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes.tsx'
import { createBrowserRouter } from "react-router-dom";
import {BasketProvider} from "./Complex/BasketContext.tsx";
import {TotalProvider} from "./Complex/TotalContext.tsx";
import {DeliveryProvider} from "./Complex/DeliveryContext.tsx";
import {CheckoutProvider} from "./Complex/CheckoutContext.tsx";

const router = createBrowserRouter(routes);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BasketProvider>
          <TotalProvider>
              <DeliveryProvider>
                  <CheckoutProvider>
                <RouterProvider router={router} />
                  </CheckoutProvider>
              </DeliveryProvider>
          </TotalProvider>
      </BasketProvider>
  </React.StrictMode>,
)

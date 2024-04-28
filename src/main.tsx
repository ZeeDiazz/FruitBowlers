import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes.tsx'
import { createBrowserRouter } from "react-router-dom";
import {BasketProvider} from "./Context/BasketContext.tsx";
import {TotalProvider} from "./Context/TotalContext.tsx";
import {DeliveryProvider} from "./Context/DeliveryContext.tsx";
import {CheckoutProvider} from "./Context/CheckoutContext.tsx";

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

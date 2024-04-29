import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'
import {routes} from './routes.tsx'
import {createBrowserRouter} from "react-router-dom";
import {BasketProvider} from "./Context/BasketContext.tsx";
import {DeliveryProvider} from "./Context/DeliveryContext.tsx";
import {CheckoutProvider} from "./Context/CheckoutContext.tsx";
import {PaymentProvider} from "./Context/PaymentContext.tsx";

const router = createBrowserRouter(routes);
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BasketProvider>
            <DeliveryProvider>
                <PaymentProvider>
                    <CheckoutProvider>
                        <RouterProvider router={router}/>
                    </CheckoutProvider>
                </PaymentProvider>
            </DeliveryProvider>
        </BasketProvider>
    </React.StrictMode>,
)

import {RouteObject} from "react-router-dom";
import { App } from "./App";
import ChoosePayment from "./Stages/StagePayment";
import { StageDelivery } from './Stages/StageDelivery.tsx'
import {StageCheckout} from './Stages/StageCheckout.tsx'
const one: number= 1;
const enabled = false;
import {ErrorPage} from "./ErrorPage.tsx";
import {OrderCompleted} from "./Stages/StageComplete.tsx";
import ProtectedRoute from "./Context/ProtectedRoute.tsx";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/Delivery",
        element: <StageDelivery/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/Payment",
        element: <ChoosePayment totalDiscountedPrice={one} isInvoiceEnabled={enabled}/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/Checkout",
        element: <StageCheckout/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/OrderSubmitted",
        element:(
            <ProtectedRoute>
                <OrderCompleted/>
            </ProtectedRoute>),
        errorElement: <ErrorPage/>,
    },
];
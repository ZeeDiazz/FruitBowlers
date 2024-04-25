import { RouteObject } from "react-router-dom";
import { App } from "./App";
import ChoosePayment from "./Stages/StagePayment";
import { StageDelivery } from './Stages/StageDelivery.tsx'
import { StageBasket } from './Stages/StageBasket.tsx'
import {StageCheckout} from './Stages/StageCheckout.tsx'
const one: number= 1;
const enabled = false;
import {ErrorPage} from "./ErrorPage.tsx";


export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [

            {
                path: "/",
                element: <StageBasket />,
                errorElement: <ErrorPage/>,
            },
            {
                path: "/stageDelivery",
                element: <StageDelivery/>,
                errorElement: <ErrorPage/>,
            }
            ,
            {
                path: "/stagePayment",
                element: <ChoosePayment totalDiscountedPrice={one} isInvoiceEnabled={enabled}/>,
                errorElement: <ErrorPage/>,
            },
            {
                path: "/stageCheckout",
                element: <StageCheckout/>,
                errorElement: <ErrorPage/>,
            },
        ]
    }
];
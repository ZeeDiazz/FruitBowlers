import { RouteObject } from "react-router-dom";
import { App } from "./App";
import ChoosePayment from "./Stages/StagePayment";
import { StageDelivery } from './Stages/StageDelivery.tsx'
const one: number= 1;
const enabled = false;
import { useRouteError } from "react-router-dom";



function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
  );
}

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/Delivery",
        element: <StageDelivery />,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/Payment",
        element: <ChoosePayment totalDiscountedPrice={one} isInvoiceEnabled={enabled} />,
        errorElement: <ErrorPage/>,
    },

];
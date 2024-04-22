import { RouteObject } from "react-router-dom";
import { BrowserRouter as Router, RouterProvider } from "react-router-dom";
import { App } from "./App";
import { TotalBox } from "./Stages/StageTotal";
import ChoosePayment from "./Stages/StagePayment";
const one: number= 1;
const enabled = false;


const form  =  {
  Name: "Zayd",
  LastName: "Doe",
  Email: "zayd.doe@example.com",
  zipcode1: 12345,
  City: "Copenhagen",
  streetName: "Main Street",
  Telephone: 12345678
}

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/stagepayment",
    element: <ChoosePayment totalDiscountedPrice={one} isInvoiceEnabled={enabled} form={form} />,
  },
];
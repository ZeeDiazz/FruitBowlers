import { RouteObject } from "react-router-dom";
import { BrowserRouter as Router, RouterProvider } from "react-router-dom";
import { StageBasket } from "./StageBasket";
import App from "../App";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/albums",
    element: <StageBasket />,
  },
];
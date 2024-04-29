import { Navigate } from "react-router-dom";
import { useCheckoutState } from "./CheckoutContext.tsx";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { hasPaid } = useCheckoutState();
    return hasPaid ? children : <Navigate to="/Checkout" />;
}

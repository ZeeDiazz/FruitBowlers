import {createContext, useContext, useReducer} from "react";

export interface ChoosePaymentProps {
    isInvoiceEnabled: boolean;
    totalDiscountedPrice: number; //Not in use right now. Could have been used in gift-card, but we decided not to.
}
export enum PaymentOption{
    NONE, CARD, GIFT_CARD, INVOICE, MobilePay
}
interface PaymentState {
    text: string;
}
const initialPaymentState: PaymentState = {
    text: '  Gift card is case sensitive '
};
interface PaymentAction {
    type: string,
    payload: string
}

const paymentReducer = (state: PaymentState, action: PaymentAction) => {
    switch (action.type) {
        case 'updateText':
            return { ...state, text: action.payload };
        default:
            return state;
    }
}
const PaymentContext = createContext<PaymentState | null>(null)

// Dispatch context
const PaymentDispatchContext = createContext<React.Dispatch<PaymentAction> | null>(null)

// Provider
type PaymentProviderProps = React.PropsWithChildren<{state?: PaymentState}>
export function PaymentProvider({ children, state: explicitState }: PaymentProviderProps) {
    const [state, dispatch] = useReducer(
        paymentReducer, explicitState || initialPaymentState);

    if (!state) {
        throw new Error("BasketContext: Initial state cannot be null.");
    }
    return (
        <PaymentContext.Provider value={state}>
            <PaymentDispatchContext.Provider value={dispatch}>
                {children}
            </PaymentDispatchContext.Provider>
        </PaymentContext.Provider>
    );
}

// state hook
export function usePaymentState() {
    const state = useContext(PaymentContext);
    if (state === null) {
        throw new Error("Unexpected useBasketState without parent <PaymentProvider>");
    }
    return state;
}

// dispatch hook
export function usePaymentDispatch() {
    const dispatch = useContext(PaymentDispatchContext);
    if (dispatch === null) {
        throw new Error(
            "Unexpected useBasketDispatch without parent <PaymentProvider>"
        );
    }
    return dispatch;
}
import {createContext, useContext, useReducer} from "react";

export enum PaymentOption {
    NONE, CARD, GIFT_CARD, INVOICE, MobilePay
}

interface PaymentState {
    updateText: string;
    paymentOption: PaymentOption;
    isPopUpActive: boolean;
}

const initialPaymentState: PaymentState = {
    updateText: '  Gift card is case sensitive ',
    paymentOption: PaymentOption.NONE,
    isPopUpActive: false
};
type PaymentAction =
    | { type: 'updateText', payload: { update: string } }
    | { type: 'changePaymentOption', payload: { newOption: PaymentOption } }
    | {
    type: 'togglePopUp', payload: { toggle: boolean }
};

const paymentReducer = (state: PaymentState, action: PaymentAction) => {
    switch (action.type) {
        case 'updateText':
            return {
                ...state,
                text: action.payload
            };
        case 'changePaymentOption':
            return {
                ...state,
                paymentOption: action.payload.newOption
            }
        case 'togglePopUp':
            return {
                ...state,
                isPopUpActive: action.payload.toggle
            }
        default:
            return state;
    }
}
const PaymentContext = createContext<PaymentState | null>(null)

// Dispatch context
const PaymentDispatchContext = createContext<React.Dispatch<PaymentAction> | null>(null)

// Provider
type PaymentProviderProps = React.PropsWithChildren<{ state?: PaymentState }>

export function PaymentProvider({children, state: explicitState}: PaymentProviderProps) {
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

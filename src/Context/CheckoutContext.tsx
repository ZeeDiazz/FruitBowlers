// Type of state
import {createContext, useContext, useReducer} from "react";

interface CheckoutState {
   commentText: string|undefined;
   receiveEmail: boolean;
   hasPaid?:boolean;
}

// Initial state
const initialCheckoutState: CheckoutState = {
    commentText: "",
    receiveEmail: false,
    hasPaid: false,
};

// Type of actions
type CheckoutAction =
    |{ type: 'CommentText', payload : { commentText: string}}
    |{ type: 'ReceiveEmail', payload : { receiveEmail: boolean}}
    |{ type: 'HasPaid', payload : { hasPaid: boolean|undefined}}
    ;

// Reducer
const checkoutReducer = (state: CheckoutState, action: CheckoutAction) => {
    switch(action.type) {
        case 'CommentText':
            return {
                ...state,
               commentText: action.payload.commentText,
            }
        case 'ReceiveEmail':
            return {
                ...state,
                receiveEmail: action.payload.receiveEmail,
            }
        case 'HasPaid':
            return {
                ...state,
                hasPaid: action.payload.hasPaid,
            }
        default:
            return state;
    }
}

// State context
const CheckoutContext = createContext<CheckoutState | null>(null)

// Dispatch context
const CheckoutDispatchContext = createContext<React.Dispatch<CheckoutAction> | null>(null)

// Provider
type CheckoutProviderProps = React.PropsWithChildren<{state?: CheckoutState}>
export function CheckoutProvider({ children, state: explicitState}: CheckoutProviderProps) {
    const [state, dispatch] = useReducer(
        checkoutReducer, explicitState || initialCheckoutState);

    if (!state) {
        throw new Error("CheckOutContext: Initial state cannot be null.");
    }
    return (
        <CheckoutContext.Provider value={state}>
            <CheckoutDispatchContext.Provider value={dispatch}>
                {children}
            </CheckoutDispatchContext.Provider>
        </CheckoutContext.Provider>
    );
}

// state hook
export function useCheckoutState() {
    const state = useContext(CheckoutContext);
    if (state === null) {
        throw new Error("Unexpected useTotalState without parent <CheckoutProvider>");
    }
    return state;
}

// dispatch hook
export function useCheckoutDispatch() {
    const dispatch = useContext(CheckoutDispatchContext);
    if (dispatch === null) {
        throw new Error(
            "Unexpected useTotalDispatch without parent <CheckoutProvider>"
        );
    }
    return dispatch;
}
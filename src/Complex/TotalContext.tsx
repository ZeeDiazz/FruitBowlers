// Type of state
import {createContext, useContext, useReducer} from "react";

interface TotalState {
    totalPrice: number;
    totalQuantity: number;
}

// Initial state
const initialTotalState: TotalState = {
    totalPrice: 0,
    totalQuantity: 0
};

// Type of actions
type TotalAction =
    | { type: 'TotalQuantity', payload : { quantityAmount: number}}
    | { type: 'TotalPrice', payload : { priceAmount: number}}
    ;

// Reducer
const totalReducer = (state: TotalState, action: TotalAction) => {
    switch(action.type) {
        case 'TotalPrice':
            return {
                ...state,
                totalPrice: action.payload.priceAmount,
            }
        case 'TotalQuantity':
            return {
                ...state,
                totalQuantity: action.payload.quantityAmount,
            }
        default:
            return state;
    }
}

// State context
const TotalContext = createContext<TotalState | null>(null)

// Dispatch context
const TotalDispatchContext = createContext<React.Dispatch<TotalAction> | null>(null)

// Provider
type TotalProviderProps = React.PropsWithChildren<{state?: TotalState}>
export function TotalProvider({ children, state: explicitState }: TotalProviderProps) {
    const [state, dispatch] = useReducer(
        totalReducer, explicitState || initialTotalState);

    if (!state) {
        throw new Error("TotalContext: Initial state cannot be null.");
    }
    return (
        <TotalContext.Provider value={state}>
            <TotalDispatchContext.Provider value={dispatch}>
                {children}
            </TotalDispatchContext.Provider>
        </TotalContext.Provider>
    );
}

// state hook
export function useTotalState() {
    const state = useContext(TotalContext);
    if (state === null) {
        throw new Error("Unexpected useTotalState without parent <TotalProvider>");
    }
    return state;
}

// dispatch hook
export function useTotalDispatch() {
    const dispatch = useContext(TotalDispatchContext);
    if (dispatch === null) {
        throw new Error(
            "Unexpected useTotalDispatch without parent <TotalProvider>"
        );
    }
    return dispatch;
}
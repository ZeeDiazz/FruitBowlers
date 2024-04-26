// Type of state
import {createContext, useContext, useReducer} from "react";

interface BasketState {
    products: Product[];
    isLoading: boolean;
    hasError: boolean;
    totalPrice: number;
    totalQuantity: number;
}

// Initial state
const initialBasketState: BasketState = {
    products: [],
    isLoading: true,
    hasError: false,
    totalPrice: 0,
    totalQuantity: 0,
};

// Type of actions
type BasketAction =
    | { type: 'fetching' }
    | { type: 'quantityChange', payload: { products: Product[] }}
    | { type: 'fetched', payload: { products: Product[] } }
    | { type: 'giveQuantity', payload : { amount: number}}
    | { type: 'givePrice', payload : { amount: number}}
    | { type: 'error', payload: {error: boolean} };


// Reducer
const basketReducer = (state: BasketState, action: BasketAction) => {
    switch(action.type) {
        case 'fetching':
            return {
                ...state,
                isLoading: true,
                hasError: false
            };
        case 'fetched':
            return {
                ...state,
                products: action.payload.products,
                isLoading: false,
                hasError: false
            };
        case 'error':
            return {
                ...state,
                isLoading: false,
                hasError: true
            };
        case 'quantityChange':
            return {
                ...state,
                products: action.payload.products,
            }
        case 'givePrice':
            return {
                ...state,
                totalPrice: action.payload.amount,
            }
        case 'giveQuantity':
            return {
                ...state,
                totalQuantity: action.payload.amount,
            }
        default:
            return state;
    }
}

// State context
const BasketContext = createContext<BasketState | null>(null)

// Dispatch context
const BasketDispatchContext = createContext<React.Dispatch<BasketAction> | null>(null)

// Provider
type BasketProviderProps = React.PropsWithChildren<{state?: BasketState}>
export function BasketProvider({ children, state: explicitState }: BasketProviderProps) {
    const [state, dispatch] = useReducer(basketReducer, explicitState || initialBasketState);

    if (!state) {
        throw new Error("BasketContext: Initial state cannot be null.");
    }
    return (
        <BasketContext.Provider value={state}>
            <BasketDispatchContext.Provider value={dispatch}>
                {children}
            </BasketDispatchContext.Provider>
        </BasketContext.Provider>
    );
}

// state hook
export function useBasketState() {
    const state = useContext(BasketContext);
    if (state === null) {
        throw new Error("Unexpected useBasketState without parent <BasketProvider>");
    }
    return state;
}

// dispatch hook
export function useBasketDispatch() {
    const dispatch = useContext(BasketDispatchContext);
    if (dispatch === null) {
        throw new Error(
            "Unexpected useBasketDispatch without parent <BasketProvider>"
        );
    }
    return dispatch;
}
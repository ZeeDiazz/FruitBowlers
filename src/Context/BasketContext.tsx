// Type of state
import {createContext, useContext, useReducer} from "react";

interface BasketState {
    products: Product[];
    isProductsLoading: boolean;
    productsError: boolean;
}

// Initial state
const initialBasketState: BasketState = {
    products: [],
    isProductsLoading: true,
    productsError: false,
};

// Type of actions
type BasketAction =
    | { type: 'fetchingProduct' }
    | { type: 'fetchedProduct', payload: { products: Product[] } }
    | { type: 'productsError', payload: { failed: boolean} }
    | { type: 'quantityChange', payload: { products: Product[] }}
    | {type: 'upgradeProduct', payload: { upgrade: Product[] } }
;

// Reducer
const basketReducer = (state: BasketState, action: BasketAction) => {
    switch(action.type) {
        case 'fetchingProduct':
            return {
                ...state,
                isProductsLoading: true,
                productsError: false
            };
        case 'fetchedProduct':
            return {
                ...state,
                products: action.payload.products,
                isProductsLoading: false,
                productsError: false
            };
        case 'productsError':
            return {
                ...state,
                isProductsLoading: false,
                productsError: action.payload.failed
            };
        case 'quantityChange':
            return {
                ...state,
                products: action.payload.products,
            }
        case 'upgradeProduct':
            return {
                ...state,
                products: action.payload.upgrade,
                isProductsLoading: false,
                productsError: false
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
    const [state, dispatch] = useReducer(
        basketReducer, explicitState || initialBasketState);

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
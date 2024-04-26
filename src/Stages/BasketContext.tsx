// Type of state
import {createContext, useContext, useReducer} from "react";

interface BasketState {
    products: Product[];
    //upgrades: Product[];
    isProductsLoading: boolean;
    productsError: boolean;
    //isUpgradesLoading: boolean;
    //upgradesError: boolean;
}

// Initial state
const initialBasketState: BasketState = {
    products: [],
    //upgrades: [],
    isProductsLoading: true,
    productsError: false,
    //isUpgradesLoading: true,
    //upgradesError: false
};

// Type of actions
type BasketAction =
    | { type: 'fetchingProduct' }
    | { type: 'fetchedProduct', payload: { products: Product[] } }
    | { type: 'productsError', payload: { failed: boolean} }
    | { type: 'quantityChange', payload: { products: Product[] }}
    //| { type: 'fetchingUpgrade' }
    //| { type: 'fetchedUpgrades', payload: { upgrades: Product[] } }
    //| { type: 'upgradesError', payload: { failed: boolean} }
    //| { type: 'upgrading', payload: { products: Product[]} };
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
       /* case 'fetchingUpgrade':
            return {
                ...state,
                isUpgradesLoading: true,
                productsError: false
            };
        case 'fetchedUpgrades':
            return {
                ...state,
                upgrades: action.payload.upgrades,
                isLoading: false,
                hasError: false,
            }
        case 'upgradesError':
            return {
                ...state,
                isUpgradesLoading: false,
                upgradesError: true,
            }*/
        case 'upgrading':
            return {
                ...state,
                products: action.payload.upgrades
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
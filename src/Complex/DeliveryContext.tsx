// Type of state
import {createContext, useContext, useReducer} from "react";

interface DeliveryState {
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
    phoneNumber: string|undefined;
    zipcode: string|undefined;
    companyVatNumber: string|undefined;
    streetName: string | undefined;
    cityName: string | undefined;
    companyName: string | undefined;
    sendToBilling: boolean | undefined;
}


// Initial state
const deliveryState: DeliveryState = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    zipcode: '',
    companyVatNumber: '',
    streetName: '',
    cityName: '',
    companyName: '',
    sendToBilling: true
};

// Type of actions
type DeliveryAction =
    /*| { type: 'submitForm',
        payload: {
        firstName: string|undefined,
        lastName: string|undefined,
        email: string|undefined,
        phoneNumber: string|undefined,
        zipcode: string|undefined,
        companyVatNumber: string|undefined,
        streetName: string|undefined,
        cityName: string|undefined,
        companyName: string|undefined }
    }*/
    | { type: 'cityNamed'; payload: { cityName: string } }
    | { type: 'firstName'; payload: { firstName: string } }
    | { type: 'lastName'; payload: { lastName: string } }
    | { type: 'email'; payload: { email: string } }
    | { type: 'phoneNumber'; payload: { phoneNumber: string } }
    | { type: 'zipcode'; payload: { zipcode: string } }
    | { type: 'companyVatNumber'; payload: { companyVatNumber: string } }
    | { type: 'streetName'; payload: { streetName: string } }
    | { type: 'companyName'; payload: { companyName: string } }
    | {type: 'sendToBilling'; payload: {sendToBilling:boolean}}
    ;


// Reducer
const deliveryReducer = (state: DeliveryState, action: DeliveryAction) => {
    switch(action.type) {
        /*case 'submitForm':
          return {
              ...state,
              firstName: action.payload.firstName,
              lastName: action.payload.lastName,
              email: action.payload.email,
              phoneNumber: action.payload.phoneNumber,
              zipcode: action.payload.zipcode,
              companyVatNumber: action.payload.companyVatNumber,
              streetName: action.payload.streetName,
              cityName: action.payload.cityName,
              companyName: action.payload.companyName,
          }*/
          case 'cityNamed':
              return {
                  ...state,
                  cityName: action.payload.cityName,
              }
        case 'firstName':
            return {
                ...state,
                firstName: action.payload.firstName,
            }
        case 'lastName':
            return {
                ...state,
                lastName: action.payload.lastName,
            }
        case 'email':
            return {
                ...state,
                email: action.payload.email,
            }
        case 'phoneNumber':
            return {
                ...state,
                phoneNumber: action.payload.phoneNumber,
            };
        case 'zipcode':
            return {
                ...state,
                zipcode: action.payload.zipcode,
            };
        case 'companyVatNumber':
            return {
                ...state,
                companyVatNumber: action.payload.companyVatNumber,
            };
        case 'streetName':
            return {
                ...state,
                streetName: action.payload.streetName,
            };
        case 'companyName':
            return {
                ...state,
                companyName: action.payload.companyName,
            };
        case "sendToBilling":
            return {
                ...state,
                sendToBilling: action.payload.sendToBilling,
            };
        default:
            return state;
    }
}

// State context
const DeliveryContext = createContext<DeliveryState | null>(null)

// Dispatch context
const DeliveryDispatchContext = createContext<React.Dispatch<DeliveryAction> | null>(null)

// Provider
type DeliveryProviderProps = React.PropsWithChildren<{state?: DeliveryState}>
export function DeliveryProvider({ children, state: explicitState }: DeliveryProviderProps) {
    const [state, dispatch] = useReducer(
        deliveryReducer,
        explicitState || deliveryState
    );

    if (!state) {
        throw new Error("DeliveryContext: Initial state cannot be null.");
    }
    return (
        <DeliveryContext.Provider value={state}>
            <DeliveryDispatchContext.Provider value={dispatch}>
                {children}
            </DeliveryDispatchContext.Provider>
        </DeliveryContext.Provider>
    );
}

// state hook
export function useDeliveryState() {
    const state = useContext(DeliveryContext);
    if (state === null) {
        throw new Error("Unexpected useDeliveryState without parent <DeliveryProvider>");
    }
    return state;
}

// dispatch hook
export function useDeliveryDispatch() {
    const dispatch = useContext(DeliveryDispatchContext);
    if (dispatch === null) {
        throw new Error(
            "Unexpected useDeliveryDispatch without parent <DeliveryProvider>"
        );
    }
    return dispatch;
}
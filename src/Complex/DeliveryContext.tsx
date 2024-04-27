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
    firstNameDelivery: string | undefined;
    lastNameDelivery: string | undefined;
    emailDelivery: string | undefined;
    phoneNumberDelivery: string|undefined;
    zipcodeDelivery: string|undefined;
    streetNameDelivery: string | undefined;
    cityNameDelivery: string | undefined;
}

/*interface DeliveryFormState{
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
    phoneNumber: string|undefined;
    zipcode: string|undefined;
    streetName: string | undefined;
    cityName: string | undefined;

}

// Initial state
const deliveryFormState: DeliveryFormState = {
    firstNameDelivery: '',
    lastNameDelivery: '',
    emailDelivery: '',
    phoneNumberDelivery: '',
    zipcodeDelivery: '',
    streetNameDelivery: '',
    cityNameDelivery: '',
};
*/

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
    sendToBilling: true,
    //deliveryForm: deliveryFormState
    firstNameDelivery: '',
    lastNameDelivery: '',
    emailDelivery: '',
    phoneNumberDelivery: '',
    zipcodeDelivery: '',
    streetNameDelivery: '',
    cityNameDelivery: '',
};

// Type of actions
type DeliveryAction =
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
    | { type: 'cityNameDelivery'; payload: { cityName: string } }
    | { type: 'firstNameDelivery'; payload: { firstName: string } }
    | { type: 'lastNameDelivery'; payload: { lastName: string } }
    | { type: 'emailDelivery'; payload: { email: string } }
    | { type: 'phoneNumberDelivery'; payload: { phoneNumber: string } }
    | { type: 'zipcodeDelivery'; payload: { zipcode: string } }
    | { type: 'streetNameDelivery'; payload: { streetName: string } }
    ;


// Reducer
const deliveryReducer = (state: DeliveryState, action: DeliveryAction) => {
    switch(action.type) {
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
        case 'cityNameDelivery':
            return {
                ...state,
                cityNameDelivery: action.payload.cityName,
            };
        case 'firstNameDelivery':
            return {
                ...state,
                firstNameDelivery: action.payload.firstName,
            };
        case 'lastNameDelivery':
            return {
                ...state,
                lastNameDelivery: action.payload.lastName,
            };
        case 'emailDelivery':
            return {
                ...state,
                emailDelivery: action.payload.email,
            };
        case 'phoneNumberDelivery':
            return {
                ...state,
                phoneNumberDelivery: action.payload.phoneNumber,
            };
        case 'zipcodeDelivery':
            return {
                ...state,
                zipcodeDelivery: action.payload.zipcode,
            };
        case 'streetNameDelivery':
            return {
                ...state,
                streetNameDelivery: action.payload.streetName,
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
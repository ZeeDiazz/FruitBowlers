// Type of state
import {createContext, useContext, useReducer} from "react";

interface DeliveryAddress {
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
    phoneNumber: string | undefined;
    zipcode: string | undefined;
    streetName: string | undefined;
    cityName: string | undefined;
}

interface BillingAddress extends DeliveryAddress {
    companyVatNumber: string | undefined;
    companyName: string | undefined;
}

interface DeliveryState {
    billingAddressValues: BillingAddress;
    sendToBilling: boolean | undefined;
    deliveryAddressValues: DeliveryAddress;
}

const deliveryState: DeliveryState = {
    billingAddressValues: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        zipcode: '',
        companyVatNumber: '',
        streetName: '',
        cityName: '',
        companyName: '',
    },
    sendToBilling: true,
    deliveryAddressValues: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        zipcode: '',
        streetName: '',
        cityName: '',
    }
};

// Type of actions
export type DeliveryAction =
    | { type: 'cityName'; payload: { cityName: string } }
    | { type: 'firstName'; payload: { firstName: string } }
    | { type: 'lastName'; payload: { lastName: string } }
    | { type: 'email'; payload: { email: string } }
    | { type: 'phoneNumber'; payload: { phoneNumber: string } }
    | { type: 'zipcode'; payload: { zipcode: string } }
    | { type: 'companyVatNumber'; payload: { companyVatNumber: string } }
    | { type: 'streetName'; payload: { streetName: string } }
    | { type: 'companyName'; payload: { companyName: string } }
    | { type: 'sendToBilling'; payload: { sendToBilling: boolean } }
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
    switch (action.type) {
        case 'cityName':
            return {
                ...state,
                billingAddressValues: {
                    ...state.billingAddressValues,
                    cityName: action.payload.cityName
                },
            }
        case 'firstName':
            return {
                ...state,
                billingAddressValues: {
                    ...state.billingAddressValues,
                    firstName: action.payload.firstName
                },
            }
        case 'lastName':
            return {
                ...state,
                billingAddressValues: {
                    ...state.billingAddressValues,
                    lastName: action.payload.lastName
                },
            }
        case 'email':
            return {
                ...state,
                billingAddressValues: {
                    ...state.billingAddressValues,
                    email: action.payload.email
                },
            }
        case 'phoneNumber':
            return {
                ...state,
                billingAddressValues: {
                    ...state.billingAddressValues,
                    phoneNumber: action.payload.phoneNumber
                },

            };
        case 'zipcode':
            return {
                ...state,
                billingAddressValues: {
                    ...state.billingAddressValues,
                    zipcode: action.payload.zipcode,
                },
            };
        case 'companyVatNumber':
            return {
                ...state,
                billingAddressValues: {
                    ...state.billingAddressValues,
                    companyVatNumber: action.payload.companyVatNumber,
                },
            };
        case 'streetName':
            return {
                ...state,
                billingAddressValues: {
                    ...state.billingAddressValues,
                    streetName: action.payload.streetName,
                },
            };
        case 'companyName':
            return {
                ...state,
                billingAddressValues: {
                    ...state.billingAddressValues,
                    companyName: action.payload.companyName,
                },

            };
        case "sendToBilling":
            return {
                ...state,
                sendToBilling: action.payload.sendToBilling,
            };
        case 'cityNameDelivery':
            return {
                ...state,
                deliveryAddressValues: {
                    ...state.deliveryAddressValues,
                    cityName: action.payload.cityName,
                }
            };
        case 'firstNameDelivery':
            return {
                ...state,
                deliveryAddressValues: {
                    ...state.deliveryAddressValues,
                    firstName: action.payload.firstName,
                }
            };
        case 'lastNameDelivery':
            return {
                ...state,
                deliveryAddressValues: {
                    ...state.deliveryAddressValues,
                    lastName: action.payload.lastName,
                }
            };
        case 'emailDelivery':
            return {
                ...state,
                deliveryAddressValues: {
                    ...state.deliveryAddressValues,
                    email: action.payload.email,
                }
            };
        case 'phoneNumberDelivery':
            return {
                ...state,
                deliveryAddressValues: {
                    ...state.deliveryAddressValues,
                    phoneNumber: action.payload.phoneNumber,
                }
            };
        case 'zipcodeDelivery':
            return {
                ...state,
                deliveryAddressValues: {
                    ...state.deliveryAddressValues,
                    zipcode: action.payload.zipcode,
                }
            };
        case 'streetNameDelivery':
            return {
                ...state,
                deliveryAddressValues: {
                    ...state.deliveryAddressValues,
                   streetName: action.payload.streetName,
                }
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
type DeliveryProviderProps = React.PropsWithChildren<{ state?: DeliveryState }>

export function DeliveryProvider({children, state: explicitState}: DeliveryProviderProps) {
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
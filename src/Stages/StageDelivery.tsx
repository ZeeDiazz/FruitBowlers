import '../assets/Styles/large/StageDelivery.css'
import '../assets/Styles/large/App.css'
import '../assets/Styles/320px/SmallScreen.css'
import '../assets/Styles/320px/SmallScreenDelivery.css'
import '../assets/Styles/default/DefaultStyling.css'
import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {useDeliveryDispatch, useDeliveryState} from "../Context/DeliveryContext.tsx";
import {header} from "../Components/header.tsx";


export function StageDelivery() {
    const {
        billingAddressValues,
        sendToBilling,
        deliveryAddressValues
    } = useDeliveryState();
    const dispatch = useDeliveryDispatch();

    const navigate = useNavigate();
    const [navigating, setNavigating] = useState(true);
    useEffect(() => {
        setNavigating(false);
    }, []);

    const [hasError, setHasError] = useState(false);
    const [hasErrorDelivery, setHasErrorDelivery] = useState(false);

    /* Learned from lecture and https://www.valentinog.com/blog/await-react/*/
    async function validateZipCode(zipcode: string, zipcodeName: string) {
        try {
            const response = await fetch(`https://api.dataforsyningen.dk/postnumre/${zipcode}`);
            if (!response.ok) {
                throw Error(response.statusText);
            }
            const {nr, navn} = await response.json();

            console.log('Valid Zip Code');
            console.log(`Zip Code: ${nr}, City: ${navn}`);

            if (zipcodeName == "zipcodeBilling") {
                dispatch({type: "cityName", payload: {cityName: navn}})
                dispatch({type: "zipcode", payload: {zipcode: zipcode}})
                setHasError(false);
            }
            if (zipcodeName == "zipcodeDelivery") {
                dispatch({type: "cityNameDelivery", payload: {cityName: navn}})
                dispatch({type: "zipcodeDelivery", payload: {zipcode: zipcode}})
                setHasErrorDelivery(false);
            }
            return true;

        } catch (error) {
            console.log('Unvalid Zip Code');
            console.log(error);
            if (zipcodeName == "zipcodeBilling") {
                setHasError(true);
            } else {
                setHasErrorDelivery(true);
            }
            return false;
        }
    }

    function customError() {
        return (<>
                <div id="message">
                    <img src="images/validate.png" alt="exclamtion icon"/>
                    <p id="invalidZip">InvalidZip </p>
                </div>
            </>
        )
    }

    function checkbox(diff: boolean) {
        return (
            <div className="checkboxText">
                <input type="checkbox" name="Delivery Address" value="yes" id="checkbox"
                       defaultChecked={sendToBilling}
                       onChange={() => {
                           dispatch({type: 'sendToBilling', payload: {sendToBilling: !sendToBilling}});
                           console.log(diff);
                       }}
                />
                <span className="checkmark"/>

                <label id="inputBox">
                    Send to billing address
                </label>

            </div>
        );
    }

    function submitButton(checked: boolean | undefined) {
        if (checked) return null;
        return (
            <button className={"NudgeButton"} type="submit">Continue</button>
        )
    }

    function deliveryAddress(diff: boolean) {
        if (diff) {
            return (
                <>
                    <h2 id="title">Delivery address</h2>
                    <div id="inputBox">
                        <input name="firstNameDelivery" type="text" placeholder="First Name"
                               defaultValue={deliveryAddressValues.firstName} onChange={handleInputChange} required/>
                        <br/>
                        <input name="lastNameDelivery" type="text" placeholder="Last Name"
                               defaultValue={deliveryAddressValues.lastName} onChange={handleInputChange} required/>
                        <br/>
                        <input name="emailDelivery" type="email" placeholder="Email"
                               defaultValue={deliveryAddressValues.email}
                               onChange={handleInputChange} required/>
                        <br/>
                        <div className="addressBox">
                            <br/>
                            <input name="country" type="text" value="Danmark" disabled/>
                            <br/>

                            {hasErrorDelivery && customError()}
                            <input name="zipcodeDelivery" pattern="\d*" type="number" placeholder="ZipCode"
                                   defaultValue={deliveryAddressValues.zipcode}
                                   onChange={e => validateZipCode(e.target.value.toString(), "zipcodeDelivery")}
                                   required/>

                            <input name="cityDelivery" placeholder="City" defaultValue={deliveryAddressValues.cityName}
                                   required/>
                            <br/>
                            <input name="streetNameDelivery" type="text" placeholder="Street Name"
                                   defaultValue={deliveryAddressValues.streetName} onChange={handleInputChange}
                                   required/>
                        </div>
                        <br/>
                        <div id="phoneBox">
                            <input name="landcode" placeholder="Landcode" value="+45" disabled/>
                            <input name="telephoneDelivery" type="numbers" pattern='[0-9]{8}' minLength={8}
                                   maxLength={8}
                                   onInvalid={
                                       (event) => {
                                           event.currentTarget.setCustomValidity("Insert a phonenumber with 8 digits");
                                       }
                                   }
                                   placeholder="Telephone" defaultValue={billingAddressValues.phoneNumber}
                                   onChange={handleInputChange} 
                                   required/>
                        </div>
                        {submitButton(!diff)}
                    </div>
                </>
            );
        }
    }

    function updateInputValue(event: React.FormEvent<HTMLInputElement>, fieldName: string) {
        const value = event.currentTarget.value;
        switch (fieldName) {
            case "firstName":
                dispatch({type: 'firstName', payload: {firstName: value}})
                break;
            case "lastName":
                dispatch({type: 'lastName', payload: {lastName: value}})
                break;
            case "email":
                dispatch({type: 'email', payload: {email: value}})
                break;
            case 'telephone':
                dispatch({type: 'phoneNumber', payload: {phoneNumber: value}});
                break;
            case 'telephone2':
                dispatch({type: 'phoneNumber', payload: {phoneNumber: value}});
                break;
            case 'companyVATnumber':
                dispatch({type: 'companyVatNumber', payload: {companyVatNumber: value}});
                break;
            case 'streetName':
                dispatch({type: 'streetName', payload: {streetName: value}});
                break;
            case 'companyName':
                dispatch({type: 'companyName', payload: {companyName: value}});
                break;
            case 'firstNameDelivery':
                dispatch({type: 'firstNameDelivery', payload: {firstName: value}});
                break;
            case "lastNameDelivery":
                dispatch({type: 'lastNameDelivery', payload: {lastName: value}})
                break;
            case "emailDelivery":
                dispatch({type: 'emailDelivery', payload: {email: value}})
                break;
            case 'telephoneDelivery':
                dispatch({type: 'phoneNumberDelivery', payload: {phoneNumber: value}});
                break;
            case 'streetNameDelivery':
                dispatch({type: 'streetNameDelivery', payload: {streetName: value}});
                break;
        }
    }

    const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        updateInputValue(event, event.currentTarget.name);

        event.currentTarget.setCustomValidity('');
    };


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const isValid = await validateForm();
        if (hasError || hasErrorDelivery) {
            alert("Please correct the errors before continuing.");
            return; // Prevent navigation if there are errors.
        }
        if (isValid) {
            navigate('/Payment');
        }
    };

    function validateForm(): Promise<boolean> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, 500); //a bit of delay
        });
    }

    return (
        <div className={`page ${navigating ? "navigating" : "navigated"}`}>
            <header>
                {header()}
            </header>
            <div className={"stageBoxes"}>

                <button onClick={() => navigate('/')} className="previous round">&#8249;</button>
                <div className="title-container">
                    <img
                        src={`/images/stage2-fat.png`}
                        alt="Step 2"
                        className="stageIcons"
                    />
                    <h2>Billing Address</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div id="inputBox">
                        <input name="firstName" pattern="[a-zA-Z]+" type="text" placeholder="First Name"
                               defaultValue={billingAddressValues.firstName} onChange={handleInputChange} required/>
                        <br/>
                        <input name="lastName" type="text" placeholder="Last Name"
                               defaultValue={billingAddressValues.lastName}
                               onChange={handleInputChange} required/>
                        <br/>
                        <input name="email" type="email" placeholder="Email" defaultValue={billingAddressValues.email}
                               onChange={handleInputChange} required/>
                        <br/>

                        <input name="companyName" type="text" placeholder="*(Optional) Company Name"
                               defaultValue={billingAddressValues.companyName} onChange={handleInputChange}/>
                        <input name="companyVATnumber" type="digits" minLength={8} maxLength={8}
                               placeholder="*(Optional) Company VAT"
                               defaultValue={billingAddressValues.companyVatNumber}
                               onChange={handleInputChange}/>
                        <br/>

                        <div className="addressBox">
                            <br/>
                            <input name="country" type="text" value="Danmark" onChange={handleInputChange} disabled/>
                            <br/>

                            {hasError && customError()}
                            <input name="zipcode" pattern="\d*" type="number" placeholder="ZipCode"
                                   defaultValue={billingAddressValues.zipcode}
                                   onChange={e => validateZipCode(e.target.value.toString(), "zipcodeBilling")}/>

                            <input name="city" placeholder="City" defaultValue={billingAddressValues.cityName}
                                   required/>
                            <br/>
                            <input name="streetName" type="text" placeholder="Street Name"
                                   defaultValue={billingAddressValues.streetName}
                                   onChange={handleInputChange} required/>
                        </div>
                        <br/>
                        <div id="phoneBox">
                            <input name="landcode" placeholder="Landcode" value="+45" disabled/>

                            <input name="telephone2" type="numbers" pattern='[0-9]{8}' minLength={8} maxLength={8}
                                   onInvalid={
                                       (event) => {
                                           event.currentTarget.setCustomValidity("Insert a phoneNumber with 8 digits");
                                       }
                                   }
                                   placeholder="Telephone" defaultValue={billingAddressValues.phoneNumber}
                                   onChange={handleInputChange} required/>
                        </div>
                    </div>
                    <div className="continue-container">
                        {checkbox(!sendToBilling)}
                    </div>
                    {submitButton(!sendToBilling)}
                    {deliveryAddress(!sendToBilling)}
                </form>

            </div>
        </div>
    )
}

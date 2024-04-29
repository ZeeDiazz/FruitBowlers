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
        firstName,
        lastName,
        email,
        phoneNumber,
        zipcode,
        companyVatNumber,
        streetName,
        cityName,
        companyName,
        sendToBilling,
        firstNameDelivery,
        lastNameDelivery,
        streetNameDelivery,
        emailDelivery,
        cityNameDelivery,
        phoneNumberDelivery,
        zipcodeDelivery
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
                               defaultValue={firstNameDelivery} onChange={handleInputChange} required/>
                        <br/>
                        <input name="lastNameDelivery" type="text" placeholder="Last Name"
                               defaultValue={lastNameDelivery} onChange={handleInputChange} required/>
                        <br/>
                        <input name="emailDelivery" type="email" placeholder="Email" defaultValue={emailDelivery}
                               onChange={handleInputChange} required/>
                        <br/>
                        <div className="addressBox">
                            <br/>
                            <input name="country" type="text" value="Danmark" disabled/>
                            <br/>

                            {hasErrorDelivery && customError()}
                            <input name="zipcodeDelivery" pattern="\d*" type="number" placeholder="ZipCode"
                                   defaultValue={zipcodeDelivery}
                                   onChange={e => validateZipCode(e.target.value.toString(), "zipcodeDelivery")}
                                   required/>

                            <input name="cityDelivery" placeholder="City" defaultValue={cityNameDelivery} required/>
                            <br/>
                            <input name="streetNameDelivery" type="text" placeholder="Street Name"
                                   defaultValue={streetNameDelivery} onChange={handleInputChange} required/>
                        </div>
                        <br/>
                        <div id="phoneBox">
                            <input name="landcode" placeholder="Landcode" value="+45" disabled/>
                            <input name="telephoneDelivery" type="digits" pattern="\d*"
                                   defaultValue={phoneNumberDelivery}
                                   minLength={8} maxLength={8} placeholder="Telephone" onChange={handleInputChange}
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
    };

    /**/
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const isValid = await validateForm();
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

                <button onClick={() => navigate('/')}>Back to Basket</button>

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
                               defaultValue={firstName} onChange={handleInputChange} required/>
                        <br/>
                        <input name="lastName" type="text" placeholder="Last Name" defaultValue={lastName}
                               onChange={handleInputChange} required/>
                        <br/>
                        <input name="email" type="email" placeholder="Email" defaultValue={email}
                               onChange={handleInputChange} required/>
                        <br/>

                        <input name="companyName" type="text" placeholder="*(Optional) Company Name"
                               defaultValue={companyName} onChange={handleInputChange}/>
                        <input name="companyVATnumber" type="digits" minLength={8} maxLength={8}
                               placeholder="*(Optional) Company VAT" defaultValue={companyVatNumber}
                               onChange={handleInputChange}/>
                        <br/>

                        <div className="addressBox">
                            <br/>
                            <input name="country" type="text" value="Danmark" onChange={handleInputChange} disabled/>
                            <br/>

                            {hasError && customError()}
                            <input name="zipcode" pattern="\d*" type="number" placeholder="ZipCode"
                                   defaultValue={zipcode}
                                   onChange={e => validateZipCode(e.target.value.toString(), "zipcodeBilling")}/>

                            <input name="city" placeholder="City" defaultValue={cityName} required/>
                            <br/>
                            <input name="streetName" type="text" placeholder="Street Name" defaultValue={streetName}
                                   onChange={handleInputChange} required/>
                        </div>
                        <br/>
                        <div id="phoneBox">
                            <input name="landcode" placeholder="Landcode" value="+45" disabled/>

                            <input name="telephone" type="number" pattern="\d*" minLength={8} maxLength={8}
                                   placeholder="Telephone" defaultValue={phoneNumber} onChange={handleInputChange}
                                   required/>
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

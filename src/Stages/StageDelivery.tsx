import '../assets/Styles/large/StageDelivery.css'
import '../assets/Styles/320px/SmallScreen.css'
import {useState} from "react";
import { Link } from 'react-router-dom';
import {useDeliveryDispatch, useDeliveryState} from "../Complex/DeliveryContext.tsx";


export function StageDelivery() {

    const {firstName, lastName, email, phoneNumber,zipcode, companyVatNumber, streetName,cityName,companyName} = useDeliveryState();
    const dispatch = useDeliveryDispatch();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [hasError, setHasError] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    //const [text, setText] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [textDelivery, setTextDelivery] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [hasErrorDelivery, setHasErrorDelivery] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [diff, diffDeliveryAddress] = useState(false);

    /* Learned from lecture and https://www.valentinog.com/blog/await-react/*/
    async function validateZipCode(zipcode: string, zipcodeName: string) {
        try {
            const response = await fetch(`https://api.dataforsyningen.dk/postnumre/${zipcode}`);
            if (!response.ok) {
                throw Error(response.statusText);
            }
            const { nr, navn } = await response.json();

            console.log('Valid Zip Code');
            console.log(`Zip Code: ${nr}, City: ${navn}`);

            if (zipcodeName == "zipcode1") {
                dispatch({type:"cityNamed", payload: {cityName: navn}})
                dispatch({type:"zipcode", payload: {zipcode: zipcode}})
                setHasError(false);
            }
            if (zipcodeName == "zipcode2") {
                setTextDelivery(navn);
                setHasErrorDelivery(false);
            }
            return true;

        } catch (error) {
            console.log('Unvalid Zip Code');
            console.log(error);
            if (zipcodeName == "zipcode1") {
                setHasError(true);
            } else {
                setHasErrorDelivery(true);
            }
            return false;
        }
    }
    /*function handleFormSubmit(event:FormEvent){
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formElements = form.elements as typeof form.elements & {
            firstName: {value: string};
            lastName: {value: string};
            email: {value: string};
            phoneNumber: {value: string};
            companyName: {value: string};
            companyVatNumber: {value: string};
            zipcode: {value: string};
            cityName: {value: string};
            streetName: {value: string};
        };

        dispatch({
            type: 'submitForm',
            payload: {
                firstName: formElements.firstName.value,
                lastName: formElements.lastName.value,
                email: formElements.email.value,
                phoneNumber: formElements.phoneNumber.value,
                companyName: formElements.companyName.value,
                companyVatNumber: formElements.companyVatNumber.value,
                zipcode: formElements.zipcode.value,
                cityName: formElements.cityName.value,
                streetName: formElements.streetName.value,
            }}
        );
    }*/

    function customError(){
        return(<>
            <div id="message">
                <img src="images/validate.png" alt="exclamtion icon"/>
                <p id = "invalidZip">InvalidZip  </p>

            </div>

            </>
            )
    }

    function checkboxes(diffDeliveryAddress: React.Dispatch<React.SetStateAction<boolean>>, diff: boolean) {
        return (
            <div className="checkboxText">
                <input type="checkbox" name="Delivery Address" value="yes" id="checkbox"
                       defaultChecked={true}
                       onChange={() => {
                           diffDeliveryAddress(!diff);
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

    function submitButton(checked: boolean){
        if(checked) {
            return null;
        }
        return (
            <>
                <Link to="/stagepayment">
                    <button id="button">Continue</button>
                </Link>
            </>
        )
    }

    function deliveryAddress(diff: boolean) {
        if (diff) {
            return (
                <>
                    <h2 id="title">Delivery address</h2>

                    <form>
                        <div id="inputBox">
                            <input name="Name" type="text"
                                   placeholder="First Name" required/>
                            <br/>
                            <input name="LastName" type="text" placeholder="Last Name" required/>
                            <br/>
                            <input type="email" name="Email" placeholder="Email" required/>
                            <br/>
                            <div className="addressBox">
                                <br/>
                                <input name="Country" type="text" value="Danmark" disabled/>
                                <br/>

                                {hasErrorDelivery && customError()}
                                <input name="zipcode2" pattern="\d*"type="number" placeholder="ZipCode"
                                       onChange={e => validateZipCode(e.target.value.toString(), "zipcode2")} required/>

                                <input name="City" placeholder="City" defaultValue={textDelivery} required/>
                                <br/>
                                <input name="streetName" type="text" placeholder="Street Name" required/>
                            </div>
                            <br/>
                            <div id="phoneBox">
                                <input name="Landcode" placeholder="Landcode" value="+45" disabled/>
                                <input type="digits" pattern="\d*"name="Telephone"
                                       minLength={8} maxLength={8} placeholder="Telephone" required/>
                            </div>
                            {submitButton(!diff)}
                        </div>
                    </form>
                </>
            );
        }
    }

    function updateInputValue(event: React.FormEvent<HTMLInputElement>, fieldName: string) {
        const value = event.currentTarget.value;
        switch (fieldName){
            case "Name":
                dispatch({ type: 'firstName', payload: { firstName: value } })
                break;
            case "LastName":
                dispatch({ type: 'lastName', payload: { lastName: value } })
                break;
            case "Email":
                dispatch({ type: 'email', payload: { email: value } })
                break;
            case 'Telephone':
                dispatch({ type: 'phoneNumber', payload: { phoneNumber: value } });
                break;
            case 'VATnum':
                dispatch({ type: 'companyVatNumber', payload: { companyVatNumber: value } });
                break;
            case 'streetName':
                dispatch({ type: 'streetName', payload: { streetName: value } });
                break;
            case 'companyName':
                dispatch({ type: 'companyName', payload: { companyName: value } });
                break;
        }

    }

    const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        updateInputValue(event, event.currentTarget.name);
    };

    return (
        <div className={"stageBoxes"}>
            <Link to="/">Back to basket</Link>

            <div className="title-container">
                <img
                    src={`/images/stage2-fat.png`}
                    alt="Step 2"
                    className="stageIcons"
                />
                <h2>Billing Address</h2>
            </div>
            <form >
                <div id="inputBox">
                    <input name="Name" pattern="[a-zA-Z]+" type="text" placeholder="First Name" defaultValue={firstName} onChange={handleInputChange} required/>
                    <br/>
                    <input name="LastName" type="text" placeholder="Last Name" defaultValue={lastName} onChange={handleInputChange} required/>
                    <br/>
                    <input type="email" name="Email" placeholder="Email" defaultValue={email} onChange={handleInputChange} required/>
                    <br/>

                    <input name="companyName" type="text" placeholder="*(Optional) Company Name" defaultValue={companyName} onChange={handleInputChange}/>
                    <input type="digits" name="VATnum" minLength={8} maxLength={8}
                           placeholder="*(Optional) Company VAT" defaultValue={companyVatNumber} onChange={handleInputChange} required/>
                    <br/>
                    <div className="addressBox">
                        <br/>
                        <input name="Country" type="text" value="Danmark" onChange={handleInputChange} disabled/>
                        <br/>

                        {hasError && customError()}
                        <input name="zipcode1" pattern="\d*" type="number" placeholder="ZipCode" defaultValue={zipcode}
                               onChange={e => validateZipCode(e.target.value.toString(), "zipcode1")} />

                        <input name="City" placeholder="City" defaultValue={cityName} onChange={handleInputChange} required/>
                        <br/>
                        <input name="streetName" type="text" placeholder="Street Name" defaultValue={streetName} onChange={handleInputChange} required/>
                    </div>
                    <br/>
                    <div id="phoneBox">
                        <input name="Landcode" placeholder="Landcode" value="+45" disabled/>

                        <input type="number" pattern="\d*" name="Telephone"
                               minLength={8} maxLength={8} placeholder="Telephone" defaultValue={phoneNumber} onChange={handleInputChange} required/>
                    </div>
                    {submitButton(diff)}
                </div>
            </form>

            <div className="continue-container">
                {checkboxes(diffDeliveryAddress, diff)}

            </div>
            {deliveryAddress(diff)}

        </div>
    )
}

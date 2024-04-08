import '../assets/Styles/large/StageDelivery.css'
import '../assets/Styles/320px/SmallScreen.css'
import '../assets/Styles/default/DefaultStyling.css'
import React, {FormEvent, useState} from "react";

interface StageDeliveryProps {
    setCompanyVATNumber: React.Dispatch<React.SetStateAction<string>>
    companyVATNumber: string,
    setFirstName: React.Dispatch<React.SetStateAction<string>>
    firstName: string,
    setLastName: React.Dispatch<React.SetStateAction<string>>
    lastName: string,
    setEmail: React.Dispatch<React.SetStateAction<string>>
    email: string,
    setZipcode: React.Dispatch<React.SetStateAction<string>>
    zipcode: string,
    setStreetName: React.Dispatch<React.SetStateAction<string>>
    streetName: string,
    setTelefoneNumber: React.Dispatch<React.SetStateAction<string>>
    telefoneNumber: string,
    setCityName: React.Dispatch<React.SetStateAction<string>>
    cityName: string,
    setCompanyName: React.Dispatch<React.SetStateAction<string>>
    companyName: string,
    // setCompanyVAT: (companyVAT: string) => void;
}
// vi skal tilføje state til vores form
export function StageDelivery(stageDeliveryProps: StageDeliveryProps) {

    const companyVATNumber = stageDeliveryProps.companyVATNumber;
    const setCompanyVATNumber = stageDeliveryProps.setCompanyVATNumber;
    const firstName = stageDeliveryProps.firstName;
    const setFirstName = stageDeliveryProps.setFirstName;
    const lastName = stageDeliveryProps.lastName;
    const setLastName = stageDeliveryProps.setLastName;
    const email = stageDeliveryProps.email;
    const setEmail = stageDeliveryProps.setEmail;
    const zipcode = stageDeliveryProps.zipcode;
    const setZipcode = stageDeliveryProps.setZipcode;
    const streetName = stageDeliveryProps.streetName;
    const setStreetName = stageDeliveryProps.setStreetName;
    const telefoneNumber = stageDeliveryProps.telefoneNumber;
    const setTelefoneNumber = stageDeliveryProps.setTelefoneNumber;
    const cityName = stageDeliveryProps.cityName;
    const setCityName = stageDeliveryProps.setCityName;
    const companyName = stageDeliveryProps.companyName;
    const setCompanyName = stageDeliveryProps.setCompanyName;

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
                setCityName(navn);
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

    function subbmitButton(checked: boolean){
        if(!checked){
            return(
                <>
                    <input type="submit" value="Continue To Payment" id="button" onClick={ServerCall}/>
                </>
                )
        }


    }

    function deliveryAddress(diff: boolean) {
        if (diff) {
            return (
                <>
                    <h2 id="title">Delivery address</h2>
                    <form method="post">
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
                                       onBlur={e => validateZipCode(e.target.value.toString(), "zipcode2")} required/>

                                <input name="City" placeholder="City" value={textDelivery} required/>
                                <br/>
                                <input name="streetName" type="text" placeholder="Street Name" required/>
                            </div>
                            <br/>
                            <div id="phoneBox">
                                <input name="Landcode" placeholder="Landcode" value="+45" disabled/>
                                <input type="digits" pattern="\d*"name="Telephone"
                                       minLength={8} maxLength={8} placeholder="Telephone" required/>
                            </div>
                            <input type="submit" value="Continue To Payment" id="button"/>

                        </div>
                    </form>
                </>
            );
        }
    }
    function updateCompanyVAT(event: React.FormEvent<HTMLInputElement>) {
        const VATNumber = event.currentTarget.value;
        setCompanyVATNumber(VATNumber)
    }
    function updateFirstName(event: React.FormEvent<HTMLInputElement>) {
        const firstName = event.currentTarget.value;
        setFirstName(firstName)
    }
    function updateLastName(event: React.FormEvent<HTMLInputElement>) {
        const lastName = event.currentTarget.value;
        setLastName(lastName)
    }
    function updateEmail(event: React.FormEvent<HTMLInputElement>) {
        const email = event.currentTarget.value;
        setEmail(email)
    }
    function updateZipcode(event: React.FormEvent<HTMLInputElement>) {
        const zipeCode = event.currentTarget.value;
        setZipcode(zipeCode)
    }
    function updateStreetName(event: React.FormEvent<HTMLInputElement>) {
        const streetName = event.currentTarget.value;
        setStreetName(streetName)
    }
    function updateTelefoneNumber(event: React.FormEvent<HTMLInputElement>) {
        const telefoneNumber = event.currentTarget.value;
        setTelefoneNumber(telefoneNumber)
    }
    function updateCityName(event: React.FormEvent<HTMLInputElement>) {
        const cityName = event.currentTarget.value;
        setCityName(cityName)
    }
    function updateCompanyName(event: React.FormEvent<HTMLInputElement>) {
        const companyName = event.currentTarget.value;
        setCompanyName(companyName)
    }
    async function ServerCall (e: FormEvent){
        e.preventDefault()
        const logUrl = 'https://eohuzfa0giiahrs.m.pipedream.net';
        const logResponse = await fetch(logUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            
            body: JSON.stringify({firstName, lastName, email, streetName})
        });
        if(!logResponse.status == true){
            console.error("Failed to log search", logResponse.statusText)
        }
    }

    return (
        <div className={"stageBoxes"}>
            <div className="title-container">
                <img
                    src={`/images/stage2-fat.png`}
                    alt="Step 2"
                    className="stageIcons"
                />
                <h2>Billing Address</h2>
            </div>
            <form method="post">
                <div id="inputBox">
                    <input name="Name" type="text" placeholder="First Name" value={firstName} onChange={updateFirstName} required/>
            
                    <br/>
                    <input name="LastName" type="text" placeholder="Last Name" value={lastName} onChange={updateLastName} required/>
                    <br/>
                    <input type="email" name="Email" placeholder="Email" value={email} onChange={updateEmail} required/>
                    <br/>

                    <input name="companyName" type="text" placeholder="*(Optional) Company Name" value={companyName} onChange={updateCompanyName}/>
                    <input type="digits" name="VATnum" minLength={8} maxLength={8} value={companyVATNumber} onChange={updateCompanyVAT}
                           placeholder="*(Optional) Company VAT"/>
                    <br/>
                    <div className="addressBox">
                        <br/>
                        <input name="Country" type="text" value="Danmark" disabled/>
                        <br/>

                        {hasError && customError()}
                        <input name="zipcode1" pattern="\d*" type="number" placeholder="ZipCode" value={zipcode} onChange={updateZipcode}
                               onBlur={e => validateZipCode(e.target.value.toString(), "zipcode1")} required/>

                        <input name="City" placeholder="City" value={cityName} onChange={updateCityName} required/>
                        <br/>
                        <input name="streetName" type="text" placeholder="Street Name" value={streetName} onChange={updateStreetName} required/>
                    </div>
                    <br/>
                    <div id="phoneBox">
                        <input name="Landcode" placeholder="Landcode" value="+45" disabled/>

                        <input type="number" pattern="\d*" name="Telephone"
                               minLength={8} maxLength={8} placeholder="Telephone" value={telefoneNumber} onChange={updateTelefoneNumber} required/>
                    </div>
                    {subbmitButton(diff)}
                </div>
            </form>
            <div className="continue-container">
                {checkboxes(diffDeliveryAddress, diff)}
            </div>
            {deliveryAddress(diff)}
        </div>
    )
}

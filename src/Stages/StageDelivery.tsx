import '../assets/Styles/large/StageDelivery.css'
import '../assets/Styles/320px/SmallScreen.css'
import {FormEvent, useContext, useState} from "react";
import { Link } from 'react-router-dom';
import { DataContext } from '../App';


export function StageDelivery() {
    if(useContext(DataContext).forms === null){
        throw new Error("Unexpected useMyState without parent");
    }
    const form = useContext(DataContext).forms;
    /*const {firstName, lastName, email, phoneNumber,zipcode, companyVatNumber, streetName,cityName,companyName} = useDeliveryState();
    const dispatch = useDeliveryDispatch();*/

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [hasError, setHasError] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [text, setText] = useState('');
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
                setText(navn);
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
    function handleFormSubmit(event:FormEvent<HTMLFormElement>):void {
        event.preventDefault();
        const formData:FormData = new FormData(event.currentTarget);

        form.Name = formData.get("Name")?.toString()||"tom";
        form.LastName = formData.get("LastName")?.toString()|| "tom";
        form.Email = formData.get("Email")?.toString()|| "tom";
        form.companyName = formData.get("companyName")?.toString() || "tom";
        form.VATnum = formData.get("VATnum")?.toString() || "tom";
        form.zipcode1 = parseInt(formData.get("zipcode1")?.toString() || formData.get("zipcode2")?.toString() || '');
        form.City = formData.get("City")?.toString()|| "tom";
        form.streetName = formData.get("streetName")?.toString()|| "tom";

        console.log(form.Email)
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

    function submitButton(checked: boolean){
        if(!checked) {
            return (
                <>
                    <Link to="/stagepayment" type="submit">
                        <button id="button" type="submit">Continue</button>
                    </Link>
                </>
            )
        }
    }

    function deliveryAddress(diff: boolean) {
        if (diff) {
            return (
                <>
                    <h2 id="title">Delivery address</h2>

                    <form onSubmit={handleFormSubmit}>
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
            <form onSubmit={handleFormSubmit}>
                <div id="inputBox">
                    <input name="Name" type="text" placeholder="First Name" required/>
                    <br/>
                    <input name="LastName" type="text" placeholder="Last Name" required/>
                    <br/>
                    <input type="email" name="Email" placeholder="Email" required/>
                    <br/>

                    <input name="companyName" type="text" placeholder="*(Optional) Company Name"/>
                    <input type="digits" name="VATnum" minLength={8} maxLength={8}
                           placeholder="*(Optional) Company VAT"/>
                    <br/>
                    <div className="addressBox">
                        <br/>
                        <input name="Country" type="text" value="Danmark" disabled/>
                        <br/>

                        {hasError && customError()}
                        <input name="zipcode1" pattern="\d*" type="number" placeholder="ZipCode"
                               onChange={e => validateZipCode(e.target.value.toString(), "zipcode1")} />

                        <input name="City" placeholder="City" defaultValue={text} required/>
                        <br/>
                        <input name="streetName" type="text" placeholder="Street Name" required/>
                    </div>
                    <br/>
                    <div id="phoneBox">
                        <input name="Landcode" placeholder="Landcode" value="+45" disabled/>

                        <input type="number" pattern="\d*" name="Telephone"
                               minLength={8} maxLength={8} placeholder="Telephone" required/>
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

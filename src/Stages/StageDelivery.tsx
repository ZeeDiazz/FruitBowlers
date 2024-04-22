import '../assets/Styles/large/StageDelivery.css'
import '../assets/Styles/320px/SmallScreen.css'
import {useState} from "react";
import { useNavigate } from 'react-router-dom';


import { input } from '@testing-library/user-event/dist/cjs/event/input.js';


interface formInterface {
    Name: string;
    LastName: string;
    Email: string;
    companyName?: string;
    VATnum?: string;
    zipcode1: number;
    City: string;
    streetName: string;
    Telephone: number;
}
interface StageDeliveryProps {
    form: formInterface;
}
export function StageDelivery(props: StageDeliveryProps) {
    const navigate = useNavigate();







    const [toPayment, setToPayment] = useState(false);


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
    function handleFormSubmit(event: any) {
        event.preventDefault();
        const formData = new FormData(event.target);

        props.form.Name = formData.get("Name").toString();
        props.form.LastName = formData.get("LastName").toString();
        props.form.Email = formData.get("Email").toString();
        props.form.companyName = formData.get("companyName")?.toString() || "tom" ;
        props.form.VATnum = formData.get("VATnum")?.toString()  || "tom" ;
        props.form.zipcode1 = parseInt(formData.get("zipcode1")?.toString() || formData.get("zipcode2")?.toString() || '');
        props.form.City = formData.get("City").toString();
        props.form.streetName = formData.get("streetName").toString();
        props.form.Telephone = parseInt(formData.get("Telephone").toString());

        // Access form properties
        console.log(props.form.Name);
        console.log(props.form.zipcode1);

        navigate(1)



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
                <><>
                </><input type="submit" value="Continue To Payment" id="button" /></>
                )
        }
    }

    function deliveryAddress(diff: boolean) {
        if (diff) {
            return (
                <>
                    <h2 id="title">Delivery address</h2>
                    <form method="post" onSubmit={handleFormSubmit}>
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
                            {subbmitButton(!diff)}
                        </div>
                    </form>
                </>
            );
        }
    }
    function updateCompanyVAT(event: React.FormEvent<HTMLInputElement>) {
        const VATNumber = event.currentTarget.value;
        //setCompanyVATNumber(VATNumber)
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
            <form method="post" onSubmit={handleFormSubmit}>
                <div id="inputBox">
                    <input name="Name" type="text" placeholder="First Name" required/>
                    <br/>
                    <input name="LastName" type="text" placeholder="Last Name" required/>
                    <br/>
                    <input type="email" name="Email" placeholder="Email" required/>
                    <br/>

                    <input name="companyName" type="text" placeholder="*(Optional) Company Name"/>
                    <input type="digits" name="VATnum" minLength={8} maxLength={8}  onChange={updateCompanyVAT}
                           placeholder="*(Optional) Company VAT"/>
                    <br/>
                    <div className="addressBox">
                        <br/>
                        <input name="Country" type="text" value="Danmark" disabled/>
                        <br/>

                        {hasError && customError()}
                        <input name="zipcode1" pattern="\d*" type="number" placeholder="ZipCode"
                               onChange={e => validateZipCode(e.target.value.toString(), "zipcode1")} required disabled={toPayment}/>

                        <input name="City" placeholder="City" value={text} required/>
                        <br/>
                        <input name="streetName" type="text" placeholder="Street Name" required/>
                    </div>
                    <br/>
                    <div id="phoneBox">
                        <input name="Landcode" placeholder="Landcode" value="+45" disabled/>

                        <input type="number" pattern="\d*" name="Telephone"
                               minLength={8} maxLength={8} placeholder="Telephone" required/>
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

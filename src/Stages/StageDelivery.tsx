import '../assets/Styles/default/StageDelivery.css'
import {useState} from "react";

export function stageDelivery() {
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
            const {nr, navn} = await response.json();

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

    function checkboxes(diffDeliveryAddress:any, diff: boolean) {
        return (
            <>
                <label className="container" id="checkboxmargin">Send to billing address
                    <input type="checkbox" name="Delivery Address" value="yes" className="container" id="checkbox"
                           defaultChecked={true}
                           onChange={() => {
                               diffDeliveryAddress(!diff);
                               console.log(diff)
                           }}
                    />
                    <span className="checkmark"/>
                </label>

                {devliveryAdress(diff)}

            </>
        )
    }

    function devliveryAdress(diff: boolean) {
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

                                {hasErrorDelivery && <p id="invalidZip">*Invalid Zipcode</p>}
                                <input name="zipcode2" type="digits" placeholder="ZipCode"
                                       onChange={e => validateZipCode(e.target.value.toString(), "zipcode2")} required/>

                                <input name="City" placeholder="City" value={textDelivery} required/>
                                <br/>
                                <input name="streetName" type="text" placeholder="Street Name" required/>
                            </div>
                            <br/>
                            <div id="phoneBox">
                                <input name="Landcode" placeholder="Landcode" value="+45" disabled/>
                                <input type="digits" name="Telephone"
                                       minLength={8} maxLength={8} placeholder="Telephone" required/>
                            </div>
                            <input type="submit" value="Continue To Payment" id="button"/>

                        </div>
                    </form>
                </>
            );
        }
    }

    return (
        <>
            <div className="title-container">
                <img
                    src={`/images/stage2-fat.png`}
                    alt="Step 2"
                    className="stage2"
                />
                <h2>Billing Address</h2>
            </div>
            <form method="post">
                <div id="inputBox">
                    <input name="Name" type="text" placeholder="First Name" required/>
                    <br/>
                    <input name="LastName" type="text" placeholder="Last Name" required/>
                    <br/>
                    <input type="email" name="Email" placeholder="Email" required/>
                    <br/>

                    <input name="companyName" type="text" placeholder="*(Optional) Company Name"/>
                    <input type="digits" name="VATnum" minLength={8} maxLength={8} placeholder="*(Optional) Company VAT"/>
                    <br/>
                    <div className="addressBox">
                        <br/>
                        <input name="Country" type="text" value="Danmark" disabled/>
                        <br/>

                        {hasError && <p id="invalidZip">*Invalid Zipcode</p>}
                        <input name="zipcode1" type="digits" placeholder="ZipCode"
                               onChange={e => validateZipCode(e.target.value.toString(), "zipcode1")} required/>

                        <input name="City" placeholder="City" value={text} required/>
                        <br/>
                        <input name="streetName" type="text" placeholder="Street Name" required/>
                    </div>
                    <br/>
                    <div id="phoneBox">
                        <input name="Landcode" placeholder="Landcode" value="+45" disabled/>
                        <input type="digits" name="Telephone"
                               minLength={8} maxLength={8} placeholder="Telephone" required/>
                    </div>
                    <input type="submit" value="Continue To Payment" id="button"/>
                    {
                        checkboxes(diffDeliveryAddress, diff)
                    }
                </div>
            </form>

        </>
    )
}

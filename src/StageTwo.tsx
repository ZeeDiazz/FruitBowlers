import './StageTwo.css'
import { useState} from "react";

export default function stage2() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    //const zipCodeRef = useRef(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    //const [validZip, setValidZip] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [hasError, setHasError] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [text, setText] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [diff,diffDeliveryAddress] = useState(false);
    async function handleSubmit(e) {
        try {
            let isValid = true;
            e.preventDefault();
            const form = e.target;

            const formData = new FormData(form);
            const zipCode = formData.get('Zipcode').toString();

            //const zipCodeInput = zipCodeRef.current;

            isValid = await validateZipCode(zipCode);
            //setValidZip(isValid);
            setHasError(!isValid);
            //ifstatement is 1 behind
            /*if(hasError){
                form.reset();
            }*/
        } catch (error) {
            // Handle any errors here
        }
    }
    /* Learned from lecture and https://www.valentinog.com/blog/await-react/*/
    async function validateZipCode(zipcode:string) {
        try {
            const response = await fetch(`https://api.dataforsyningen.dk/postnumre/${zipcode}`);
            if (!response.ok ) {
                throw Error(response.statusText);
            }
            const { nr, navn } = await response.json();

            console.log('Valid Zip Code');
            console.log(`Zip Code: ${nr}, City: ${navn}`);
            //setValidZip(true);
            setText(navn);
            return true;
        } catch (error) {
            console.log('Unvalid Zip Code');
            console.log(error);
            //setValidZip(false);
            setText();
            return false;
        }
    }

    return (
        <>
            <div className="title-container">
                {/*need to add a new pic for step 2*/}
                <img
                    src={`/images/stage1.png`}
                    alt="Step 2"
                    className="stage2"
                />
                <h2>Address</h2>
            </div>
            <form method="post" onSubmit={handleSubmit}>
                <div id="inputBox">
                    <input name="Name" type="text"
                           placeholder="First Name"  autoFocus required/>
                    <br/>
                    <input name="LastName" type="text" placeholder="Last Name" required/>
                    <br/>
                    <input type="email" name="Email" placeholder="Email" required/>
                    <br/>
                    <div className="addressBox">
                        <br/>
                        <input name="Country" type="text" value="Danmark" disabled/>
                        <br/>
                        {hasError && <p id="invalidZip">*Invalid Zipcode</p>}
                        <input name="Zipcode" type="number" placeholder="ZipCode" onChange={e => validateZipCode(e.target.value.toString())} required/>

                        {/*<input name="Zipcode" type="number" placeholder="ZipCode"
                            ref={zipCodeRef} required
                        />*/}
                        <input name="City" placeholder="City" value={text} required/>
                        <br/>
                        <input name="streetName" type="text" placeholder="Street Name" required/>

                    </div>
                    <br/>
                    <div id="phoneBox">
                    <input name="Landcode" placeholder="Landcode" value="+45" disabled/>
                        <input type="number" name="Telephone" placeholder="Telephone" required/>
                    </div>
                    <input type="submit" value="Continue To Payment" id="button"/>
                </div>
            </form>
            {
                checkboxes(diffDeliveryAddress,diff)
            }
        </>
    )
}

function checkboxes(diffDeliveryAddress,diff:boolean) {
    return (
        <>
            <input type="checkbox" name="Delivery Address" value="yes"  defaultChecked={true}
            onChange={() => {
                    diffDeliveryAddress(!diff);
                console.log(diff)
            }}
            />
            <br/>
            <p>Send to billing address</p>

            {devliveryAdress(diff)}

        </>
    )
}
function devliveryAdress(diff:boolean) {
    if(diff){
    return (
        <>
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
                        <input name="Zipcode" type="number" placeholder="ZipCode" required/>
                        <input name="City" placeholder="City" required/>
                        <br/>
                        <input name="streetName" type="text" placeholder="Street Name" required/>
                    </div>
                    <br/>
                    <div id="phoneBox">
                        <input name="Landcode" placeholder="Landcode" required/>
                        <input type="tel" name="Telephone" placeholder="Telephone" required/>
                    </div>
                    <input type="submit" value="Continue To Payment" id="button"/>

                </div>
            </form>
        </>
    )}

}

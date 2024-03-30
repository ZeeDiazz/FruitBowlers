import React, { useState} from "react";
import '../assets/Styles/large/StageBasket.css'
import '../assets/Styles/default/DefaultStyling.css'
import '../assets/Styles/320px/SmallScreen.css'
import '../Stages/StageTotal.tsx'
//import { getTotalPriceDiscounted, getTotalQuantity} from '../Components/price.ts'

import giftCardsData from '../../giftCards.json';

function GiftCardHandler () {
    console.log(giftCardsData)
}
interface ChoosePaymentProps {
    isInvoiceEnabled : boolean;
}
function ChoosePayment (choosePaymentProps : ChoosePaymentProps) {
    console.log(choosePaymentProps)
    //CardInput
    const [showCardInputs, setShowCardInputs] = useState(false);
    //GiftCardInput
    const [showGiftCardInputs, setShowGiftCardInputs] = useState(false);
    //Invoice
    const [showInvoiceInputs, setShowInvoiceInputs] = useState(false);
    //redeem giftCard button click:
    const [clicked, setClicked] = useState(false);

    const handleGiftCardRedeemClick = () => {
        if (clicked) {
            setClicked(true);
            GiftCardHandler(); // Call GiftCardHandler if button is clicked
        }
    }

    const handlePaymentMethodChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        const selectedPaymentMethod = event.target.value;

        if (selectedPaymentMethod === 'giftCard') {
            setShowGiftCardInputs(true);
            setShowCardInputs(false);
            setShowInvoiceInputs(false);

        } else if (selectedPaymentMethod === 'card') {
            setShowCardInputs(true)
            setShowGiftCardInputs(false);
            setShowInvoiceInputs(false)
        } else if (selectedPaymentMethod === 'invoice') {
            setShowCardInputs(false)
            setShowGiftCardInputs(false);
            setShowInvoiceInputs(true)
        }else {
            setShowGiftCardInputs(false);
            setShowCardInputs(false);
            setShowInvoiceInputs(false)
        }
    };
    //Handle PayNowClick
    {/*const handlePayNowClick = (event : React.ChangeEvent<HTMLInputElement>) => {
        const onclick(event) {
            //Check if a payment method is chosen and if basket and delivery are okay.
        }
    }
    */}

    return (
        <div className="stageBoxes">
            <div className="title-container">
                <img
                    src={`/images/stage1-fat.png`}
                    alt="Step 1"
                    className="stageIcons"
                />
                <h2>Payment</h2>
            </div>

            <nav className={"PaymentOptionsBox"}>

                <div className={"CheckBoxWithDescription"}>
                    <input
                        type="checkbox"
                        name="AcceptTerms"
                        //onChange={acceptedTerms}
                    />
                    <p><a href={""}>Accept terms</a> & <a href={""}>conditions</a></p>
                </div>
                <div className={"CheckBoxWithDescription"}>
                    <input
                        type="checkbox"
                        name="MarketingNudge"
                        //onChange={acceptedTerms}
                    />
                    <p>Receive marketing emails</p>
                </div>

                <div className="PaymentTypeOuterBox">
                    <label className={"PaymentTypeBox"}>
                        <div className={"PaymentText"}>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="card"
                                onChange={handlePaymentMethodChange}
                            />
                            <p>Card </p>
                        </div>
                        <div className={"PaymentIcons"}>
                            <img style={{}} alt={"Card payment option - Visa"}
                                 src={"../../images/Payment icons/Visa_Brandmark_RGB_2021_PNG/Visa_Brandmark_Blue_RGB_2021.png"}/><img/>
                            <img style={{}} alt={"Card payment option - Mastercard"}
                                 src={"../../images/Payment icons/Dankort logo/DK_Logo_CMYK.png"}/><img/>
                        </div>
                    </label>
                    {showCardInputs && (
                        <div className={"PaymentInputs"}>
                            <input
                                type={"text"}
                                placeholder={"Card number (1234 5678 9012 3456)"}
                            />
                            <div className={"SubInputs"}>
                                <input
                                    type={"text"}
                                    placeholder={"MM/YYYY"}
                                />
                                <input
                                    type={"password"}
                                    placeholder={"Security code"}
                                />
                            </div>
                            <input
                                type={"text"}
                                placeholder={"Card holders name"}
                            />
                        </div>
                    )}
                </div>
                {/*
                <label className="PaymentTypeBox">
                    <div className={"PaymentText"}>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="mobilePay"
                            onChange={handlePaymentMethodChange}
                        />
                        <p>MobilePay </p>
                    </div>
                    <img
                        className={"mobilePayImg"}
                        alt="Payment option - MobilePay"
                        src="../../images/Payment icons/MobilePayPNG/MP_RGB_NoTM_Logo+Type Horisontal Blue.png"
                    />
                </label>
                */}

                <div className="PaymentTypeOuterBox">
                    <label className={"PaymentTypeBox"}>
                        <div className={"PaymentText"}>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="giftCard"
                                onChange={handlePaymentMethodChange}
                            />
                            <p>Gift card </p>
                        </div>
                        <div className={"PaymentIcons"}>
                            <img
                                className="PaymentIcons"
                                style={{height: '30px'}}
                                alt="Payment option - Gift card"
                                src="../../images/Payment icons/GiftCard.png"
                            />
                        </div>
                    </label>

                    {showGiftCardInputs && (
                        <div className={"PaymentInputs"}>
                            <input
                                type={"text"}
                                placeholder={"Gift card number"}
                            />
                            <input
                                type={"password"}
                                placeholder={"Security pin"}
                            />
                            <button
                                onClick={handleGiftCardRedeemClick}>
                                Redeem
                            </button>

                        </div>
                    )}

                </div>

                {/*//Only show invoice choice if billing address has company VAT number */}

                <div className="PaymentTypeOuterBox">
                    <label className={"PaymentTypeBox"}>
                        <div className={"PaymentText"}>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="invoice"
                                onChange={handlePaymentMethodChange}
                            />
                            <p>Invoice </p>
                        </div>
                    </label>
                    {showInvoiceInputs && (
                        <div className={"PaymentInputs"}>
                            <input
                                type={"text"}
                                placeholder={"Card number (1234 5678 9012 3456)"}
                            />
                            <div className={"SubInputs"}>
                                <input
                                    type={"text"}
                                    placeholder={"MM/YYYY"}
                                />
                                <input
                                    type={"password"}
                                    placeholder={"Security code"}
                                />
                            </div>
                            <input
                                type={"text"}
                                placeholder={"Card holders name"}
                            />
                        </div>
                    )}
                </div>
                <textarea
                    className={"CommentBox"}
                    placeholder={"Comment for the order"}>

                </textarea>

                <button className={"NudgeButton"}>Pay now</button>
            </nav>
        </div>
    );
}

{/*
//has to be inside main function
//Can be used for giftCards maybe? const [isLoading, setIsLoading] = useState(false)
async function TestCallServer (e: FormEvent){
    e.preventDefault()
    const form = e.target as HTMLFormElement;
    const formElements = form.elements as typeof form.elements & {
        PaymentSuccessFull : HTMLInputElement;
        Products : HTMLInputElement;
        Products.quantity : HTMLInputElement;
        Comment : HTMLInputElement;
        Receive marketing emails check

        //Should address be in a separate post?
    }
};
*/}

{/*
- OPTIONAL: Let user enter payment details
  - Choose between MobilePay, gift card and invoice
  - For gift card
    - user must enter amount, validate as number
    - user must enter gift card number, validate as number
    - if amount is larger than total amount, neither MobilePay nor invoice is available
  - For MobilePay, user must enter a phone number, validate as 8 digits
  - Invoice is only available, if billing address has company VAT number
- Let user submit their order
  - Let user accept terms & conditions
  - Let user accept to receive marketing emails
  - Let user enter an optional order comment
  - Either (1) create an end-point on requestbin.com
  - Submit all relevant information to the end-point
  - Include loading indicator and error reporting
- Fetch data instead of using local JSON copies
  - Product data: https://raw.githubusercontent.com/larsthorup/checkout-data/main/product-v2.json
  - DK zip codes: https://api.dataforsyningen.dk/postnumre
  - Include loading indicators and error reporting
*/}

export default ChoosePayment;

// request bin url: https://eohuzfa0giiahrs.m.pipedream.net
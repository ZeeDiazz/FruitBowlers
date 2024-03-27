//need: A button which checks if: different requirements are met:
// - Delivery address.
// - That the basket is not empty.
//Has to get access to:
// - Total price.

//delivery requirements:
/* OPTIONAL: Let user enter payment details
* Choose between MobilePay, gift card and invoice
* For gift card
* user must enter amount, validate as number
* user must enter gift card number, validate as number
* if amount is larger than total amount, neither MobilePay nor invoice is available
* For MobilePay, user must enter a phone number, validate as 8 digits
* Invoice is only available, if billing address has company VAT number
* */
// import { BasketOkForCheckout } from './StageBasket.tsx';
// import { AddressOkForCheckout } from './StageDelivery.tsx';
import { useState } from 'react';

import {OpenCardPopup, OpenGiftCardPopup, OpenInvoicePopup, OpenMobilePayPopup} from "../Components/PaymentsTypes.tsx";
import '../assets/Styles/default/StageBasket.css'
import '../assets/Styles/large/App.css'
import '../assets/Styles/default/DefaultStyling.css'

//Temporary default true functions
const AddressOkForCheckout: boolean = true;
const BasketOkForCheckout: boolean = true;

function AccessPayment () {
    const PaymentAccessOK: boolean = AddressOkForCheckout && BasketOkForCheckout;
    const [paymentMethod, setSelectedPaymentMethod] = useState('');
    const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPaymentMethod(event.target.value);
    };
    const handleButtonClick = () => {
        if (!paymentMethod) {
            alert('Please select a payment method!');
        } else if (!PaymentAccessOK) {
            alert('Please fill the required infomation!');
        } else {
            callPaymentPopup();
        }
    };
    const callPaymentPopup = () => {
        switch (paymentMethod) {
            case 'card':
                <OpenCardPopup />
                break;
            case 'mobilePay':
                <OpenMobilePayPopup />;
                break;
            case 'giftCard':
                <OpenGiftCardPopup />;
                break;
            case 'invoice':
                <OpenInvoicePopup />;
                break;
        }
    };

    return (
        <div id="ChoosePaymentBox">
            <div className="title-container">
                <img
                    src={`/images/stage1-fat.png`}
                    alt="Step 1"
                    className="stageIcons"
                />
                <h2>Payment</h2>
            </div>

            <label style={{display: 'block', marginBottom: '10px'}}>
                <input type="radio" name="paymentMethod" value="card" onChange={handlePaymentMethodChange}/> Card
                <input type="radio" name="paymentMethod" value="mobilePay"
                       onChange={handlePaymentMethodChange}/> MobilePay
                <input type="radio" name="paymentMethod" value="giftCard" onChange={handlePaymentMethodChange}/> Gift
                card
                <input type="radio" name="paymentMethod" value="invoice" onChange={handlePaymentMethodChange}/> Invoice
                <button id="upgradeButton" onClick={handleButtonClick}>Pay now</button>
            </label>
        </div>
    );
}

export default AccessPayment;


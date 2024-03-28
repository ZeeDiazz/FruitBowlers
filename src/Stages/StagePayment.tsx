
import { useState } from 'react';

import {OpenCardPopUp} from "../Components/PaymentsTypes.tsx";

import '../assets/Styles/large/StageBasket.css'
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
            alert('Please fill the required information!');
        } else {
            callPaymentPopup();
        }
    };
    const callPaymentPopup = () => {
        switch (paymentMethod) {
            case 'card':
                OpenCardPopUp();
                break;
            case 'mobilePay':

                break;
            case 'giftCard':

                break;
            case 'invoice':

                break;
        }
    };

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
                <label className="PaymentTypeBox">
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
                        <img style={{ height: '20px'}} alt={"Card payment option - Visa"}
                             src={"../../images/Payment icons/Visa_Brandmark_RGB_2021_PNG/Visa_Brandmark_Blue_RGB_2021.png"}/><img/>
                        <img style={{ height: '25px' }} alt={"Card payment option - Mastercard"}
                             src={"../../images/Payment icons/Dankort logo/DK_Logo_CMYK.png"}/><img/>
                    </div>
                </label>

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
                        style={{height: '25px'}}
                        alt="Payment option - MobilePay"
                        src="../../images/Payment icons/MobilePayPNG/MP_RGB_NoTM_Logo+Type Horisontal Blue.png"
                    />
                </label>

                <label className="PaymentTypeBox">
                    <div className={"PaymentText"}>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="gift card"
                            onChange={handlePaymentMethodChange}
                        />
                        <p>Gift card </p>
                    </div>
                    <div className={"PaymentIcons"}>
                        <img
                            className="PaymentIcons"
                            style={{ height: '30px'}}
                            alt="Payment option - Gift card"
                            src="../../images/Payment icons/GiftCard.png"
                        />
                    </div>
                </label>
                <label className="PaymentTypeBox">
                    <div className={"PaymentText"}>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="invoice"
                            onChange={handlePaymentMethodChange}
                            alt={"Payment option - Invoice"}
                        />
                        <p>Invoice </p>
                    </div>
                </label>

                <button className={"NudgeButton"} onClick={handleButtonClick}>Pay now</button>
            </nav>
        </div>
    );
}

export default AccessPayment;


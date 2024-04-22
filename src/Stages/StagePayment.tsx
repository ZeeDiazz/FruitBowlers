import { useState } from "react";
import '../assets/Styles/large/StageBasket.css'
import '../assets/Styles/default/DefaultStyling.css'
import '../assets/Styles/320px/SmallScreen.css'
import '../Stages/StageTotal.tsx'

/*interface ButtonProps {
    handleGiftCardRedeemClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleCheckboxChange: (event: React.MouseEvent<HTMLButtonElement>) => void;
    isChecked: boolean;
}*/
/*function backBotton(){
        return(
            <><>
            </><input type="submit" value="Back to main" id="button" onClick={useHistory}/></>
            )
    }*/
    function backBotton() {
      
        function handleClick() {

        }
      
        return (
          <button type="button" onClick={handleClick}>
            Go home
          </button>
        );
      }

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
const one: number= 1;
const enabled = false;
interface ChoosePaymentProps {
    isInvoiceEnabled: boolean;
    totalDiscountedPrice: number;
    form :formInterface;
}
enum PaymentOption{
    NONE, CARD, GIFT_CARD, INVOICE, MobilePay
}
export function ChoosePayment(choosePaymentProps: ChoosePaymentProps/*, buttonProps: ButtonProps*/) {
    const isInvoiceEnabled = choosePaymentProps.isInvoiceEnabled;
    const [paymentOption, setPaymentOption] = useState<PaymentOption>(PaymentOption.NONE);

    const handlePaymentMethodChange = (paymentOption: PaymentOption) => {
        setPaymentOption(paymentOption)
    };
    console.log(choosePaymentProps.form.Name)

    return (
        <div className="stageBoxes">
            {backBotton()}
            <div className="title-container">
                <img
                    src={`/images/stage3-fat.png`}
                    alt="Step 1"
                    className="stageIcons"
                />
                <h2>Payment</h2>
            </div>

            <nav className={"PaymentOptionsBox"}>

                <div className="PaymentTypeOuterBox">
                    <label className={"PaymentTypeBox"}>
                        <div className={"PaymentText"}>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="card"
                                onChange={() => handlePaymentMethodChange(PaymentOption.CARD)}
                            />
                            <p>Card </p>
                        </div>
                        <div className={"PaymentIcons"}>
                            <img style={{}} alt={"Card payment option - Visa"}
                                src={"../../images/Payment icons/Visa_Brandmark_RGB_2021_PNG/Visa_Brandmark_Blue_RGB_2021.png"} />
                            <img style={{}} alt={"Card payment option - Mastercard"}
                                src={"../../images/Payment icons/Dankort logo/DK_Logo_CMYK.png"} />
                        </div>
                    </label>
                    {paymentOption === PaymentOption.CARD && (
                        <form id="cardForm" className={"PaymentInputs"}>
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
                        </form>
                    )}
                </div>

                <div className="PaymentTypeOuterBox">
                    <label className={"PaymentTypeBox"}>
                        <div className={"PaymentText"}>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="giftCard"
                                onChange={() => handlePaymentMethodChange(PaymentOption.GIFT_CARD)}
                            />
                            <p>Gift card </p>
                        </div>
                        <div className={"PaymentIcons"}>
                            <img
                                className="PaymentIcons"
                                style={{ height: '30px' }}
                                alt="Payment option - Gift card"
                                src="../../images/Payment icons/GiftCard.png"
                            />
                        </div>
                    </label>
                    {paymentOption === PaymentOption.GIFT_CARD   /*&& (

                        <form id="giftCard" onSubmit={buttonProps.handleGiftCardRedeemClick} className={"PaymentInputs"}>
                            <input
                                type={"text"}
                                placeholder={"Gift card number"}
                            />
                            <input
                                id="giftCardPIN"
                                type={"number"}
                                placeholder={"Security pin"}
                            />
                            <button
                                onClick={buttonProps.handleGiftCardRedeemClick}
                                name=""
                                type="submit"
                            >
                                Redeem
                            </button>
                        </form>
                    )*/}
                    
                </div>

                <div className="PaymentTypeOuterBox">
                    <label className={"PaymentTypeBox"}>
                        <div className={"PaymentText"}>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="mobilepay"
                                onChange={() => handlePaymentMethodChange(PaymentOption.MobilePay)}
                            />
                            <p> MobilePay </p>
                        </div>
                        <div className={"PaymentIcons"}>
                            <img
                                className="PaymentIcons"
                                style={{ height: '35px'}}
                                alt="Payment option - Mobile Pay"
                                src="public/images/Payment icons/MobilePayPNG/MobilePayLogo.png"
                            />
                        </div>
                        
                    </label>
                    {paymentOption === PaymentOption.MobilePay}

                    </div>

                {/*//Only show invoice choice if billing address has company VAT number */}

                {isInvoiceEnabled ?
                    <div className="PaymentTypeOuterBox">
                        <label className={"PaymentTypeBox"}>
                            <div className={"PaymentText"}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="invoice"
                                    onChange={() => handlePaymentMethodChange(PaymentOption.INVOICE)}
                                />
                                <p>Invoice </p>
                            </div>
                        </label>
                        {paymentOption === PaymentOption.INVOICE && (
                            <form id="invoiceForm" className={"PaymentInputs"}>
                                <input
                                    type={"text"}
                                    placeholder={"Card number (1234 5678 9012 3456)"}
                                />
                                <div className={"SubInputs"}>
                                    <input
                                        type={"text"}
                                        placeholder={"MM/YYYY"}
                                    />
                                </div>
                                <input
                                    type={"text"}
                                    placeholder={"Card holders name"}
                                />
                            </form>
                        )}
                    </div>
                    : null
                }
            </nav>
        </div>
    );
}

export default ChoosePayment;

// request bin url: https://eohuzfa0giiahrs.m.pipedream.net
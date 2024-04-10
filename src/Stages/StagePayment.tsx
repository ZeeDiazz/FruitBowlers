import React, { useState } from "react";
import '../assets/Styles/large/StageBasket.css'
import '../assets/Styles/default/DefaultStyling.css'
import '../assets/Styles/320px/SmallScreen.css'
import '../Stages/StageTotal.tsx'

interface ChoosePaymentProps {
    isInvoiceEnabled: boolean;
    totalDiscountedPrice: number;
}
enum PaymentOption{
    NONE, CARD, GIFT_CARD, INVOICE
}
function ChoosePayment(choosePaymentProps: ChoosePaymentProps) {
    const isInvoiceEnabled = choosePaymentProps.isInvoiceEnabled;
    const [paymentOption, setPaymentOption] = useState<PaymentOption>(PaymentOption.NONE);
    const [isChecked, setIsChecked] = useState(false);
    
    //Check terms
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };

    const handlePaymentMethodChange = (paymentOption: PaymentOption) => {
        setPaymentOption(paymentOption)
    };
    return (
        <div className="stageBoxes">
            <div className="title-container">
                <img
                    src={`/images/stage3-fat.png`}
                    alt="Step 1"
                    className="stageIcons"
                />
                <h2>Payment</h2>
            </div>

            <nav className={"PaymentOptionsBox"}>
                {!isChecked &&(
                <p style={{color:"red", marginLeft:'20px', fontSize: '12px' }}>* You need to accept terms</p>
                )}
                <label className={"CheckBoxWithDescription"}>
                    <input
                        data-testid="AcceptTerms"
                        type="checkbox"
                        name="AcceptTerms"
                        checked={isChecked} 
                        onChange={handleCheckboxChange}
                    />
                    <p><a href={""}>Accept terms</a> & <a href={""}>conditions</a></p>
                </label>
                <div className={"CheckBoxWithDescription"}>
                    <input
                        data-testid="Marketing-email"
                        type="checkbox"
                        name="MarketingNudge"
                    //onChange={need to push this to the server}
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
                    {paymentOption === PaymentOption.GIFT_CARD  /* && (

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
                <textarea
                    className={"CommentBox"}
                    placeholder={"Comment for the order"}>

                </textarea>

                <button className={"NudgeButton"}>Pay now</button>
            </nav>
        </div>
    );
}

export default ChoosePayment;
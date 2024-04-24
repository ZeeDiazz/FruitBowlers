import {FormEvent, useEffect, useReducer, useState} from "react";
import '../assets/Styles/large/StageBasket.css'
import '../assets/Styles/default/DefaultStyling.css'
import '../assets/Styles/320px/SmallScreen.css'
import '../Stages/StageTotal.tsx'
import {giftCardPayment} from "../Components/giftCardPayment.ts";
import {GiftCardPaymentResponse} from "../Components/giftCardPayment.ts";

interface ChoosePaymentProps {
    isInvoiceEnabled: boolean;
    totalDiscountedPrice: number;
}

enum PaymentOption{
    NONE, CARD, GIFT_CARD, INVOICE, MobilePay
}
//@TODO make correct variables
function reducer(state: any, action: any) {
    switch (action.type) {
        case 'updateText':
            return { ...state, text: action.payload };
        default:
            return state;
    }
}

function ChoosePayment(choosePaymentProps: ChoosePaymentProps ) {
    const [state, dispatch] = useReducer(reducer, { text: ' The inputs are case sensitive ' });

    const isInvoiceEnabled: boolean = choosePaymentProps.isInvoiceEnabled;
    const [isPopUpActive, setIsPopUpActive] = useState(false);
    const [giftCardCopy, setGiftCardCopy] = useState<Partial< {
        currentCredit: number, currency:string}>>({ currentCredit: undefined, currency: '' });    const [paymentOption, setPaymentOption] = useState<PaymentOption>(PaymentOption.NONE);
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
                                src={"/images/Payment icons/GiftCard.png"}
                            />
                        </div>
                    </label>
                    {paymentOption === PaymentOption.GIFT_CARD   && (
                        <div>
                            <p className={"ErrorText"}>
                                {state.text}
                            </p>
                            <form id="giftCard" className={"PaymentInputs"} onSubmit={HandleGiftCardRedeemClick}>
                                <input
                                    id={"giftCardNumber"}
                                    type={"text"}
                                    placeholder={"Gift card number"}
                                />
                                <input
                                    id="giftCardPIN"
                                    type={"number"}
                                    placeholder={"Security pin"}
                                    inputMode="numeric" // disables letters and some mobile keyboards will change to numeric
                                />
                                <button
                                    name="giftCardSubmitButton"
                                    type="submit"
                                >
                                    Redeem
                                </button>
                            </form>
                        </div>

                    )}
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
                                src="/images/Payment icons/MobilePayPNG/MobilePayLogo.png"
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
            { isPopUpActive &&
                <GiftCardPopUp></GiftCardPopUp>
            }
        </div>
    );
    async function HandleGiftCardRedeemClick (event: FormEvent){
        event.preventDefault();
        //const [userTypedGiftCardNumber, setUserTypedGiftCardNumber]= useState("")
        //const [userTypedGiftCardPIN, setUserTypedGiftCardPIN]= useState("")

        const userTypedGiftCardNumber: HTMLInputElement = document.getElementById('giftCardNumber') as HTMLInputElement;
        const userTypedGiftCardPIN: HTMLInputElement = document.getElementById('giftCardPIN') as HTMLInputElement;

        if (userTypedGiftCardNumber != null && userTypedGiftCardPIN != null) {
            //setUserTypedGiftCardNumber(document.getElementById('giftCardNumber').value);
            const userTypedGiftCardNumberValue = userTypedGiftCardNumber.value;
            const userTypedGiftCardPINValue = userTypedGiftCardPIN.value;
            if (userTypedGiftCardNumberValue.length < 1 || userTypedGiftCardPINValue.length < 1) {
                console.log("No input in number or PIN")
                dispatch({ type: 'updateText', payload: 'You have to fill in the name and PIN' });
            } else if (userTypedGiftCardNumberValue.length < 3 || userTypedGiftCardPINValue.length < 3) {
                console.log("Invalid Number or PIN")
                dispatch({ type: 'updateText', payload: 'Invalid Number or PIN' });
            } else {
                console.log( userTypedGiftCardNumber + " and " + userTypedGiftCardPIN + " are valid inputs!")
                await giftCardPayment(userTypedGiftCardNumberValue, userTypedGiftCardPINValue)
                    .then((result: GiftCardPaymentResponse) => {
                        if ('error' in result) {
                            console.error('Error:', result.error);
                            dispatch({ type: 'updateText', payload: 'The input did not match a gift-card. Please try again'});
                        } else {
                            console.log('Success:', result.giftCard);
                            dispatch({ type: 'updateText', payload: ''});
                            setIsPopUpActive(true);
                            // Clone the giftCard object
                            const clonedGiftCard = { ...result.giftCard };
                            // Set the state with the cloned giftCard object
                            setGiftCardCopy(clonedGiftCard);
                            handlePaymentMethodChange(PaymentOption.NONE)
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        dispatch({ type: 'updateText', payload: 'Something went wrong. Please try again later'});
                    });
            }
        }
    }
    function GiftCardPopUp() {
        useEffect(() => {
            const slider: HTMLInputElement = document.getElementById("sliderRange") as HTMLInputElement;
            const handleSliderChange = () => {
                if (slider && slider.value !== "100") {
                    // Define a recursive function to decrement the slider value gradually
                    const decrementSlider = () => {
                        // Check if the slider value is not yet 1
                        if (slider.value !== "1") {
                            // Decrement the slider value
                            slider.value = String(parseInt(slider.value) - 1);
                            // Call decrementSlider recursively after a delay
                            setTimeout(decrementSlider, 2); //Delay for animated fallback
                        }
                    }; decrementSlider();
                } else {
                    //@TODO: else if slider == 100 {call HandleGiftCardRedemption}
                }
            };
            if (slider) {
                slider.addEventListener("change", handleSliderChange);
                // Clean up event listener when component unmounts
                return () => {
                    slider.removeEventListener("change", handleSliderChange);
                };
            }
        }, []);
        return (
            <div className={"WholeGiftCardPopUp"}>
                <div className={"HAndButton"}>
                    <h3>Your gift card is ready</h3>
                    <button onClick={()=> setIsPopUpActive(false)}>
                        Cancel
                    </button>
                </div>
                <p>There are {giftCardCopy.currentCredit} {giftCardCopy.currency} on your gift card</p>
                <div>
                    <p>Slide to use it!</p>
                    <div className="slideContainer">
                        <input type="range" min="1" max="100" defaultValue={1} className={"slider"} id="sliderRange"/>
                    </div>
                </div>
            </div>
        )
    }
}
export default ChoosePayment;

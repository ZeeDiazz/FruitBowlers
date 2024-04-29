import '../assets/Styles/large/StageCheckout.css'
import '../assets/Styles/320px/SmallScreen.css'
import '../assets/Styles/default/DefaultStyling.css'
import '../assets/Styles/large/App.css'
import React, {FormEvent, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import {useCheckoutDispatch, useCheckoutState} from "../Context/CheckoutContext.tsx";
import {header} from "../Components/header.tsx";
import {useBasketState} from "../Context/BasketContext.tsx";
import {useTotalState} from "../Context/TotalContext.tsx";
import {usePaymentState} from "../Context/PaymentContext.tsx";
import {useDeliveryState} from "../Context/DeliveryContext.tsx";

export function StageCheckout() {
    const {commentText, receiveEmail, hasPaid} = useCheckoutState();
    const {products} = useBasketState();
    const {totalPrice, totalQuantity} = useTotalState();
    const {paymentOption} = usePaymentState();
    const {
        billingAddressValues,
        sendToBilling,
        deliveryAddressValues
    } = useDeliveryState();

    const dispatch = useCheckoutDispatch();

    const [isChecked, setIsChecked] = useState(false);

    const navigate = useNavigate();
    const [navigating, setNavigating] = useState(true);
    useEffect(() => {
        setNavigating(false);
        dispatch({type:'HasPaid',payload:{hasPaid:hasPaid}});
    }, []);

    const [jumpAnimation, setJumpAnimation] = useState(false);

    async function ServerCall(e: FormEvent) {
        if (isChecked) {
            e.preventDefault()
            const logUrl = 'https://eopdtwzz2bt0la6.m.pipedream.net';

            const logResponse = await fetch(logUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    receiveEmail, commentText,
                    products, totalPrice, totalQuantity, paymentOption,
                    billingAddressValues,
                    sendToBilling,
                    deliveryAddressValues
                })
            });
            if (logResponse.ok) {
                dispatch({type: 'HasPaid', payload: {hasPaid: true}});
                navigate('/OrderSubmitted');
            } else {
                dispatch({type: 'HasPaid', payload: {hasPaid: false}});
                console.error("Failed to log search", logResponse.statusText)
            }
        } else {
            setJumpAnimation(true);
        }
    }

    //When the method ServerCall is called, it sets the animation state to false
    useEffect(() => {
        setTimeout(() => {
            setJumpAnimation(false);
        }, 1000);

    }, [ServerCall]);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
        setJumpAnimation(false);
        console.log("state of isChecked: " + event.target.checked);
    }

    return (
        <div className={`page ${navigating ? "navigating" : "navigated"}`}>
            <nav>
                <header>
                    {header()}
                </header>
                <div className={"stageBoxes"}>
                    <button onClick={() => navigate('/Payment')} className="previous round">&#8249;</button>
                    <div className="title-container">
                        <img
                            src={`/images/stage4-fat.png`}
                            alt="Terms&Condition"
                            className="stageIcons"
                        />
                        <h2>Checkout</h2>
                    </div>
                    {!isChecked && (
                        <p style={{
                            color: "red",
                            marginLeft: '20px',
                            fontSize: '12px',
                            animation: jumpAnimation ? 'jump 0.5s 1 ease-in-out' : 'none'
                        }}>* You need to accept terms</p>
                    )}
                    <label className={"CheckBoxWithDescription"}>
                        <input
                            type="checkbox"
                            name="AcceptTerms"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        />
                        <p><a href={""}>Accept terms</a> & <a href={""}>conditions</a></p>
                    </label>
                    <div className={"CheckBoxWithDescription"}>
                        <input
                            type="checkbox"
                            name="MarketingNudge"
                            checked={receiveEmail}
                            onChange={(e) => dispatch({
                                type: 'ReceiveEmail',
                                payload: {receiveEmail: e.target.checked}
                            })}
                        />
                        <p>Receive marketing emails</p>
                    </div>

                    <textarea
                        className={"CommentBox"}
                        placeholder={"Comment for the order"}
                        defaultValue={commentText}
                        onChange={(e) => dispatch({type: 'CommentText', payload: {commentText: e.currentTarget.value}})}
                    />
                    <button className={"NudgeButton"} onClick={ServerCall}>Submit Order</button>

                </div>
            </nav>
        </div>
    )
}
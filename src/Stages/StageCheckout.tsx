import '../assets/Styles/large/StageCheckout.css'
import '../assets/Styles/320px/SmallScreen.css'
import '../assets/Styles/default/DefaultStyling.css'
import React, { FormEvent, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import {useCheckoutDispatch, useCheckoutState} from "../Complex/CheckoutContext.tsx";

export function StageCheckout() {
    const { commentText,receiveEmail } = useCheckoutState();
    const dispatch = useCheckoutDispatch();

    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();

    //TODO need to implement this correct
    async function ServerCall (e: FormEvent){
        e.preventDefault()
        const logUrl = 'https://eovlje4urovlbav.m.pipedream.net';

        const logResponse = await fetch(logUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({receiveEmail, commentText})
        });
        if(!logResponse.status){
            console.error("Failed to log search", logResponse.statusText)
        }
    }
    
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
        console.log("state of isChecked: " + event.target.checked);
    }

    return (
        <nav>
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
                    <p style={{color: "red", marginLeft: '20px', fontSize: '12px'}}>* You need to accept terms</p>
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
                        onChange={(e) => dispatch({type:'ReceiveEmail', payload:{receiveEmail: e.target.checked}})}
                    />
                    <p>Receive marketing emails</p>
                </div>

                <textarea
                    className={"CommentBox"}
                    placeholder={"Comment for the order"}
                    defaultValue={commentText}
                    onChange={(e) => dispatch({ type: 'CommentText', payload: { commentText: e.currentTarget.value } })}
                />
                <button className={"NudgeButton"} onClick={ServerCall}>Pay now</button>
            </div>
        </nav>
    )
}

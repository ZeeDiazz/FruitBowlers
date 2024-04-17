import '../assets/Styles/large/StageTermsNConditions.css'
import '../assets/Styles/320px/SmallScreen.css'
import '../assets/Styles/default/DefaultStyling.css'
import { FormEvent, useState } from 'react'
import { getTotalPriceDiscounted } from '../Components/price';
export function stageTermsNConditions() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isChecked, setIsChecked] = useState(false);

    //TODO need to implement this correct
    async function ServerCall (e: FormEvent){
        e.preventDefault()
        const logUrl = 'https://eohuzfa0giiahrs.m.pipedream.net';
        const logResponse = await fetch(logUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({getTotalPriceDiscounted})
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
                <div className="title-container">
                    <img
                        src={`/images/stage4-fat.png`}
                        alt="Terms&Condition"
                        className="stageIcons"
                    />
                    <h2>Checkout</h2>
                </div>
                {!isChecked &&(
                    <p style={{color:"red", marginLeft:'20px', fontSize: '12px' }}>* You need to accept terms</p>
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
                        //onChange={need to push this to the server}
                    />
                    <p>Receive marketing emails</p>
                </div>
                {/*payment button here*/}
                <textarea
                    className={"CommentBox"}
                    placeholder={"Comment for the order"}>
                </textarea>
                <button className={"NudgeButton"} onClick={ServerCall}>Pay now</button>
            </div>
        </nav>
    )
}

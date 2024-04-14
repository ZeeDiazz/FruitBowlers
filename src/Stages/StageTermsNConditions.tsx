import '../assets/Styles/large/StageTermsNConditions.css'
import '../assets/Styles/320px/SmallScreen.css'
import '../assets/Styles/default/DefaultStyling.css'
import { ChangeEvent, FormEvent, useState } from 'react'
import { getTotalPriceDiscounted } from '../Components/price';
export function stageTermsNConditions() {

    const [isChecked, setIsChecked] = useState(false);
    
    async function ServerCall (e: FormEvent){
        e.preventDefault()
        const form = e.target as HTMLFormElement;
        const logUrl = 'https://eohuzfa0giiahrs.m.pipedream.net';
        console.log(JSON.stringify({getTotalPriceDiscounted}))
        const logResponse = await fetch(logUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            
            body: JSON.stringify({Felix})
        });
        if(!logResponse.status == true){
            console.error("Failed to log search", logResponse.statusText)
        }
    };
    function checkboxes(text:string) {
        return (
            

            <div className="checkboxText">
                <input type="checkbox" name="" value="yes" className="container" id="checkbox"
                       defaultChecked={false}
                       onChange={() => {
                           console.log("test")
                       }}
                />
                <span className="checkmark"/>

                    {text}
                
            </div>
        )
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

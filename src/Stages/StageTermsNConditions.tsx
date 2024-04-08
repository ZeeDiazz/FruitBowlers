import '../assets/Styles/large/StageTermsNConditions.css'
import '../assets/Styles/320px/SmallScreen.css'
import '../assets/Styles/default/DefaultStyling.css'
export function stageTermsNConditions() {

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

    return (
        <div className={"stageBoxes"}>
            <div className="title-container">
                <img
                    src={`/images/stage4-fat.png`}
                    alt="Terms&Condition"
                    className="stageIcons"
                />
                <h2>Terms & Conditions</h2>
            </div>

            {checkboxes("I have read and understand the terms & conditions policy and")}
            {checkboxes("Yes, I would like to receive emails...")}

            <div id="inputBox">
                <input name="ordercomment" type="text" placeholder="*Optional Order comment"/>
            </div>

            {/*payment button here*/}
        </div>
    )
}
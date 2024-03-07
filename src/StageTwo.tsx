import './StageTwo.css'

export default function stage2(){
    return(
        <>
            <div className="title-container">
                {/*need to add a new pic for step 2*/}
                <img
                    src={`/images/stage1.png`}
                    alt= "Step 2"
                    className="stage2"
                />
                <h2>Address</h2>
            </div>
            <div id="inputBox">
                <input name="Name" placeholder="First Name"/>

                <br/>
                <input name="LastName" placeholder="Last Name"/>
                <br/>
                <input name="Email" placeholder="Email"/>
                <br/>
                <div className="addressBox">
                    <br/>
                    <input name="streetnumber" placeholder="Street number"/>
                    <br/>
                    <input name="Zipcode" placeholder="ZipCode"/>
                    <input name="City" placeholder="City"/>
                    <br/>
                    <input name="Country" placeholder="Country"/>
                </div>
                <br/>
                <div id="phoneBox">
                    <input name="Landcode" placeholder="Landcode"/>
                    <input name="Telephone" placeholder="Telephone"/>
                </div>
            </div>
            {checkboxes()}

            {devliveryAdress()}
        </>
    )

}

function checkboxes() {

}

function devliveryAdress() {

}

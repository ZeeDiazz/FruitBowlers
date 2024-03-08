import './StageTwo.css'

export default function stage2(){
    return(
        <>
            <div className="title-container">
                {/*need to add a new pic for step 2*/}
                <img
                    src={`/images/stage1.png`}
                    alt="Step 2"
                    className="stage2"
                />
                <h2>Address</h2>
            </div>
            <form>
                <div id="inputBox">
                    <input name="Name" type="text" placeholder="First Name" required/>
                    <br/>
                    <input name="LastName" type="text" placeholder="Last Name" required/>
                    <br/>
                    <input name="Email" placeholder="Email" required/>
                    <br/>
                    <div className="addressBox">
                        <br/>
                        <input name="streetnumber" placeholder="Street number" required/>
                        <br/>
                        <input name="Zipcode" placeholder="ZipCode" required/>
                        <input name="City" placeholder="City" required/>
                        <br/>
                        <input name="Country" placeholder="Country" required/>
                    </div>
                    <br/>
                    <div id="phoneBox">
                        <input name="Landcode" placeholder="Landcode" required/>
                        <input name="Telephone" placeholder="Telephone" required/>
                    </div>
                    <input type="submit" value="Continue To Payment" id="button"/>
                </div>
            </form>
            {checkboxes()}

            {devliveryAdress()}
        </>
    )

}

function checkboxes() {
    return(
        <>

        </>
    )
}

function devliveryAdress() {

}

import './StageTwo.css'

export default function stage2(){
    //const formRef = useRef(null);




    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();

        // Read the form data

        const form = e.target;
        const formData = new FormData(form);

        // You can pass formData as a fetch body directly:
      //  fetch('/some-api', { method: form.method, body: formData });

        // Or you can work with it as a plain object:
        const formJson = Object.fromEntries(formData.entries());


        const streetNumberString = formJson.streetnumber;
if(!validateStreet(streetNumberString)){
    form.reset()

    console.log("invalid zip code")


}



    }


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
            <form    method="post" onSubmit={handleSubmit}>
                <div id="inputBox">
                    <input name="Name"  type="text"
                           placeholder="First Name" required/>
                    <br/>
                    <input name="LastName" type="text" placeholder="Last Name" required/>
                    <br/>
                    <input type = "email" name="Email" placeholder="Email" required/>
                    <br/>
                    <div className="addressBox">
                        <br/>
                        <input name="streetnumber" type="number" placeholder="Street number" required/>
                        <br/>
                        <input type="number" name="Zipcode" placeholder="ZipCode" required/>
                        <input name="City" placeholder="City" required/>
                        <br/>
                        <input name="Country" placeholder="Country" required/>
                    </div>
                    <br/>
                    <div id="phoneBox">
                        <input name="Landcode" placeholder="Landcode" required/>
                        <input type= "tel" name="Telephone" placeholder="Telephone" required/>
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
           <input type="checkbox" name="Delivery Address" defaultChecked={true} />
            <br/>
            <p>Send to billing address</p>

        </>
    )
}
 function validateStreet(street){
let bool =0
    fetchData(street,bool)

     return bool


}
 function fetchData(street,bool){
    const dataFosyningenApi = "https://api.dataforsyningen.dk/postnumre/"+street

    fetch(dataFosyningenApi)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            bool=1

        })
        .catch(error => {
            if (error.message === 'Network response was not ok') {
                console.warn('Network response was not ok:', error);
                // Handle the error accordingly or ignore it
            } else {
                console.error('Invalid zip code:', error);
            }
        });

}

function devliveryAdress() {
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
            <form    method="post" >
                <div id="inputBox">
                    <input name="Name"  type="text"
                           placeholder="First Name" required/>
                    <br/>
                    <input name="LastName" type="text" placeholder="Last Name" required/>
                    <br/>
                    <input type = "email" name="Email" placeholder="Email" required/>
                    <br/>
                    <div className="addressBox">
                        <br/>
                        <input name="streetnumber" type="number" placeholder="Street number" required/>
                        <br/>
                        <input type="number" name="Zipcode" placeholder="ZipCode" required/>
                        <input name="City" placeholder="City" required/>
                        <br/>
                        {/*<input name="Country" placeholder="Country" required/>*/}
                        <select name="Country" id="country">
                            <option value="Danmark">Danmark</option>
                        </select>
                    </div>
                    <br/>
                    <div id="phoneBox">
                        <input name="Landcode" placeholder="Landcode" required/>
                        <input type= "tel" name="Telephone" placeholder="Telephone" required/>
                    </div>
                    <input type="submit" value="Continue To Payment" id="button" />

                </div>
            </form>


        </>
    )
}

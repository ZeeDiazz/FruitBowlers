import App from "../App.tsx";

function Total() {
    return (
        <div id="totalBox">
            <div id="totalBoxText">
                <h2>Total</h2>
                <p>Total Quantity: {totalQuantity}</p>
                {getDiscountMessage(totalPriceDiscounted)}
                <p>Total Price: {totalPriceDiscounted} &nbsp; {products[0].currency}</p>
            </div>
        </div>
    )
}
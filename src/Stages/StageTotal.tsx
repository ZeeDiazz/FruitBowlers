import {getDiscountMessage, getTotalPriceDiscounted, getTotalQuantity} from '../Components/price.ts'

function Total() {
    return (
        <div id="totalBox">
            <div id="totalBoxText">
                <h2>Total</h2>
                <p>Total Quantity: {getTotalQuantity}</p>
                {getDiscountMessage(getTotalPriceDiscounted(products))} {//zaids forslag as for now}
                <p>Total Price: {getTotalPriceDiscounted} &nbsp; {products[0].currency}</p>
            </div>
        </div>
    )
}
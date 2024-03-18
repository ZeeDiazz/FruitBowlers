import {getDiscountMessage, getTotalPriceDiscounted, getTotalQuantity} from '../Components/price.ts'
import '../assets/Styles/StageTotalBox.css'

export function TotalBox(products: Product[]){
    return (
        <div id="totalBox">
            <div id="totalBoxText">
                <h2>Total</h2>
                <p>Total Quantity: {getTotalQuantity(products)}</p>
                {getDiscountMessage(getTotalPriceDiscounted(products))} {/*zaids forslag as for now*/}
                <p>Total Price: {getTotalPriceDiscounted(products)} &nbsp; {products[0].currency}</p>
            </div>
        </div>
    )
}

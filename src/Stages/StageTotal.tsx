import {getDiscountMessage, getTotalPriceDiscounted, getTotalQuantity} from '../Components/price.ts'
import '../assets/Styles/large/StageTotalBox.css'
import '../assets/Styles/320px/SmallScreen.css'

export function TotalBox(products: Product[]){
    return (
        <div id={"totalBox"}>
            <h2>Total</h2>
            <div id={"totalContent"}>
                <p>Total Quantity: {getTotalQuantity(products)}</p>
                {getDiscountMessage(getTotalPriceDiscounted(products))} {/*zaids forslag as for now*/}
                <p>Total Price: {getTotalPriceDiscounted(products)} &nbsp; {products[0].currency}</p>
            </div>

        </div>
    )
}

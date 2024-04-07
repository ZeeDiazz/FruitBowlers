import {getDiscountMessage, getTotalPriceDiscounted, getTotalQuantity} from '../Components/price.ts'
import '../assets/Styles/320px/SmallScreen.css'
import '../assets/Styles/large/TotalBox.css'

export function TotalBox(products: Product[], setTotalDiscountedPrice: React.Dispatch<React.SetStateAction<number>>){
    const totalPriceDiscounted = getTotalPriceDiscounted(products);
    setTotalDiscountedPrice(totalPriceDiscounted)
    return (

        <div id={"totalBox"}>
            <h2>Total</h2>
            <div id={"totalContent"}>
                <p>Total Quantity: {getTotalQuantity(products)}</p>
                {getDiscountMessage(totalPriceDiscounted)} {/*zaids forslag as for now*/}
                <p>Total Price: {totalPriceDiscounted} &nbsp; {products[0].currency}</p>
            </div>

        </div>
    )
}

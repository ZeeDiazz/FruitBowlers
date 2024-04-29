import { useEffect, useState } from 'react';
import {getDiscountMessage, getTotalPriceDiscounted, getTotalQuantity} from '../Components/price.ts'
import '../assets/Styles/320px/SmallScreen.css'
import '../assets/Styles/320px/SmallScreenTotalBox.css'
import '../assets/Styles/large/TotalBox.css'
export function TotalBox({products}: {products: Product[]} ){
    const totalQuantity = getTotalQuantity(products);
    const totalPrice = getTotalPriceDiscounted(products);

    const [discountMessage, setDiscountMessage] = useState('loading');
    useEffect(() => {
        if(products){
            setDiscountMessage(getDiscountMessage(getTotalPriceDiscounted(products)));
        }
    }, [products]);

    return (
        <div id="totalBox">
            <div id="totalBoxText">
                <div id='discountInfoBox'>
                    <p data-testid="discount-paragraph">{discountMessage}</p>
                </div>
                <h2 id="TotalTitle">Total</h2>
                <span>
                    <p><b>Total Quantity:</b> {totalQuantity}</p>
                    
                </span>
                <p className="centered" data-testid="totalprice-paragraph"><b>Total Price:</b> {totalPrice + ' DKK'}</p>
            </div>
        </div>
    )
}

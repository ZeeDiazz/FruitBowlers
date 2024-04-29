import { useEffect, useState } from 'react';
import {getDiscountMessage, getTotalPriceDiscounted, getTotalQuantity} from '../Components/price.ts'
import '../assets/Styles/320px/SmallScreen.css'
import '../assets/Styles/320px/SmallScreenTotalBox.css'
import '../assets/Styles/large/TotalBox.css'
import {useTotalDispatch, useTotalState} from "../Context/TotalContext.tsx";

export function TotalBox({products}: {products: Product[]} ){
    const {totalQuantity, totalPrice} = useTotalState();
    const dispatch = useTotalDispatch();
    const [discountMessage, setDiscountMessage] = useState('loading');
    useEffect(() => {
        if(products){
            dispatch({type: 'TotalPrice', payload: {priceAmount: getTotalPriceDiscounted(products)}});
            dispatch({type: 'TotalQuantity', payload: {quantityAmount: getTotalQuantity(products)}});
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

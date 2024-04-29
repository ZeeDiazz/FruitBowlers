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
                <h2 id="TotalTitle">Total</h2>
                <span>
                    <p>Total Quantity: {totalQuantity}</p>
                    <p data-testid = "discount-paragraph">{discountMessage}</p>
                </span>
                <p className="centered" data-testid = "totalprice-paragraph">Total Price: {totalPrice + ' DKK'}</p>
            </div>
        </div>
    )
}

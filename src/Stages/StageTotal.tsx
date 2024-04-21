import { useEffect, useState } from 'react';
import {getDiscountMessage, getTotalPriceDiscounted, getTotalQuantity} from '../Components/price.ts'
import '../assets/Styles/320px/SmallScreen.css'
import '../assets/Styles/large/TotalBox.css'

export function TotalBox({products}: {products: Product[]} ){
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPriceDiscounted, setTotalPriceDiscounted] = useState(0);
    const [discountMessage, setDiscountMessage] = useState('loading');
    {/*
        const totalPriceDiscounted = getTotalPriceDiscounted(products);
    setTotalDiscountedPrice(totalPriceDiscounted)
    */}

    useEffect(() => {
        if(products){
            setTotalQuantity(getTotalQuantity(products));
            setTotalPriceDiscounted(getTotalPriceDiscounted(products));
            setDiscountMessage(getDiscountMessage(getTotalPriceDiscounted(products)));
        }
    }, [products]);

    return (
        <div id="totalBox">
            <div id="totalBoxText">
                <h2>Total</h2>
                <p data-testid="quantity-paragraph">Total Quantity: {totalQuantity}</p>
                <p data-testid="discount-paragraph">{discountMessage}</p>
                <p data-testid="totalprice-paragraph">Total Price: {totalPriceDiscounted + ' DKK'}</p>
            </div>
        </div>
    )
}

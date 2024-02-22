import { useState } from "react"

function App() {
    const products = [
    { 
    id: "apple-bag",
    name: "Apple bag, 5 pieces",
    price: 20,
    description: "There are 5 apples in one bag",
    currency: "DKK",
    discountQuantity: 2,
    discountPercent: 10,
    upsellProductId: null
    },
    {
    id: "banana",
    name: "Banana bag",
    price: 15,
    description: 'One eco banana is approximately 105g. There are 5 bananas in one bag',
    currency: 'DKK',
    discountQuantity: 5,
    discountPercent: 10,
    upsellProductId: null
    },
    {
    id: 'lemon-bag',
    name: 'Lemon bag, 6 pieces',
    price: 15,
    description: 'One eco lemon bag is approximately 500g.',
    currency: 'DKK',
    discountQuantity: 4,
    discountPercent: 10,
    upsellProductId: null
    },
    {
    id: 'strawberries',
    name: 'Strawberries',
    price: 35,
    description: '300g, eco, danish strawberries',
    currency: 'DKK',
    discountQuantity: 3,
    discountPercent: 15,
    upsellProductId: null
    }];
    const [basket, setBasket] =
        useState(Array(products.length).fill(null));
    function handleAmountChange(index: number, amount: number){
        const newBasket = basket.slice();
        newBasket[index] += amount
        setBasket(newBasket);
        console.log('cartItem was clicked')
    }
    const calculateLocalTotalPrice = (index: number) => {
        return basket[index] * products[index].price;
    };
    const calculateTotalPrice = () => {
        let totalPrice = 0;
        for (let i = 0; i < basket.length; i++) {
            totalPrice += calculateLocalTotalPrice(i);
        }
        return totalPrice;
    };

    const totalQuantity = basket.reduce((total, quantity) => total + quantity, 0);
    const totalPrice = calculateTotalPrice();
    return (
        <div>
            {products.map((product, index) => (
                <div key={product.id} className="cartItem">
                    <div className="description">
                        <p>
                            {product.name} {product.price} {product.currency}
                        </p>
                        <CartItem
                            value={basket[index]}
                            onDecrement={() => handleAmountChange(index, -1)}
                            onIncrement={() => handleAmountChange(index, 1)}
                        />
                        <p>
                            localTotalPrice: {calculateLocalTotalPrice(index)}
                        </p>
                    </div>
                </div>
            ))}

            {/* Display the total quantity */}
            <p>Total Quantity: {totalQuantity}</p>
            <p>Total Price: {totalPrice}</p>
        </div>
    );
}

function CartItem({value, onIncrement, onDecrement}) {
    return (
        <div>
            <button className="increase" onClick={onIncrement}>
                +
            </button>
            <span>{value}</span>
            <button className="decrease" onClick={onDecrement} disabled={value <= 0}>
                -
            </button>
        </div>
    );
}


export default App

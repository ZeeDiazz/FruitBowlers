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
    }
];
    return (
    <>
    </>
  )
}

export default App

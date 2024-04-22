import {describe, expect, it, vi, beforeEach} from "vitest";
import * as price from '../Components/price.ts'
const products = [{
    "id": "apple-bag",
    "name": "Apples",
    "price": 25,
    "description": "There are 5 apples in one bag",
    "currency": "DKK",
    "discountQuantity": 2,
    "discountPercent": 10,
    "upsellProductId": "organic apple-bag",
    "totalPrice": 25,
    "quantity": 1
},{
    "id": "banana-bag",
    "name": "Banana bag",
    "price": 15,
    "description": "One eco banana is approximately 105g. There are 5 bananas in one bag",
    "currency": "DKK",
    "discountQuantity": 5,
    "discountPercent": 10,
    "upsellProductId": null,
    "totalPrice": 360,
    "quantity": 24
},{
    "id": "kiwi",
    "name": "Kiwi",
    "price": 10,
    "description": "The peel is the best",
    "currency": "DKK",
    "discountQuantity": 1,
    "discountPercent": 50,
    "upsellProductId": null,
    "totalPrice": 10,
    "quantity": 1
}
];
const expensiveProduct = [{
    "id": "apple-bag",
    "name": "Apples",
    "price": 300,
    "description": "There are 5 apples in one bag",
    "currency": "DKK",
    "discountQuantity": 2,
    "discountPercent": 10,
    "upsellProductId": "organic apple-bag",
    "totalPrice": 300,
    "quantity": 1
}
];
const edgeProduct = [{
    "id": "apple-bag",
    "name": "Apples",
    "price": 300,
    "description": "There are 5 apples in one bag",
    "currency": "DKK",
    "discountQuantity": 1,
    "discountPercent": 50,
    "upsellProductId": "organic apple-bag",
    "totalPrice": 300,
    "quantity": 1
}
];
describe('price methods', () => {
    it('should calculate price of product and apply discount if the quantity is equal or above the discount quantity', () => {
        // quantity is above discountQuanity
        const bananaExpected = price.calculateLocalTotalPrice(products,1);
        //quantity is equal to discountQuanity
        const kiwiExpected = price.calculateLocalTotalPrice(products, 2);
        //quantity is below discountQuantity
        const appleExpected = price.calculateLocalTotalPrice(products,0);

        expect(bananaExpected).toBe(324);
        expect(kiwiExpected).toBe(5);
        expect(appleExpected).toBe(25);
    });
    it('should calculate the total price and apply discount equal or above 300', () => {
        // when products have totalprice of 300
        const expectedTotalWhenEqual = price.calculateTotalPrice(expensiveProduct);
        // when products have a total price above 300 after local discounts have been applied
        const expectedTotalMixed = price.calculateTotalPrice(products);
        // when product has a totalprice of 300 but have a discount that should be applies before the total discount
        const expectedTotalEdge = price.calculateTotalPrice(edgeProduct);
        expect(expectedTotalWhenEqual).toBe(270);
        expect(expectedTotalMixed).toBe(318.6);
        expect(expectedTotalEdge).toBe(150);
   });
    it('should handle quantity change properly by setting both the quantity and  the total price', () => {
        // when remove an item quantity and totalprice should be zero
        const removedProduct: Product[] = price.handleQuantityChange(expensiveProduct, 0, 0,);
        // when an item gets added
        const addedProduct: Product[] = price.handleQuantityChange(edgeProduct, 0, 1);
        // when item gets decremented
        const discardedProduct: Product[] = price.handleQuantityChange(products,1,-1);

        expect(removedProduct[0].quantity).toBe(0);
        expect(removedProduct[0].totalPrice).toBe(0);
        expect(addedProduct[0].quantity).toBe(2);
        expect(addedProduct[0].totalPrice).toBe(600);
        expect(discardedProduct[1].quantity).toBe(23);
        expect(discardedProduct[1].totalPrice).toBe(345);
    });
});

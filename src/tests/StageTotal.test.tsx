import { render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";
import {TotalBox} from "../Stages/StageTotal.tsx";
const products = [{
    "id": "apple-bag",
    "name": "Apples",
    "price": 25,
    "description": "There are 5 apples in one bag",
    "currency": "DKK",
    "discountQuantity": 2,
    "discountPercent": 10,
    "upsellProductId": "organic apple-bag",
    "totalPrice": 50,
    "quantity": 2
}]
describe('TotalBox components', () => {
    it('should display the correct values of the products', async () => {
        const { getAllByText } = render(<TotalBox products={products}/>);
    });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";
import calculateLocalTotalPrice from './App.tsx';

describe(App.name, () => {
    it("should render", () => {
        render(<App />);
        //text that always has to be in the document
        expect(screen.getByText("Fruit Bowlers")).toBeInTheDocument();
        expect(screen.getByText("Total")).toBeInTheDocument();
        expect(screen.getByText("Basket")).toBeInTheDocument();
    });
});

const products = [
    { quantity: 5, discountQuantity: 3, discountPercent: 10, totalPrice: 50 },
    // Add more product objects as needed
];
describe('calculateLocalTotalPrice function', () => {
    // Test case 1: Test when quantity is greater than or equal to discountQuantity
    it('should calculate total price with discount correctly', () => {
        const index = 0; // Index of the product in the products array
        const result = calculateLocalTotalPrice();
        const expectedTotalPrice = products[index].totalPrice * products[index].quantity;

        // Assert that the result matches the expected total price
        expect(result).toBe(expectedTotalPrice);
    });
});
import { render, screen} from "@testing-library/react";
import {beforeEach, describe, expect, it, vi} from "vitest";
import {TotalBox} from "../Stages/StageTotal.tsx";
import {TotalProvider} from "../Context/TotalContext.tsx";
const productsDiscountsNotValid = [{
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
}]

const productsLocalDiscountValid= [{
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
const productsLocalAndGlobalDiscountValid= [{
    "id": "apple-bag",
    "name": "Apples",
    "price": 25,
    "description": "There are 5 apples in one bag",
    "currency": "DKK",
    "discountQuantity": 2,
    "discountPercent": 10,
    "upsellProductId": "organic apple-bag",
    "totalPrice": 500,
    "quantity": 20
}]

const expensiveProduct = [{
    "id": "golden-apple-bag",
    "name": "Golden Apple",
    "price": 300,
    "description": "more common than you think",
    "currency": "DKK",
    "discountQuantity": 1,
    "discountPercent": 10,
    "upsellProductId": "organic apple-bag",
    "totalPrice": 300,
    "quantity": 1
}]

const emptyBasket: Product[] = [];
const floatingDiscountProduct = [{
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
}]
const floatingTotalPriceProduct = [{
    "id": "banana-bag",
    "name": "Banana bag",
    "price": 15,
    "description": "One eco banana is approximately 105g. There are 5 bananas in one bag",
    "currency": "DKK",
    "discountQuantity": 5,
    "discountPercent": 10,
    "upsellProductId": null,
    "totalPrice": 390,
    "quantity": 26
}]
describe('TotalBox components', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    })
    it('should display the correct values of the products when do discounts are available', () => {
        const { getByText } = render(
           <TotalProvider>
                <TotalBox products={productsDiscountsNotValid}/>
           </TotalProvider>
        );

        expect(getByText('Total Price: 25.00 DKK')).toBeInTheDocument();
        expect(getByText('Get 10% discount when buying for 275.00 DKK more!'));
    });
    it('should display the correct values of the products when local discount is available', () => {
        const { getByText } = render(
            <TotalProvider>
                <TotalBox products={productsLocalDiscountValid}/>
            </TotalProvider>
        );

        expect(getByText('Total Price: 45.00 DKK')).toBeInTheDocument();
        expect(getByText('Get 10% discount when buying for 255.00 DKK more!'));
    });
    it('should display the correct values of the products when local and global discount is available', () => {
        const { getByText } = render(
            <TotalProvider>
                <TotalBox products={productsLocalAndGlobalDiscountValid}/>
            </TotalProvider>
        );

        expect(getByText('Total Price: 405.00 DKK')).toBeInTheDocument();
        expect(getByText('You get 10% discount!'));
    });
    it('should display the correct values of the products when price before any discount is 300', () => {
        const { getByText } = render(
            <TotalProvider>
                <TotalBox products={expensiveProduct}/>
            </TotalProvider>
        );

        expect(getByText('Total Price: 270.00 DKK')).toBeInTheDocument();
        expect(getByText('Get 10% discount when buying for 30.00 DKK more!'));
    });
    it('should display correct messages when basket is empty', () => {
        const { getByText } = render(
            <TotalProvider>
                <TotalBox products={emptyBasket}/>
            </TotalProvider>
        );

        expect(getByText('Total Price: 0.00 DKK')).toBeInTheDocument();
        expect(getByText('Get 10% discount when buying for 300.00 DKK more!'));
        expect(getByText('Total Quantity: 0')).toBeInTheDocument();

    });
    it('should not display more than 2 decimals on discount number ', () => {
        render(
            <TotalProvider>
                <TotalBox products={floatingDiscountProduct}/>
            </TotalProvider>
        );

        const paragraphElement = screen.getByTestId('discount-paragraph');

        if (paragraphElement) {
            // Extract the text content of the paragraph element
            const paragraphText = paragraphElement.textContent;

            // Extract the totalPriceDiscounted value from the text content
            const extractedPrice = parseFloat(paragraphText!.replace('Get 10% discount when buying for ', '').replace(' DKK more!', ''));

            // Assert that the extracted totalPriceDiscounted value matches the expected value
            expect(extractedPrice).toBe(8.4);
        }
    });
    it('should not display more than 2 decimals on totalprice number ', () => {
        render(
            <TotalProvider>
                <TotalBox products={floatingTotalPriceProduct}/>
            </TotalProvider>
        );

        const paragraphElement = screen.getByTestId('totalprice-paragraph');

        if (paragraphElement) {
            // Extract the text content of the paragraph element
            const paragraphText = paragraphElement.textContent;

            // Extract the totalPriceDiscounted value from the text content
            const extractedPrice = parseFloat(paragraphText!.replace('Total Price: ', '').replace(' DKK', ''));

            // Assert that the extracted totalPriceDiscounted value matches the expected value
            expect(extractedPrice).toBe(315.90);
        }
    })
});

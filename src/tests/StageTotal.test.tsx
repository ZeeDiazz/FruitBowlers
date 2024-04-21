import { render, screen} from "@testing-library/react";
import {beforeEach, describe, expect, it, vi} from "vitest";
import {TotalBox} from "../Stages/StageTotal.tsx";
import * as price from '../Components/price.ts';
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

vi.mock('../Components/price.ts', () => ({
    getTotalPriceDiscounted: vi.fn(),
    getTotalQuantity: vi.fn(),
    getDiscountMessage: vi.fn(),
}));
const totalQuantity = 2;
const totalPriceDiscounted = 50;
const discountMessage = 'Get 10% discount when buying for 250 DKK more!';

describe('TotalBox components', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        vi.spyOn(price, 'getTotalQuantity').mockReturnValue(totalQuantity);
        vi.spyOn(price, 'getTotalPriceDiscounted').mockReturnValue(totalPriceDiscounted);
        vi.spyOn(price, 'getDiscountMessage').mockReturnValue(discountMessage);
    })
    it('should display the correct values of the products', async () => {
        const { getAllByText } = render(<TotalBox products={products}/>);
        await screen.findByText('Total Price: 50 DKK');
        expect(getAllByText('Total Price: 50 DKK').length).toBeGreaterThan(0);
    });
    it('renders total box with correct quantity, discounted price, and discount message', () => {
        render(<TotalBox products={products} />);

        expect(screen.getByText(`Total Quantity: ${totalQuantity}`)).toBeInTheDocument();
        expect(screen.getByText(discountMessage)).toBeInTheDocument();
        expect(screen.getByText(`Total Price: ${totalPriceDiscounted} DKK`)).toBeInTheDocument();

        expect(price.getTotalQuantity).toHaveBeenCalledWith(products);
        expect(price.getTotalPriceDiscounted).toHaveBeenCalledWith(products);
        expect(price.getDiscountMessage).toHaveBeenCalledWith(totalPriceDiscounted);
    });
});

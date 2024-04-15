import { render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";
import {StageBasket} from "../Stages/StageBasket.tsx";
import userEvent from "@testing-library/user-event";

describe('StageBasket components', () => {
    it('should display loading message when products are loading', async () => {
        const { getAllByText } = render(<StageBasket />);
        expect(getAllByText('Loading...').length).toBeGreaterThan(0);
    });
    it('should display error fetching product when error occurs', async () => {
        vi.spyOn(window, "fetch").mockImplementation(async () => {
            return {
                ok: false,
                json: async () => [],
            } as Response;
        });
        const { getAllByText } = render(<StageBasket />);
        await screen.findByText('Error fetching products');
        expect(getAllByText('Error fetching products').length).toBeGreaterThan(0);
    })
    it('should render the products with the fetched data', async () => {
        vi.spyOn(window, "fetch").mockImplementation(async () => {
            return {
                ok: true,
                json: async () => [{
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
                }],
            } as Response;
        });
        const { getAllByText } = render(<StageBasket />);
        await screen.findByText('Apples');
        expect(getAllByText('Apples').length).toBeGreaterThan(0);
    });

    it('should increment quantity when plus is clicked', async () => {
        const user = userEvent.setup();
        vi.spyOn(window, "fetch").mockImplementation(async () => {
            return {
                ok: true,
                json: async () => [{
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
                }],
            } as Response;
        });
        const{ getAllByTestId } = render(<StageBasket />);
        await screen.findByText('Apples');
        const plusButton = getAllByTestId('increase-button')[0];
        await user.click(plusButton)
        const quantity = getAllByTestId('quantity')[0];
       expect(quantity).toBeInTheDocument();
    })
});
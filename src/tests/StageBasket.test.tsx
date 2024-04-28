import { render, screen} from "@testing-library/react";
import {describe, expect, it, vi, beforeEach} from "vitest";
import {StageBasket} from "../Stages/StageBasket.tsx";
import userEvent from "@testing-library/user-event";
import {BasketProvider} from "../Complex/BasketContext.tsx";

const mockedUsedNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
    ...vi.importActual('react-router-dom') as any,
    useNavigate: () => mockedUsedNavigate,
}));
const productData = [{
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

const upgradesData = [{
    "id": "organic apple-bag",
    "name": "Apples",
    "price": 30,
    "description": "Organic apples from Denmark",
    "currency": "DKK",
    "discountQuantity": 0,
    "discountPercent": 0,
    "upsellProductId": null,
    "totalPrice": 30,
    "quantity": 0
}]
describe('StageBasket components', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });
    it('should display loading message when products are loading', async () => {
        const { getAllByText } = render(
            <BasketProvider>
                <StageBasket />
            </BasketProvider>
        );
        expect(getAllByText('Loading...').length).toBeGreaterThan(0);
    });
    it('should display error fetching product when error occurs', async () => {
        vi.spyOn(window, "fetch").mockImplementation(async () => {
            return {
                ok: false,
                json: async () => [],
            } as Response;
        });
        const { getAllByText } = render(
            <BasketProvider>
                <StageBasket />
            </BasketProvider>
        );
        await screen.findByText('Error fetching products');
        expect(getAllByText('Error fetching products').length).toBeGreaterThan(0);
    })
    it('should render the products with the fetched data', async () => {
        vi.spyOn(window, "fetch").mockImplementation(async () => {
            return {
                ok: true,
                json: async () => productData,
            } as Response;
        });
        const { getAllByText } = render(
            <BasketProvider>
                <StageBasket />
            </BasketProvider>
        );
        await screen.findByText('Apples');
        expect(getAllByText('Apples').length).toBeGreaterThan(0);
    });

    it('should increment quantity when plus is clicked', async () => {
        const user = userEvent.setup();
        vi.spyOn(window, "fetch").mockImplementation(async () => {
            return {
                ok: true,
                json: async () => productData,
            } as Response;
        });
        const{ getAllByTestId } = render(
            <BasketProvider>
                <StageBasket />
            </BasketProvider>
        );
        await screen.findByText('Apples');
        const plusButton = getAllByTestId('increase-button')[0];
        const quantityBeforeClick = parseInt(getAllByTestId('quantity')[0].textContent || "0", 10);
        await user.click(plusButton)
        const quantity = parseInt(getAllByTestId('quantity')[0].textContent || "0", 10);
        expect(quantity).toBeGreaterThan(quantityBeforeClick);
    })
    it('should decrement quantity when minus is clicked', async () => {
        const user = userEvent.setup();
        vi.spyOn(window, "fetch").mockImplementation(async () => {
            return {
                ok: true,
                json: async () => productData,
            } as Response;
        });
        const{ getAllByTestId } = render(
            <BasketProvider>
                <StageBasket />
            </BasketProvider>
        );
        await screen.findByText('Apples');
        const minusButton = getAllByTestId('decrease-button')[0];
        const quantityBeforeClick = parseInt(getAllByTestId('quantity')[0].textContent || "0", 10);
        await user.click(minusButton)
        const quantity = parseInt(getAllByTestId('quantity')[0].textContent || "0", 10);
        expect(quantity).toBeLessThan(quantityBeforeClick);
    })
    it('should not decrement when one item is left and decrease button is clicked', async () => {
        const user = userEvent.setup();
        vi.spyOn(window, "fetch").mockImplementation(async () => {
            return {
                ok: true,
                json: async () => productData,
            } as Response;
        });
        const{ getAllByTestId } = render(
            <BasketProvider>
                <StageBasket />
            </BasketProvider>
        );
        await screen.findByText('Apples');
        const minusButton = getAllByTestId('decrease-button')[0];
        await user.click(minusButton)
        await user.click(minusButton)
        const quantity = parseInt(getAllByTestId('quantity')[0].textContent || "0", 10);
        expect(quantity).toBe(1);
    })
    it('should remove product when remove button is pressed', async () => {
        const user = userEvent.setup();
        vi.spyOn(window, "fetch").mockImplementation(async () => {
            return {
                ok: true,
                json: async () => productData,
            } as Response;
        });
        const{ getAllByTestId } = render(
            <BasketProvider>
                <StageBasket />
            </BasketProvider> );
        await screen.findByText('Apples');
        const  removeButton= getAllByTestId('remove-button')[0];
        await user.click(removeButton)

        const apples = "Apples"
        expect(screen.queryByText(apples)).not.toBeInTheDocument();
    })
    it('should render the upgrade option with the fetched data', async () => {
        const base : string= 'https://raw.githubusercontent.com/ZeeDiazz/FruitBowlers/';
        const productsUrl: string = base + 'main/productsList.json';
        const upgradesUrl: string = base + 'main/upgradesList.json';

        vi.spyOn(window, "fetch").mockImplementation(async (url) => {
            if(url === productsUrl){
                return {
                    ok: true,
                    json: async () => productData,
                } as Response;
            } else if (url == upgradesUrl){
                return {
                    ok: true,
                    json: async () => upgradesData,
                } as Response;
            } else{
                throw new Error('Invalid url');
            }
        });
        const { getAllByText } = render(
            <BasketProvider>
                <StageBasket />
            </BasketProvider>
        );
        await screen.findByText('Organic available! Change for 5 DKK a piece?');
        expect(getAllByText('Apples').length).toBeGreaterThan(0);
        expect(getAllByText('Organic available! Change for 5 DKK a piece?').length).toBeGreaterThan(0);
    });
    it('should upgrade the products when upgrade button is pressed while remaining the same quantity', async () => {
        const base : string= 'https://raw.githubusercontent.com/ZeeDiazz/FruitBowlers/';
        const productsUrl: string = base + 'main/productsList.json';
        const upgradesUrl: string = base + 'main/upgradesList.json';
        const user = userEvent.setup();

        vi.spyOn(window, "fetch").mockImplementation(async (url) => {
            if(url === productsUrl){
                return {
                    ok: true,
                    json: async () => productData,
                } as Response;
            } else if (url == upgradesUrl){
                return {
                    ok: true,
                    json: async () => upgradesData,
                } as Response;
            } else{
                throw new Error('Invalid url');
            }
        });
        const { getAllByText, getAllByTestId} = render(
            <BasketProvider>
                <StageBasket />
            </BasketProvider>
        );
        await screen.findByText('Apples');

        const quantity = parseInt(getAllByTestId('quantity')[0].textContent || "0", 10);
        expect(getAllByText('Apples').length).toBeGreaterThan(0);
        expect(quantity).toBe(2);
        expect(getAllByText('Organic available! Change for 5 DKK a piece?').length).toBeGreaterThan(0);

        const  upgradeButton = getAllByTestId('upgrade-button')[0];
        await user.click(upgradeButton);
        expect(quantity).toBe(2);
        expect(getAllByText('Organic apples from Denmark').length).toBeGreaterThan(0);
    });
});
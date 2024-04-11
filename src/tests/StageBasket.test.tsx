import {act, render, renderHook, screen} from "@testing-library/react";
import { describe, expect, it} from "vitest";
import { useFetch } from "../Components/useFetch.ts";
import {StageBasket} from "../Stages/StageBasket.tsx";

jest.mock('../Components/useFetch.ts', () => ({
    fetchData: jest.fn(),
}));
describe('StageBasket components', () => {
    it('should display loading message when products are loading', async () => {
        const { getAllByText } = render(<StageBasket />);
        expect(getAllByText('Loading...').length).toBeGreaterThan(3);
    });
    it('should display error fetching product when error occurs', async () => {

    })
    it('should fetch data', async () => {
        const base: string = 'https://raw.githubusercontent.com/ZeeDiazz/FruitBowlers/'
        const testUrl: string = base + 'main/productsList.json';

        const {result} = renderHook(() => useFetch(testUrl));
        expect(result.current.length).toBe(4);
        const [data, ,loading, error] = result.current
        expect(loading).toBe(true);
        expect(error).toBe(false);
        // when data is fetched the loading should be false
        await act(async () => {
            expect(loading).toBe(true);
        });
        expect(data).toBeDefined();
    });
    it('should render the products with the fetched data', async () => {
        const { getAllByText } = render(<StageBasket />);
        await screen.findByText('Apples');
        expect(getAllByText('Apples').length).toBeGreaterThan(0);
    });

    it('should increment quantity when plus is clicked', async () => {


    })
});
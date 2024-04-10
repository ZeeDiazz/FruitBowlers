import {act, render, renderHook, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import { useFetch } from "../Components/useFetch.ts";
import {StageBasket} from "../Stages/StageBasket.tsx";

/*global.fetch = jest.fn(() =>
    Promise.resolve({
        response: 'ok',
        json: () => Promise.resolve([{ id: 1, name: 'Apple'}])
    }
))*/
describe('StageBasket components', () => {
    it('should display loading message when products are loading', async () => {
        const { getAllByText } = render(<StageBasket />);
        expect(getAllByText('Loading...').length).toBeGreaterThan(0);
    });
    it('should display error fetching product when error occurs', async () => {

    })
    it('should fetch data', async () => {
        const base: string = 'https://raw.githubusercontent.com/ZeeDiazz/FruitBowlers/'
        const testUrl: string = base + 'main/productsList.json';

        const {result} = renderHook(() => useFetch(testUrl));
        expect(result.current.length).toBe(4);
        const [, ,loading, error] = result.current
        expect(loading).toBe(true);
        expect(error).toBe(false);
    });
    it('should display products', async () => {
        await act(async () => render(<StageBasket />));
        expect(screen.getByText('Apple')).toBeInTheDocument();
    });

    it('should increment quantity when plus is clicked', async () => {


    })
});
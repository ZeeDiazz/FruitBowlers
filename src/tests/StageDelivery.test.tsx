import {describe, expect, it, vi, beforeEach} from "vitest";
import { StageDelivery } from "../Stages/StageDelivery.tsx";
import { render, screen} from "@testing-library/react";
import {DeliveryProvider} from "../Complex/DeliveryContext.tsx";

const mockedUsedNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
    ...vi.importActual('react-router-dom') as any,
    useNavigate: () => mockedUsedNavigate,
}));

describe('StageDelivery components', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    })
    it('should validate zip codes with the api ', async () => {
        vi.spyOn(window, "fetch").mockImplementation(async () => {
            return {
                ok: true,
                json: async () => ({ nr: '2650', navn: 'Hvidovre' }),
            } as Response;
        });
        const { getAllByText } = render(
            <DeliveryProvider>
                <StageDelivery />
            </DeliveryProvider>
        );
        screen.getAllByText('Billing Address');
    });
})

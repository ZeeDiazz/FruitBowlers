import {render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";
import Payment from '../Stages/StagePayment.tsx';
import {PaymentProvider} from "../Context/PaymentContext.tsx";

const mockedUsedNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
    ...vi.importActual('react-router-dom') as any,
    useNavigate: () => mockedUsedNavigate,
}));
describe('payment stage', () => {
    it('should render', () => {
        render(
            <PaymentProvider>
                <Payment/>
            </PaymentProvider>
        );
        expect(screen.getByText('Payment')).toBeInTheDocument();
        expect(screen.getByText('Card')).toBeInTheDocument();
        expect(screen.getByText('Gift card')).toBeInTheDocument();
        expect(screen.getByText('Invoice')).toBeInTheDocument();
        expect(screen.getByText('Mobile-Pay')).toBeInTheDocument();
    });
})


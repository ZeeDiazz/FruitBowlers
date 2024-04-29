import {render, screen} from "@testing-library/react";
import {describe, expect, it, Mock, vi} from "vitest";
import Payment from '../Stages/StagePayment.tsx';
import {PaymentProvider} from "../Context/PaymentContext.tsx";
import {Navigation, RouteObject} from "react-router-dom";
import {DeliveryProvider} from "../Context/DeliveryContext.tsx";

const mockedUsedNavigate:Mock<object[], Navigation> = vi.fn();
vi.mock('react-router-dom', () => ({
    ...vi.importActual('react-router-dom') as RouteObject,
    useNavigate: () => mockedUsedNavigate,
}));
describe('payment stage', () => {
    it('should render', () => {
        render(
            <DeliveryProvider>
                <PaymentProvider>
                    <Payment/>
                </PaymentProvider>
            </DeliveryProvider>
        );
        expect(screen.getByText('Payment')).toBeInTheDocument();
        expect(screen.getByText('Card')).toBeInTheDocument();
        expect(screen.getByText('Gift card')).toBeInTheDocument();
        expect(screen.getByText('Continue')).toBeInTheDocument();
        expect(screen.getByText('MobilePay')).toBeInTheDocument();
    });
})


import {fireEvent, render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";
import Payment from '../Stages/StagePayment.tsx';

const mockedUsedNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
    ...vi.importActual('react-router-dom') as any,
    useNavigate: () => mockedUsedNavigate,
}));
describe('payment stage', () => {
    it('should render', () => {
        render(<Payment  isInvoiceEnabled totalDiscountedPrice={147.5}/>);
        expect(screen.getByText('Payment')).toBeInTheDocument();
        expect(screen.getByText('Card')).toBeInTheDocument();
        expect(screen.getByText('Gift card')).toBeInTheDocument();
        expect(screen.getByText('Invoice')).toBeInTheDocument();
        //expect(screen.getByText('Mobile-Pay')).toBeInTheDocument();
    });

    it('handles accept-terms checkbox behavior ', () => {
        render(<Payment  isInvoiceEnabled totalDiscountedPrice={147.5}/>);
        //Renders the checkbox text
        const paragraphElement = screen.getByText('* You need to accept terms')
        expect(paragraphElement).toBeInTheDocument()

        //Checks falsy/truthy
        const checkBox :HTMLInputElement = screen.getByTestId("AcceptTerms")
        expect(checkBox).toBeFalsy;
        fireEvent.click(checkBox);
        expect(checkBox).toBeChecked();
        expect(checkBox).toBeTruthy
    });

    it('handles receive marketing checkbox behavior ', () => {
        render(<Payment  isInvoiceEnabled totalDiscountedPrice={147.5}/>);
        //Renders the checkbox text
        const paragraphElement = screen.getByText('Receive marketing emails')
        expect(paragraphElement).toBeInTheDocument()

        //Checks falsy/truthy
        const checkBoxMarketing :HTMLInputElement = screen.getByTestId("Marketing-email")
        expect(checkBoxMarketing).toBeFalsy;
        fireEvent.click(checkBoxMarketing);
        expect(checkBoxMarketing).toBeChecked();
        expect(checkBoxMarketing).toBeTruthy
    });
})


import {fireEvent, render, screen} from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Payment from '../Stages/StagePayment.tsx';

describe('payment stage', () => {
    it('should render', () => {
        render(<Payment  isInvoiceEnabled totalDiscountedPrice={147.5}/>);
        expect(screen.getByText('Payment')).toBeInTheDocument();
    });

    it('handles checkbox behavior ', () => {
        render(<Payment  isInvoiceEnabled totalDiscountedPrice={147.5}/>);
        const checkBox :HTMLElement = screen.getByLabelText('Accept terms');

        fireEvent.click(checkBox);
        expect(checkBox).toBeChecked();
    });
})


import {render} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";
import {OrderCompleted} from "../Stages/StageComplete.tsx";
import userEvent from "@testing-library/user-event";

const mockedUsedNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
    ...vi.importActual('react-router-dom') as any,
    useNavigate: () => mockedUsedNavigate,
}));

describe('OrderCompleted stage', () => {
    it('should render', () => {
        const { getByTestId } = render(
            <OrderCompleted/>
        );
        const orderCompletionText = getByTestId('orderCompletionText');
        expect(orderCompletionText.textContent).toBe('Your order is completed!');
    });

    it('should render image correctly', () => {
        const { getByAltText } = render(
            <OrderCompleted />
        );
        const successImage = getByAltText('OrderCompleted');
        expect(successImage).toBeInTheDocument();
        expect(successImage).toBe(OrderCompleted);
    });




});


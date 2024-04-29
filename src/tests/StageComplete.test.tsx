import {render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";
import {OrderCompleted} from "../Stages/StageComplete.tsx";
import {RouteObject} from "react-router-dom";

const mockedUsedNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
    ...vi.importActual('react-router-dom') as RouteObject,
    useNavigate: () => mockedUsedNavigate,
}));

describe('OrderCompleted stage', () => {
    it('should render', () => {
        const { getByTestId } = render(
            <OrderCompleted/>
        );
        const orderCompletionText = getByTestId('orderCompletionText');
        expect(orderCompletionText.textContent).toBe('Your order is completed!');
        expect(screen.getByText('Continue Shopping')).toBeInTheDocument();
    });

    it('should render image correctly', () => {
        const { getByAltText } = render(
            <OrderCompleted />
        );
        const successImage = getByAltText('OrderCompleted');
        expect(successImage).toBeInTheDocument();
    });
});


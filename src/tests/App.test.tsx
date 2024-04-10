import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../App.tsx";
import {debug} from "vitest-preview";

describe(App.name, () => {
    it("should render each stage", () => {
        render(<App />);

        const imageHeader = screen.getByAltText('Fruit Bowlers logo')
        expect(imageHeader).toBeInTheDocument()
        //Text that always has to render
        //Headers of all sections / stages
        expect(screen.getByText("Basket")).toBeInTheDocument();
        expect(screen.getByText("Billing Address")).toBeInTheDocument();
        expect(screen.getByText("Payment")).toBeInTheDocument();
        expect(screen.getByText("Terms & Conditions")).toBeInTheDocument();
        debug();
    });
});




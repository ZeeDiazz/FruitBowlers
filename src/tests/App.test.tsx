import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../App.tsx";

describe(App.name, () => {
    it("should render", () => {
        render(<App />);
        //text that always has to be in the document
        //Headers of all sections
        expect(screen.getByText("Total")).toBeInTheDocument();
        expect(screen.getByText("Basket")).toBeInTheDocument();
        expect(screen.getByText("Delivery")).toBeInTheDocument();
        expect(screen.getByText("Payment")).toBeInTheDocument();
    });
});






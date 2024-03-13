import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe(App.name, () => {
    it("should render", () => {
        render(<App />);
        //text that always has to be in the document
        expect(screen.getByText("Fruit Bowlers")).toBeInTheDocument();
        expect(screen.getByText("Total")).toBeInTheDocument();
        expect(screen.getByText("Basket")).toBeInTheDocument();
    });
});


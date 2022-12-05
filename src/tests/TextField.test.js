import React from "react";
import TextField from "../components/TextField";
import { fireEvent, render } from "@testing-library/react-native";

describe("Testing TextField component", () => {
    it("Render test - TextField", () => {
        render(<TextField />)
    })

    it("Testing placeholder", () => {
        const { getByPlaceholderText } = render(<TextField placeholder="Enter text" />);
        expect(getByPlaceholderText("Enter text")).toBeTruthy();
    })

    it("Testing onChange event, testId", () => {
        const mockFn = jest.fn();
        const { getByTestId } = render(<TextField testId="input" onChange={mockFn} />);
        const inputField = getByTestId("input");

        fireEvent.changeText(inputField, "Text Changed");
        expect(mockFn).toHaveBeenCalledWith("Text Changed")
    })
})
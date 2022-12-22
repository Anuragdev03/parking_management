import React from "react";
import Button from "../components/Button";
import { fireEvent, render } from "@testing-library/react-native";

describe("Testing Button component", () => {
  it("Render test - Button", () => {
    const { getByText } = render(<Button text="Submit" />);
    expect(getByText(/submit/i)).toBeTruthy();
  });

  it("testing onPress functionality", () => {
    let mockFn = jest.fn();
    let ButtonComponent = render(<Button text="Submit" onPress={mockFn} />);

    expect(mockFn).not.toHaveBeenCalled();
    fireEvent.press(ButtonComponent.getByText(/submit/i));
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});

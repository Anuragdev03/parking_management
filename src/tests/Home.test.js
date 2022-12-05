import React from "react";
import { fireEvent, screen } from "@testing-library/react-native";
import Home from "../screens/Home";


describe("Testing Tome screen", () => {
    // Testing if the text field and submit button exist
  it("renders default elements", () => {
    renderWithRedux(<Home />);

    const textField = screen.getByTestId("Parking-create-text-input");
    const button = screen.getByTestId("Parking-create-submit-button");
    
    expect(textField).toBeTruthy();
    expect(button).toBeTruthy();
  });

  it("Testing the input field", () => {
    const { getByTestId } = renderWithRedux(<Home />);
    let TextField = getByTestId("Parking-create-text-input");
    let Button = getByTestId("Parking-create-submit-button");

    let onChangeMockFn = jest.fn();
    let onPressMockFn = jest.fn();

    fireEvent.changeText(TextField, onChangeMockFn("Text Changed"));
    expect(onChangeMockFn).toHaveBeenCalledWith("Text Changed");

    fireEvent.press(Button, onPressMockFn());
    expect(onPressMockFn).toHaveBeenCalled();
  })
});

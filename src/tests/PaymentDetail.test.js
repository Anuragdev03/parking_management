import React from "react";
import { fireEvent } from "@testing-library/react-native";
import PaymentDetail from "../screens/PaymentDetail";

describe("Testing Payment Screen", () => {
  it("Rendering Payment Detail screen", () => {
    renderWithRedux(<PaymentDetail />);
  });

  it("Checking Time spent is present in the screen", () => {
    const { getByTestId } = renderWithRedux(<PaymentDetail />);

    const timeSpent = getByTestId("deregister-time-spent");

    expect(timeSpent).toBeTruthy();
  });

  it("Checking Total cost is present in the screen", () => {
    const { getByTestId } = renderWithRedux(<PaymentDetail />);

    const timeSpent = getByTestId("deregister-charge");

    expect(timeSpent).toBeTruthy();
  });

  it("Testing Payment Button Functionality", () => {
    const { getByTestId } = renderWithRedux(<PaymentDetail />);

    const handleClick = jest.fn(() => console.log("Payment Button Pressed"));

    const PaymentButton = getByTestId("deregister-payment-button");
    fireEvent.press(PaymentButton, handleClick());

    expect(handleClick).toHaveBeenCalled();
  });
});

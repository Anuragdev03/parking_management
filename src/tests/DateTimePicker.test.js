import React from "react";
import { render } from "@testing-library/react-native";
import DateTime from "../components/DateTimePicker";

describe("Testing DateTimePicker component", () => {
  it("Testing the existance of input field and icons", () => {
    const { getByTestId } = render(<DateTime />);
    let inputField = getByTestId("input-field");
    let icon = getByTestId("date-time-icon");

    expect(inputField).toBeTruthy();
    expect(icon).toBeTruthy();
  });
});

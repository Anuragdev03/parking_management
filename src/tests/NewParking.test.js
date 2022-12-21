import React from "react";
import { fireEvent } from "@testing-library/react-native";
import NewParking from "../screens/NewParking";
import ParkingSlot from "../screens/NewParking/ParkingSlot";

describe("Testing NewParking screen", () => {
  jest.mock("react-native/Libraries/Utilities/Platform", () => {
    const platform = jest.requireActual(
      "react-native/Libraries/Utilities/Platform"
    );
    return {
      ...platform,
      constants: {
        ...platform.constants,
        reactNativeVersion: {
          major: 0,
          minor: 65,
          patch: 1,
        },
      },
    };
  });

  it("Vehicle Reg. No. TextField", () => {
    // Mock function
    const onChangeText = jest.fn((e) => console.log(e));

    const { getByTestId } = renderWithRedux(<NewParking />);

    const textField = getByTestId("parking-drawing registration-input");

    fireEvent.changeText(textField, onChangeText("Text changed"));

    expect(onChangeText).toHaveBeenCalledWith("Text changed");
  });

  it("Testing Submit Button", () => {
    const { getByTestId } = renderWithRedux(<NewParking />);

    const Button = getByTestId("parking-drawing-add-carbutton");

    const handlePress = jest.fn();

    fireEvent.press(Button, handlePress());
    expect(handlePress).toHaveBeenCalled();
  });

  it("Checking parking space", () => {
    const { getByTestId } = renderWithRedux(<ParkingSlot />);

    const parkingSpace = getByTestId("parking-drawing-space");
    expect(parkingSpace).toBeTruthy();
  });

  it("Checking parking space number", () => {
    const { getByTestId } = renderWithRedux(<ParkingSlot />);

    const parkingSpace = getByTestId("parking-drawing-space-number");
    expect(parkingSpace).toBeTruthy();
  });
});

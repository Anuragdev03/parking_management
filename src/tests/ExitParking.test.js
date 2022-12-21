import React from "react";
import { fireEvent } from "@testing-library/react-native";
import ExitParking from "../screens/ExitParking";

describe("Testing Exit Parking Screen", () => {
  it("Render Exit Screen", () => {
    renderWithRedux(<ExitParking />);
  });

  it("Check the Vehicle reg no. is present", () => {
    const { getByTestId } = renderWithRedux(<ExitParking />);
    const ParkedDataList = getByTestId("Parked-data-list");
    const ParkedVehicleNo = getByTestId("empty-component");

    expect(ParkedDataList).toBeTruthy();
    expect(ParkedVehicleNo).toBeTruthy();
  });
});

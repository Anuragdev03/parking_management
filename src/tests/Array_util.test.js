import { fireEvent, screen } from "@testing-library/react-native";
import ArrayMethod from "../utils/array";
import Data from "../Data/parkingSlot";

describe("Testing Array utility function", () => {
  it("Return Random data from the array", () => {
    let RequiredDataLength = 6;
    let randomData = ArrayMethod.getRandomElement(Data, RequiredDataLength);

    if (Array.isArray(randomData) && randomData.length === RequiredDataLength) {
      expect(randomData).toBeTruthy();
    } else {
      throw new Error("Test Failed");
    }
  });

  it("Exclude some data form the Array", () => {
    let RequiredDataLength = 6;
    let occupiedData = [ 1, 2 ,3, 4, 5,6,7 ]
    let randomData = ArrayMethod.getRandomElement(Data, RequiredDataLength, occupiedData);

    if (Array.isArray(randomData) && randomData.length === RequiredDataLength) {
      expect(randomData).toBeTruthy();
    } else {
      throw new Error("Test Failed");
    }
  });
});

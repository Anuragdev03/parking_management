import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createSlice } from "@reduxjs/toolkit";
import slotArray from "../Data/parkingSlot";


let data = [
  {
    token: 1,
    carRegNo: "Tn43",
  },
  {
    token: 2,
    carRegNo: "KL43",
  },
];

const initialState = {
  parkingSpace: 0,
  availableSpace: 20,
  occupiedSpace: data,
  selectedSpace: [],
  parkingSlotData: slotArray,
  carRegNo: "",
  parkingTime: "",
  occupiedIds: [],
};

const testSlice = createSlice({
  name: "newParking",
  initialState,
  reducers:{}
})

import parkingReducer from "../store/parking";

export function renderWithRedux(renderComponent) {
  const store = configureStore({
    reducer: testSlice.reducer,
  });
  return render(
    <NavigationContainer>
      <Provider store={store}>{renderComponent}</Provider>
    </NavigationContainer>
  );
}

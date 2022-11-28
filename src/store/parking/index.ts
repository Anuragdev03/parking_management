import { createSlice } from "@reduxjs/toolkit";
import slotArray from "../../Data/parkingSlot";

// Type
import { ReduxStoreInitialState } from "../../types";

const initialState: ReduxStoreInitialState = {
  parkingSpace: 0,
  availableSpace: 20,
  occupiedSpace: [],
  selectedSpace: [],
  parkingSlotData: slotArray,
  carRegNo: "",
  parkingTime: "",
  occupiedIds: []
};

export const parkingSlice = createSlice({
  name: "newParking",
  initialState,
  reducers: {
    updateParkingSpace(state, { payload }) {
      state.parkingSpace = payload ? payload : 0;
    },

    updateSelectedSpace(state, { payload }) {
      if (state.selectedSpace.length === 0) {
        state.selectedSpace = payload;
      } else {
        if (state.selectedSpace.length >= state.parkingSpace) {
          state.selectedSpace.shift();
        }

        state.selectedSpace = [...state.selectedSpace, payload];
      }
    },

    updateParkingTime(state, { payload }) {
      state.parkingTime = payload;
    },

    updateCarRegNo(state, { payload }) {
      state.carRegNo = payload;
    },

    updateOccupiedSpace(state, { payload }) {
      if (state.occupiedSpace.length > 0) {
        state.occupiedSpace = [...state.occupiedSpace, payload];
      } else {
        state.occupiedSpace = [payload];
      }
    },
    clearData(state) {
      state.selectedSpace = [];
      state.parkingSpace = 0;
      state.carRegNo = "";
      state.parkingTime = ""; 
    },
    updateOccupiedIds(state, { payload }) {
      if(state.occupiedIds?.length) {
        state.occupiedIds = [...state.occupiedIds, ...payload]
      } else {
        state.occupiedIds = payload;
      }
    },
    updateAvailableSpace(state) {
      state.availableSpace = 20 - Number(state?.occupiedIds?.length)
    },
    removeOccupiedSpace(state, { payload }) {
      state.occupiedSpace = payload;
    },
    removeOccupiedIds(state, { payload }) {
      state.occupiedIds = payload;
    }
  },
});

export const {
  updateParkingSpace,
  updateSelectedSpace,
  updateParkingTime,
  updateCarRegNo,
  updateOccupiedSpace,
  clearData,
  updateOccupiedIds,
  updateAvailableSpace,
  removeOccupiedSpace,
  removeOccupiedIds
} = parkingSlice.actions;

export default parkingSlice.reducer;

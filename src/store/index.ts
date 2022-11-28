import { configureStore } from "@reduxjs/toolkit";

// Reducer
import parkingReducer from "./parking";

export const store = configureStore({
    reducer: { parkingReducer }
})
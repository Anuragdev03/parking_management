import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react-native";
import { Provider } from "react-redux";

import parkingReducer from "../store/parking";

export function renderWithRedux(renderComponent) {
  const store = configureStore({
    reducer: parkingReducer,
  });
  return render(<Provider store={store}>{renderComponent}</Provider>);
}

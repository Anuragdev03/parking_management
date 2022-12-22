import React from "react";
import { render} from "@testing-library/react-native";
import SuccessScreen from "../screens/Success";

test("Render App component properly", () => {
    render(<SuccessScreen />);
})
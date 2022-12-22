import React from "react";
import { render} from "@testing-library/react-native";
import WarningScreen from "../screens/Warning";

test("Render App component properly", () => {
    render(<WarningScreen />);
})
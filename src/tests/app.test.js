import React from "react";
import { render} from "@testing-library/react-native";
import App from "../../App";

test("Render Home component properly", () => {
    render(<App />);
})
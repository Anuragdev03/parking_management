import React from "react";
import Button from "../components/Button";
import { render } from "@testing-library/react-native";

it("renders correctly", () => {
    const { debug } = render(<Button text="Submit" />);
    debug();
})
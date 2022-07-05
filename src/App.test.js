import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

describe("When viewing page", () => {
  it("Should generate a list", () => {
    const { getByTestId } = render(<App />);
    const orderedList = getByTestId("namelist");
    expect(orderedList).toBeInTheDocument();
  });
});

/*
describe("When viewing page", () => {
  beforeAll(() => {
    render(<App />);
  });

  it("Should generate a different order each time", () => {
    const orderedList = screen.getByTestId("namelist").querySelectorAll("li");
    const orderedList2 = screen.getByTestId("namelist").querySelectorAll("li");
    expect(orderedList).not.toBe(orderedList2);
  });
});
*/

describe("When adding a name to the list", () => {
  it("Should display a list containing the name entered", () => {
    const { getByTestId, getByRole } = render(<App />);
    const name = "Placeholder";
    let nameInput = getByTestId("nameInput");
    fireEvent.change(nameInput, { target: { value: "Placeholder" } });

    let nameForm = getByTestId("nameform");
    fireEvent.submit(nameForm);

    let nameList = getByTestId("namelist");
    expect(nameList).toHaveTextContent(name);
  });
});

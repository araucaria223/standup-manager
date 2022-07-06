import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

describe("When viewing page", () => {
  it("Should generate a list", () => {
    const { getByTestId } = render(<App />);
    const orderedList = getByTestId("nameList");
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
    const { getByTestId } = render(<App />);
    const name = "Placeholder";
    let nameInput = getByTestId("nameInput");
    fireEvent.change(nameInput, { target: { value: "Placeholder" } });

    let nameForm = getByTestId("nameform");
    fireEvent.submit(nameForm);

    const nameList = getByTestId("nameList");

    expect(nameList).toHaveTextContent(name);
  });
});

describe("When pressing the randomise button", () => {
  it("Should randomise the existing list.", () => {
    const { getByTestId } = render(<App />);

    let nameInput = getByTestId("nameInput");
    let nameForm = getByTestId("nameform");

    for (let index = 0; index < 10; index++) {
      fireEvent.change(nameInput, { target: { value: `Placeholder ${index}` } });
      fireEvent.submit(nameForm);
    }

    const nameList = getByTestId("nameList");
    console.log(nameList)

    const randomButton = getByTestId("randomButton");
    fireEvent.click(randomButton);

    const randomisedNameList = getByTestId("nameList");

    console.log(nameList);
    expect(nameList).not.toEqual(randomisedNameList);
  });
});


describe("When clicking the clear button", () => {
  it("Should clear the existing list", () => {
    const { getByTestId } = render(<App />);

    let nameInput = getByTestId("nameInput");
    let nameForm = getByTestId("nameform");

    fireEvent.change(nameInput, { target: { value: "Placeholder" } });
    fireEvent.submit(nameForm);
    
    const clearButton = getByTestId("clearButton");
    fireEvent.click(clearButton);

    const nameList = getByTestId("nameList");

    expect(nameList).not.toHaveTextContent("Placeholder");
  });
});
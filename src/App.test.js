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
  let nameList;
  let screen;
  beforeAll(() =>  {
    screen = render(<App />);
    let nameInput = screen.getByTestId("nameInput");
    let nameForm = screen.getByTestId("nameform");

    for (let index = 1; index < 10; index++) {
      fireEvent.change(nameInput, { target: { value: `Placeholder ${index}` } });
      fireEvent.submit(nameForm);
    }

    nameList = screen.getByTestId("nameList").innerHTML;
  });

  it("Should randomise the existing list.", () => {
    const randomButton = screen.getByTestId("randomButton");
    fireEvent.click(randomButton);

    const randomisedNameList = screen.getByTestId("nameList").innerHTML;

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
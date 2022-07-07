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

describe("When adding a name to the list", () => {
  it("Should display a list containing the name entered", () => {
    const { getByTestId } = render(<App />);
    const name = "Placeholder";
    let nameInput = getByTestId("nameInput");
    fireEvent.change(nameInput, { target: { value: "Placeholder" } });

    let nameForm = getByTestId("nameForm");
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
    let nameForm = screen.getByTestId("nameForm");

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

    const nameInput = getByTestId("nameInput");
    const nameForm = getByTestId("nameForm");

    fireEvent.change(nameInput, { target: { value: "Placeholder" } });
    fireEvent.submit(nameForm);
    
    const clearButton = getByTestId("clearButton");
    fireEvent.click(clearButton);

    const nameList = getByTestId("nameList");

    expect(nameList).not.toHaveTextContent("Placeholder");
  });
});

describe("When clicking the list item remove button", () => {
  it("Should remove the list item where the remove button was clicked", () => {
    const { getByTestId } = render(<App />);

    const nameInput = getByTestId("nameInput");
    const nameForm = getByTestId("nameForm");

    fireEvent.change(nameInput, { target: { value: "Placeholder" } });
    fireEvent.submit(nameForm);

    
    const listItem = getByTestId("name-0");
    fireEvent.click(listItem.querySelector("button"));

    expect(listItem).not.toBeInTheDocument();
  });
});
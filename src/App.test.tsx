import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import App from "./App";
import { lightTheme } from "./theme";

describe("When viewing page", () => {
  beforeAll(() => {
    render(<App />);
  });

  it("Should generate a list", () => {
    const orderedList = screen.getByTestId("nameList");
    expect(orderedList).toBeInTheDocument();
  });
});

describe("When adding a name to the list", () => {
  let nameInput: HTMLElement, nameForm: HTMLElement, name: string;
  beforeAll(() => {
    render(<App />);

    nameInput = screen.getByTestId("nameInput");
    nameForm = screen.getByTestId("nameForm");
    name = "Placeholder";
  });

  it("Should display a list containing the name entered", () => {
    fireEvent.change(nameInput, { target: { value: name } });
    fireEvent.submit(nameForm);

    const nameList = screen.getByTestId("nameList");

    expect(nameList).toHaveTextContent(name);
  });

  it("Should change the URL to contain the name entered", () => {
    const url = new URL(window.location.href);

    expect(url.toString()).toContain(name);
  });
});

describe("When pressing the randomise button", () => {
  let nameList: string, randomButton, url: URL;

  beforeAll(() => {
    render(<App />);

    const nameInput = screen.getByTestId("nameInput");
    const nameForm = screen.getByTestId("nameForm");

    for (let index = 1; index < 10; index++) {
      fireEvent.change(nameInput, {
        target: { value: `Placeholder ${index}` },
      });
      fireEvent.submit(nameForm);
    }

    nameList = screen.getByTestId("nameList").innerHTML;
    randomButton = screen.getByTestId("randomButton");
    url = new URL(window.location.href);
    fireEvent.click(randomButton);
  });

  it("Should randomise the existing list.", () => {
    const randomisedNameList = screen.getByTestId("nameList").innerHTML;

    expect(nameList).not.toEqual(randomisedNameList);
  });

  it("Should change the URL to match the randomised list", () => {
    const randomisedUrl = new URL(window.location.href);
    expect(url.toString()).not.toEqual(randomisedUrl.toString());
  });
});

describe("When clicking the clear button", () => {
  let clearButton: HTMLElement, name: string;
  beforeAll(() => {
    render(<App />);

    name = "Placeholder";

    const nameInput = screen.getByTestId("nameInput");
    const nameForm = screen.getByTestId("nameForm");

    fireEvent.change(nameInput, { target: { value: name } });
    fireEvent.submit(nameForm);

    clearButton = screen.getByTestId("clearButton");
  });

  it("Should clear the existing list", () => {
    fireEvent.click(clearButton);

    const nameList = screen.getByTestId("nameList");

    expect(nameList).not.toHaveTextContent(name);
  });

  it("Should remove all list items from the URL", () => {
    const url = new URL(window.location.href);

    expect(url.toString).not.toContain(name);
  });
});

describe("When clicking the list item remove button", () => {
  let name: string, listItem: HTMLButtonElement;
  beforeAll(() => {
    render(<App />);

    name = "Placeholder";

    const nameInput = screen.getByTestId("nameInput");
    const nameForm = screen.getByTestId("nameForm");

    fireEvent.change(nameInput, { target: { value: name } });
    fireEvent.submit(nameForm);

    listItem = screen.getByTestId("name-0");
    fireEvent.click(listItem.querySelector("button") as HTMLButtonElement);
  });

  it("Should remove the list item where the remove button was clicked", () => {
    expect(listItem).not.toBeInTheDocument();
  });

  it("Should remove the list item deleted from the URL", () => {
    const url = new URL(window.location.href);

    expect(url.toString()).not.toContain(name);
  });
});

describe("When clicking the theme toggle button", () => {
  beforeAll(() => {
    render(<App />);
  });

  it("Should change the theme", () => {
    const themeButton = screen.getByTestId("themeButton");
    fireEvent.click(themeButton);

    expect(themeButton).toHaveStyle(
      `background-color: ${lightTheme.colors.mantle}`
    );
  });
});

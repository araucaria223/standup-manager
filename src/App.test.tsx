import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";
import { lightTheme } from "./theme";

const name: string = "John Doe";

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
  let nameInput: HTMLElement, nameFormSubmit: HTMLButtonElement;
  beforeAll(() => {
    render(<App />);

    nameInput = screen.getByTestId("nameInput");
    nameFormSubmit = screen.getByTestId("nameFormSubmit");
  });

  it("Should display a list containing the name entered", () => {
    userEvent.type(nameInput, name);
    userEvent.click(nameFormSubmit);

    const nameList = screen.getByTestId("nameList");

    expect(nameList).toHaveTextContent(name);
  });

  it("Should change the URL to contain the name entered", () => {
    const url = new URL(window.location.href);

    expect(url.toString()).toContain(name.replace(" ", "+"));
  });
});

describe("When pressing the randomise button", () => {
  let nameList: string, randomButton, url: URL;

  beforeAll(() => {
    render(<App />);

    const nameInput = screen.getByTestId("nameInput");
    const nameFormSubmit = screen.getByTestId("nameFormSubmit");

    for (let index = 1; index < 10; index++) {
      userEvent.type(nameInput, `Placeholder ${index}`);
      userEvent.click(nameFormSubmit);
    }

    nameList = screen.getByTestId("nameList").innerHTML;
    randomButton = screen.getByTestId("randomButton");
    url = new URL(window.location.href);
    userEvent.click(randomButton);
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
  let clearButton: HTMLButtonElement;
  beforeAll(() => {
    render(<App />);

    const nameInput = screen.getByTestId("nameInput");
    const nameFormSubmit = screen.getByTestId("nameFormSubmit");

    userEvent.type(nameInput, name);
    userEvent.click(nameFormSubmit);

    clearButton = screen.getByTestId("clearButton");
  });

  it("Should clear the existing list", () => {
    userEvent.click(clearButton);

    const nameList = screen.getByTestId("nameList");

    expect(nameList).not.toHaveTextContent(name);
  });

  it("Should remove all list items from the URL", () => {
    const url = new URL(window.location.href);

    expect(url.toString).not.toContain(name.replace(" ", "+"));
  });
});

describe("When clicking the list item remove button", () => {
  let listItem: HTMLButtonElement;
  beforeAll(() => {
    render(<App />);

    const nameInput = screen.getByTestId("nameInput");
    const nameFormSubmit = screen.getByTestId("nameFormSubmit");

    userEvent.type(nameInput, name);
    userEvent.click(nameFormSubmit);

    listItem = screen.getByTestId("name-0");
    userEvent.click(listItem.querySelector("button") as HTMLButtonElement);
  });

  it("Should remove the list item where the remove button was clicked", () => {
    expect(listItem).not.toBeInTheDocument();
  });

  it("Should remove the list item deleted from the URL", () => {
    const url = new URL(window.location.href);

    expect(url.toString()).not.toContain(name.replace(" ", "+"));
  });
});

describe("When clicking the theme toggle button", () => {
  beforeAll(() => {
    render(<App />);
  });

  it("Should change the theme", () => {
    const themeButton = screen.getByTestId("themeButton");
    userEvent.click(themeButton);

    expect(themeButton).toHaveStyle(
      `background-color: ${lightTheme.colors.mantle}`
    );
  });
});

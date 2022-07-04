import { render, screen } from "@testing-library/react";
import App from "./App";

describe("When viewing page", () => {
  beforeAll(() => {
    render(<App />);
  });

  it("Should generate a list", () => {
    const orderedList = screen.getByTestId("namelist");
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

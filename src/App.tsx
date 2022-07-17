import React, { useState, ComponentType } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import {
  GlobalStyle,
  ContentWrapper,
  TitleWrapper,
  ThemeButton,
  NavWrapper,
  AddButton,
  NameInput,
  ActionButtonWrapper,
  ActionButton,
  NameList,
  NameItem,
} from "./styles";

function App(): any {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [names, setNames] = useState<Array<string>>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const url = new URL(window.location.href);

  let urlQueryParams = url.searchParams.get("names") || "";
  let queryParams = urlQueryParams.split(",").filter((e) => e);

  function setQueryParams(params: Array<string>, replace = true) {
    const url = new URL(window.location.href);
    url.searchParams.set("names", params.toString());

    if (replace) {
      window.history.replaceState({}, "", url);
    } else {
      window.history.pushState({}, "", url);
    }
  }

  function handleThemeToggle() {
    setDarkMode(!darkMode);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedInputValue = inputValue.trim();
    if (trimmedInputValue === "" || trimmedInputValue === "​") {
      return false;
    }

    let newNames: Array<string> = [...names, trimmedInputValue];
    setNames(newNames);
    setInputValue("");

    setQueryParams(newNames);
  }

  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    setInputValue(target.value);
  }

  function handleRandomise() {
    let newNames = names.sort(() => Math.random() - 0.5);

    setNames([...newNames]);
    setQueryParams(newNames);
  }

  function handleCopy() {
    let copyText = "";
    names.forEach((name, index) => {
      copyText += `${index + 1}. ${name}\n`;
    });
    navigator.clipboard.writeText(copyText);
  }

  function handleClear() {
    setNames([]);
    setQueryParams([], false);
  }

  function handleListItemDelete(event: Event) {
    const target = event.target as HTMLButtonElement;
    const indexToDelete = parseInt(
      target.parentElement?.getAttribute("order") || "0"
    );

    names.splice(indexToDelete, 1);
    setNames([...names]);

    setQueryParams(names);
  }

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <ThemeButton
        bgcolor="mantle"
        color="text"
        data-testid="themeButton"
        onClick={handleThemeToggle}
        visible="always"
      >
        {darkMode ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 512 512"
          >
            <path d="M256 159.1c-53.02 0-95.1 42.98-95.1 95.1S202.1 351.1 256 351.1s95.1-42.98 95.1-95.1S309 159.1 256 159.1zM509.3 347L446.1 255.1l63.15-91.01c6.332-9.125 1.104-21.74-9.826-23.72l-109-19.7l-19.7-109c-1.975-10.93-14.59-16.16-23.72-9.824L256 65.89L164.1 2.736c-9.125-6.332-21.74-1.107-23.72 9.824L121.6 121.6L12.56 141.3C1.633 143.2-3.596 155.9 2.736 164.1L65.89 256l-63.15 91.01c-6.332 9.125-1.105 21.74 9.824 23.72l109 19.7l19.7 109c1.975 10.93 14.59 16.16 23.72 9.824L256 446.1l91.01 63.15c9.127 6.334 21.75 1.107 23.72-9.822l19.7-109l109-19.7C510.4 368.8 515.6 356.1 509.3 347zM256 383.1c-70.69 0-127.1-57.31-127.1-127.1c0-70.69 57.31-127.1 127.1-127.1s127.1 57.3 127.1 127.1C383.1 326.7 326.7 383.1 256 383.1z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 512 512"
          >
            <path d="M32 256c0-123.8 100.3-224 223.8-224c11.36 0 29.7 1.668 40.9 3.746c9.616 1.777 11.75 14.63 3.279 19.44C245 86.5 211.2 144.6 211.2 207.8c0 109.7 99.71 193 208.3 172.3c9.561-1.805 16.28 9.324 10.11 16.95C387.9 448.6 324.8 480 255.8 480C132.1 480 32 379.6 32 256z" />
          </svg>
        )}
      </ThemeButton>
      <ContentWrapper>
        <TitleWrapper>
          <h1>Standup Manager</h1>
          <span>Enter names to continue</span>
        </TitleWrapper>
        <NavWrapper>
          <form data-testid="nameForm" onSubmit={handleSubmit}></form>
        </NavWrapper>
      </ContentWrapper>
    </ThemeProvider>
  );
}

export default App;

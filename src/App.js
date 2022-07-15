import React, { useState } from "react";
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

function App() {
  const url = new URL(window.location);

  let searchParams;
  try {
    searchParams = url.searchParams.get("names").split(",");
  } catch (err) {
    searchParams = [];
  }

  if (searchParams[0] === "" && searchParams.length === 1) {
    searchParams = [];
  }
  const [darkMode, setDarkMode] = useState(true);
  const [names, setNames] = useState(searchParams);
  const [inputValue, setInputValue] = useState("");

  function setQueryParams(params, mode = "replace") {
    const url = new URL(window.location);

    url.searchParams.set("names", params);

    if (mode === "replace") {
      window.history.replaceState({}, "", url);
    } else if (mode === "push") {
      window.history.pushState({}, "", url);
    } else {
      console.error("Invalid query params mode");
    }
  }

  function handleThemeToggle() {
    setDarkMode(!darkMode);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedInputValue = inputValue.trim();
    if (trimmedInputValue === "" || trimmedInputValue === "​") {
      return false;
    }

    let newNames = [...names, trimmedInputValue];
    setNames(newNames);
    setInputValue("");

    setQueryParams(newNames.toString());
  }

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  function handleRandomise() {
    let newNames = names.sort(() => Math.random() - 0.5);

    setNames([...newNames]);

    setQueryParams(newNames.toString());
  }

  function handleClear() {
    setNames([]);

    setQueryParams("", "push");
  }

  function handleListItemDelete(event) {
    const indexToDelete = parseInt(
      event.target.parentElement.getAttribute("index")
    );

    names.splice(indexToDelete, 1);
    setNames([...names]);

    setQueryParams(names.toString());
  }

  function handleCopy() {
    let copyText = "";
    names.forEach((name, index) => {
      copyText += `${index + 1}. ${name}\n`;
    });
    navigator.clipboard.writeText(copyText);
  }

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <ThemeButton
        bgcolor="mantle"
        color="text"
        data-testid="themeButton"
        onClick={handleThemeToggle}
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
          <h1>Standup manager</h1>
          <span>Enter names to continue</span>
        </TitleWrapper>
        <NavWrapper>
          <form data-testid="nameForm" onSubmit={handleSubmit}>
            <NameInput
              type="text"
              name="Name"
              placeholder="Name"
              id="nameInput"
              data-testid="nameInput"
              autoComplete="off"
              value={inputValue}
              maxLength="60"
              onChange={handleChange}
            ></NameInput>
            <AddButton type="submit">
              <strong>Add to list</strong>
            </AddButton>
          </form>
        </NavWrapper>
        <ActionButtonWrapper>
          <ActionButton
            bgcolor="lavender"
            title="Randomise list"
            data-testid="randomButton"
            onClick={handleRandomise}
          >
            <svg
              height="20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M424.1 287c-15.13-15.12-40.1-4.426-40.1 16.97V352H336L153.6 108.8C147.6 100.8 138.1 96 128 96H32C14.31 96 0 110.3 0 128s14.31 32 32 32h80l182.4 243.2C300.4 411.3 309.9 416 320 416h63.97v47.94c0 21.39 25.86 32.12 40.99 17l79.1-79.98c9.387-9.387 9.387-24.59 0-33.97L424.1 287zM336 160h47.97v48.03c0 21.39 25.87 32.09 40.1 16.97l79.1-79.98c9.387-9.391 9.385-24.59-.0013-33.97l-79.1-79.98c-15.13-15.12-40.99-4.391-40.99 17V96H320c-10.06 0-19.56 4.75-25.59 12.81L254 162.7L293.1 216L336 160zM112 352H32c-17.69 0-32 14.31-32 32s14.31 32 32 32h96c10.06 0 19.56-4.75 25.59-12.81l40.4-53.87L154 296L112 352z" />
            </svg>
          </ActionButton>
          <ActionButton
            bgcolor="yellow"
            title="Copy list to clipboard"
            data-testid="copyButton"
            onClick={handleCopy}
          >
            <svg
              height="20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M384 96L384 0h-112c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48H464c26.51 0 48-21.49 48-48V128h-95.1C398.4 128 384 113.6 384 96zM416 0v96h96L416 0zM192 352V128h-144c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48h192c26.51 0 48-21.49 48-48L288 416h-32C220.7 416 192 387.3 192 352z" />
            </svg>
          </ActionButton>
          <ActionButton
            bgcolor="red"
            title="Clear list"
            data-testid="clearButton"
            onClick={handleClear}
          >
            <svg
              height="18"
              width="18"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z" />
            </svg>
          </ActionButton>
        </ActionButtonWrapper>
        <NameList data-testid="nameList">
          {names.map((item, index) => {
            return (
              <NameItem
                key={`${item}-${index}`}
                data-testid={`name-${index}`}
                index={index}
              >
                <span>{item}</span>
                <ActionButton
                  bgcolor="red"
                  visible="on-hover"
                  title="Remove from list"
                  onClick={handleListItemDelete}
                  aria-describedby="Remove from list"
                >
                  <strong>-</strong>
                </ActionButton>
              </NameItem>
            );
          })}
        </NameList>
      </ContentWrapper>
    </ThemeProvider>
  );
}

export default App;

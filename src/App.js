import React, { useState } from "react";

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
    <>
      <div className="content-wrapper">
        <div className="title-wrapper">
          <h1>Standup manager</h1>
          <span>Enter names to continue</span>
        </div>
        <div className="nav-wrapper">
          <form data-testid="nameForm" onSubmit={handleSubmit}>
            <input
              type="text"
              name="Name"
              placeholder="Name"
              id="nameInput"
              data-testid="nameInput"
              autoComplete="off"
              value={inputValue}
              maxLength="100"
              onChange={handleChange}
            ></input>
            <button type="submit" className="add-button">
              <strong>Add to list</strong>
            </button>
          </form>
        </div>
        <div className="button-container">
          <button
            title="Randomise list"
            className="random-button"
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
          </button>
          <button
            title="Copy list to clipboard"
            className="copy-button"
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
          </button>
          <button
            title="Clear list"
            className="clear-button"
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
          </button>
        </div>
        <ol data-testid="nameList">
          {names.map((item, index) => {
            return (
              <li
                key={`${item}-${index}`}
                data-testid={`name-${index}`}
                index={index}
              >
                <span>{item}</span>
                <button
                  title="Remove from list"
                  onClick={handleListItemDelete}
                  className="item-remove-button"
                  aria-describedby="Remove from list"
                >
                  <strong>-</strong>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
}

export default App;

import React, { useState } from "react";

function App() {
  const url = new URL(window.location);
  let searchParams;
  try {
    searchParams = url.searchParams.get("names").split(",");
  } catch(err) {
    searchParams = []
  }

  if (searchParams[0] === "" && searchParams.length === 1) {
    searchParams = [];
  }

  const [names, setNames] = useState(searchParams);
  const [inputValue, setInputValue] = useState("");

  function setQueryParams(params) {
    const url = new URL(window.location);

    url.searchParams.set("names", params);
    window.history.replaceState({}, '', url);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (inputValue === "") {
      return false;
    }

    let newNames = [...names, inputValue.trim()]
    setNames(newNames);
    setInputValue("");

    setQueryParams(newNames.toString());
  }

  function handleChange(event) {
    setInputValue(event.target.value);
  }
  
  function handleRandomise() {
    let newNames = names.sort(() => Math.random() - 0.5); 

    setNames([ ...newNames ]);

    setQueryParams(newNames.toString());
  }

  function handleClear() {
    setNames([]);

    setQueryParams("");
  }

  function handleListItemDelete(event) {
    const indexToDelete = parseInt(event.target.parentElement.getAttribute("index"));

    names.splice(indexToDelete, 1);
    setNames([ ...names ]);

    setQueryParams(names.toString());
  }

  function handleCopy() {
    let copyText = "";
    names.forEach((name, index) => {
      copyText += `${index + 1}. ${name}\n`
    });
    navigator.clipboard.writeText(copyText);
  }

  return (
    <>
      <div className="content-wrapper">
        <div className="title-wrapper">
          <h1>Standup manager version 1.0.0</h1>
          <span>Enter names to continue</span>
        </div>
        <div className="nav-wrapper">
          <form
            data-testid="nameForm"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="Name"
              placeholder="Name"
              id="nameInput"
              data-testid="nameInput"
              autoComplete="off"
              value={inputValue}
              onChange={handleChange}
            ></input>
            <button type="submit" className="add-button">
              Add to list
            </button>
          </form>
        </div>
        <div className="button-container">
          <button title="Randomise list" type="button" className="random-button" data-testid="randomButton" onClick={handleRandomise}>
            <svg height="20" width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M447.1 224c0-12.56-4.781-25.13-14.35-34.76l-174.9-174.9C249.1 4.786 236.5 0 223.1 0C211.4 0 198.9 4.786 189.2 14.35L14.35 189.2C4.783 198.9-.0011 211.4-.0011 223.1c0 12.56 4.785 25.17 14.35 34.8l174.9 174.9c9.625 9.562 22.19 14.35 34.75 14.35s25.13-4.783 34.75-14.35l174.9-174.9C443.2 249.1 447.1 236.6 447.1 224zM96 248c-13.25 0-23.1-10.75-23.1-23.1s10.75-23.1 23.1-23.1S120 210.8 120 224S109.3 248 96 248zM224 376c-13.25 0-23.1-10.75-23.1-23.1s10.75-23.1 23.1-23.1s23.1 10.75 23.1 23.1S237.3 376 224 376zM224 248c-13.25 0-23.1-10.75-23.1-23.1s10.75-23.1 23.1-23.1S248 210.8 248 224S237.3 248 224 248zM224 120c-13.25 0-23.1-10.75-23.1-23.1s10.75-23.1 23.1-23.1s23.1 10.75 23.1 23.1S237.3 120 224 120zM352 248c-13.25 0-23.1-10.75-23.1-23.1s10.75-23.1 23.1-23.1s23.1 10.75 23.1 23.1S365.3 248 352 248zM591.1 192l-118.7 0c4.418 10.27 6.604 21.25 6.604 32.23c0 20.7-7.865 41.38-23.63 57.14l-136.2 136.2v46.37C320 490.5 341.5 512 368 512h223.1c26.5 0 47.1-21.5 47.1-47.1V240C639.1 213.5 618.5 192 591.1 192zM479.1 376c-13.25 0-23.1-10.75-23.1-23.1s10.75-23.1 23.1-23.1s23.1 10.75 23.1 23.1S493.2 376 479.1 376z"/></svg> 
          </button>
          <button title="Copy list to clipboard" type="button" className="copy-button" data-testid="copyButton" onClick={handleCopy}>
            <svg height="20" width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M384 96L384 0h-112c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48H464c26.51 0 48-21.49 48-48V128h-95.1C398.4 128 384 113.6 384 96zM416 0v96h96L416 0zM192 352V128h-144c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48h192c26.51 0 48-21.49 48-48L288 416h-32C220.7 416 192 387.3 192 352z"/></svg>
          </button>
          <button title="Clear list" type="button" className="clear-button" data-testid="clearButton" onClick={handleClear}>
            <svg height="18" width="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"/></svg>
          </button>
        </div>
        <ol data-testid="nameList">
          {names
            .map((item, index) => {
              return (
                <li key={`${item}-${index}`} data-testid={`name-${index}`} index={index}>
                  <span>
                    {item}
                  </span>
                  <button title="Remove from list" onClick={handleListItemDelete} className="item-remove-button">-</button>
                </li>
              )
            })}
        </ol>
      </div>
    </>
  );
}

export default App;
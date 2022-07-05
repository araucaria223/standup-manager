import React, { useState } from "react";

function App() {
  const [names, setNames] = useState([]);
  const [inputValue, setInputValue] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (inputValue === "") {
      return false;
    }

    let newArray = [...names, inputValue].sort(() => Math.random() - 0.5);
    setNames(newArray);
    setInputValue("");
  }

  function handleChange(event) {
    event.preventDefault();
    setInputValue(event.target.value);
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
            data-testid="nameform"
            onSubmit={(event) => handleSubmit(event)}
          >
            <input
              type="text"
              name="Name"
              placeholder="Name"
              id="nameInput"
              data-testid="nameInput"
              autoComplete="off"
              value={inputValue}
              onChange={(event) => handleChange(event)}
            ></input>
            <button type="submit" className="add-button">
              Add to list
            </button>
          </form>
        </div>
        <ol data-testid="namelist">
          {names
            .map((i, index) => (
              <li key={index}>
                {i}
              </li>
            ))}
        </ol>
      </div>
    </>
  );
}

export default App;
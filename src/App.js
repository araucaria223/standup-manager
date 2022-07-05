import React, { useState } from "react";

function App() {
  // Array shuffling function now obolete
  // Like always, there's a builtin for that.
  /*
  function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array
  }
  */

  const [names, setNames] = useState([]);
  const [inputValue, setInputValue] = useState("");

  /*
  const names = [
    "Dan",
    "Georgina",
    "Giles",
    "JB",
    "Qas",
    "Sam",
    "Shabana",
    "Stevie"
  ];
  */

  function handleSubmit(event) {
    event.preventDefault();
    if (inputValue === "") {
      return false;
    }

    let newArray = [...names, event.target[0].value];
    setNames(newArray);
    setInputValue("");
  }

  function handleChange(event) {
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
        <ol data-testid="namelist">
          {names
            .sort(() => Math.random() - 0.5)
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

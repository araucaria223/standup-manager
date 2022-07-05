import { useState } from "react";

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
            onSubmit={(event) => {
              event.preventDefault();
              const nameInput = document.getElementById("nameInput");
              if (nameInput.value === "") {
                return false;
              }
              let newArray = [...names, event.target[0].value];
              setNames(newArray);
              nameInput.value = "";
              nameInput.focus();
            }}
          >
            <input
              type="text"
              name="Name"
              placeholder="Name"
              id="nameInput"
              data-testid="nameInput"
              autoComplete="off"
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
                {i} <button className="remove-button">-</button>
              </li>
            ))}
        </ol>
      </div>
    </>
  );
}

export default App;

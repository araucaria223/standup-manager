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
      <form
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
        ></input>
        <button type="submit">button</button>
      </form>
      <ol data-testid="namelist">
        {names
          .sort(() => Math.random() - 0.5)
          .map((i, index) => (
            <li key={index}>{i}</li>
          ))}
      </ol>
    </>
  );
}

export default App;

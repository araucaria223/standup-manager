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

  const names = ["Dan",
                 "Sam",
                 "Giles",
                 "Stevie",
                 "Georgina",
                 "Shabana",
                 "Qas",
                 "JB"];
  
  return (
    names.sort( ()=>Math.random()-0.5 ).map((i) => <li>{i}</li>)
  );
}

export default App;
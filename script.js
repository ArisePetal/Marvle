function submitGuess() {
  const guess = document.getElementById('guessInput').value.toLowerCase();
  console.log('Guess:', guess); // Add this to debug the guess value

  const table = document.getElementById('guessesTable').getElementsByTagName('tbody')[0];

  // Check if the hero has already been added to the table
  const existingHero = Array.from(table.rows).some(row => row.cells[0].textContent.toLowerCase() === guess);
  if (existingHero) {
    alert("This hero has already been guessed!");
    return; // Exit the function if the hero has already been guessed
  }

  fetch('https://raw.githubusercontent.com/ArisePetal/Marvle/main/data/heroes.json')
    .then(response => response.json())
    .then(data => {
      let foundHero = data.find(hero => hero.hero.toLowerCase() === guess);
      console.log('Found Hero:', foundHero); // Add this to debug if the hero is found

      if (foundHero) {
        const date = new Date(foundHero.firstAppearance);
        const options = { year: 'numeric', month: 'long' };
        const formattedDate = date.toLocaleDateString('en-US', options);

        const newRow = table.insertRow();
        newRow.insertCell(0).textContent = foundHero.hero;
        newRow.insertCell(1).textContent = foundHero.role;
        newRow.insertCell(2).textContent = foundHero.affiliation.join(', ');
        newRow.insertCell(3).textContent = foundHero.teamUp.join(', ');
        newRow.insertCell(4).textContent = formattedDate;
      } else {
        alert("Hero not found!");
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

function submitGuess() {
  const guess = document.getElementById('guessInput').value.toLowerCase();
  const table = document.getElementById('guessesTable').getElementsByTagName('tbody')[0];

  // Fetch the hero data
  fetch('https://raw.githubusercontent.com/ArisePetal/Marvle/main/heroes.json')
    .then(response => response.json())
    .then(data => {
      let foundHero = data.find(hero => hero.hero.toLowerCase() === guess);

      if (foundHero) {
        // Format first appearance date as "Month YYYY"
        const date = new Date(foundHero.firstAppearance);
        const options = { year: 'numeric', month: 'long' };
        const formattedDate = date.toLocaleDateString('en-US', options); // e.g., "May 1989"

        // Create a new row in the table with the hero's data
        const newRow = table.insertRow();
        newRow.insertCell(0).textContent = foundHero.hero;
        newRow.insertCell(1).textContent = foundHero.role;
        newRow.insertCell(2).textContent = foundHero.affiliation.join(', ');  // Affiliation (formatted as comma-separated)
        newRow.insertCell(3).textContent = foundHero.teamUp.join(', ');  // Team-Up (formatted as comma-separated)
        newRow.insertCell(4).textContent = formattedDate;  // First Appearance (formatted date)
      } else {
        alert("Hero not found!");
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}


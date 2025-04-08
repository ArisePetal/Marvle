function submitGuess() {
  const guess = document.getElementById('guessInput').value.trim().toLowerCase();  // Trim input to avoid leading/trailing spaces
  const table = document.getElementById('guessesTable').getElementsByTagName('tbody')[0];
  const guessInput = document.getElementById('guessInput'); // Get the input box

  // Check if the guess has already been made
  const rows = table.getElementsByTagName('tr');
  for (let row of rows) {
    const heroCell = row.cells[0].textContent.toLowerCase();
    if (heroCell === guess) {
      alert("You've already guessed this hero!");
      return;
    }
  }

  // Fetch the hero data
  fetch('https://raw.githubusercontent.com/ArisePetal/Marvle/main/data/heroes.json')
    .then(response => response.json())
    .then(data => {
      // Log data and guess for debugging
      console.log("Guess entered: ", guess);
      console.log("Data from JSON: ", data);

      // Find the hero in the JSON file
      let foundHero = data.find(hero => hero.hero.toLowerCase().trim() === guess);

      if (foundHero) {
        console.log("Hero found: ", foundHero);  // Log the found hero for debugging

        // Compare the roles, and highlight the input box if the role matches
        const correctHeroRole = foundHero.role.toLowerCase();
        if (guessInput.value.toLowerCase() === correctHeroRole) {
          guessInput.style.backgroundColor = 'lightgreen';  // Green for role match
        } else {
          guessInput.style.backgroundColor = 'lightcoral';  // Red for incorrect role
        }

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
        guessInput.style.backgroundColor = 'lightcoral';  // Red for incorrect guess
        alert("Hero not found!");
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

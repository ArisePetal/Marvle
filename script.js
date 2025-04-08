let randomHero = null;

// Function to randomly pick a hero from the list
function pickRandomHero() {
  fetch('https://raw.githubusercontent.com/ArisePetal/Marvle/main/data/heroes.json')
    .then(response => response.json())
    .then(data => {
      const randomIndex = Math.floor(Math.random() * data.length);
      randomHero = data[randomIndex];  // Store the randomly chosen hero
      console.log("Today's random hero:", randomHero.hero);  // Debug: Shows the selected random hero
    })
    .catch(error => console.error('Error fetching hero data:', error));
}

// Call pickRandomHero when the page loads
window.onload = pickRandomHero;

// Function to submit guess
function submitGuess() {
  const guess = document.getElementById('guessInput').value.toLowerCase();
  const table = document.getElementById('guessesTable').getElementsByTagName('tbody')[0];

  // Check if the guess has already been made
  const rows = table.getElementsByTagName('tr');
  for (let row of rows) {
    const heroCell = row.cells[0].textContent.toLowerCase();
    if (heroCell === guess) {
      alert("You've already guessed this hero!");
      return;
    }
  }

  // Validate if the guess matches the randomly chosen hero
  if (randomHero && guess === randomHero.hero.toLowerCase()) {
    const date = new Date(randomHero.firstAppearance);
    const options = { year: 'numeric', month: 'long' };
    const formattedDate = date.toLocaleDateString('en-US', options); // e.g., "May 1989"

    // Create a new row with the correct hero's data
    const newRow = table.insertRow();
    newRow.insertCell(0).textContent = randomHero.hero;
    newRow.insertCell(1).textContent = randomHero.role;
    newRow.insertCell(2).textContent = randomHero.affiliation.join(', ');  // Affiliation
    newRow.insertCell(3).textContent = randomHero.teamUp.join(', ');  // Team-Up
    newRow.insertCell(4).textContent = formattedDate;  // First Appearance
  } else {
    // Incorrect guess logic, no color change
    alert("Hero not found or incorrect guess!");
  }
}



let answerHero = {}; // The correct hero that the user has to guess
let guesses = []; // To keep track of all submitted guesses

// Function to choose a random hero from the data
function chooseAnswerHero(data) {
  const randomIndex = Math.floor(Math.random() * data.length);
  answerHero = data[randomIndex]; // Set the answer hero to a random hero from the list
  document.getElementById('currentAnswer').textContent = answerHero.hero; // Show the answer on the screen
}

// Function to handle the guessing logic
function submitGuess() {
  const guess = document.getElementById('guessInput').value.toLowerCase().trim();
  console.log('Guess:', guess); // Debugging the guess

  // If the guess is empty, do nothing
  if (!guess) return;

  // Fetch the hero data and process the guess
  fetch('https://raw.githubusercontent.com/ArisePetal/Marvle/main/data/heroes.json')
    .then(response => response.json())
    .then(data => {
      let foundHero = data.find(hero => hero.hero.toLowerCase() === guess);
      console.log('Found Hero:', foundHero); // Debugging if the hero is found

      if (foundHero) {
        const table = document.getElementById('guessesTable').getElementsByTagName('tbody')[0];
        const date = new Date(foundHero.firstAppearance);
        const options = { year: 'numeric', month: 'long' };
        const formattedDate = date.toLocaleDateString('en-US', options);

        // Insert the guessed hero into the table
        const newRow = table.insertRow();
        newRow.insertCell(0).textContent = foundHero.hero;
        newRow.insertCell(1).textContent = foundHero.role;
        newRow.insertCell(2).textContent = foundHero.affiliation.join(', ');
        newRow.insertCell(3).textContent = foundHero.teamUp.join(', ');
        newRow.insertCell(4).textContent = formattedDate;

        // Color the cells based on the matching
        colorCells(newRow, foundHero);

        // Add the guess to the guesses array to prevent duplicate guesses
        guesses.push(foundHero.hero.toLowerCase());

        // Check if the guess is correct
        if (foundHero.hero.toLowerCase() === answerHero.hero.toLowerCase()) {
          // Display a message below the table when the hero is guessed correctly
          document.getElementById('message').textContent = "Correct! You've guessed the hero!";
        }
      } else {
        alert("Hero not found!");
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

// Function to compare and color the table cells based on the guess
function colorCells(row, guessedHero) {
  const roleCell = row.cells[1];
  const affiliationCell = row.cells[2];
  const teamUpCell = row.cells[3];

  // Check for exact matches (green), partial matches (orange), or no matches (red)
  function colorCell(cell, value, correctValue) {
    // Ensure both values are arrays before sorting
    if (!Array.isArray(value)) value = [value]; // Convert value to an array if it's not one
    if (!Array.isArray(correctValue)) correctValue = [correctValue]; // Convert correctValue to an array if it's not one

    // Now both value and correctValue should be arrays, we can safely use .sort()
    if (JSON.stringify(value.sort()) === JSON.stringify(correctValue.sort())) {
      // Exact match (green)
      cell.style.backgroundColor = 'green';
    } else if (correctValue.some(val => value.includes(val))) {
      // Partial match (orange)
      cell.style.backgroundColor = 'orange';
    } else {
      // No match (red)
      cell.style.backgroundColor = 'red';
    }
  }

  colorCell(roleCell, guessedHero.role, answerHero.role);
  colorCell(affiliationCell, guessedHero.affiliation, answerHero.affiliation);
  colorCell(teamUpCell, guessedHero.teamUp, answerHero.teamUp);
}

// Fetch the data and choose a random answer hero when the page loads
fetch('https://raw.githubusercontent.com/ArisePetal/Marvle/main/data/heroes.json')
  .then(response => response.json())
  .then(data => {
    chooseAnswerHero(data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

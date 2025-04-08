let dailyHero;
let heroesData = [];

// Fetch data from JSON
fetch('https://raw.githubusercontent.com/ArisePetal/Marvle/main/data/heroes.json')
  .then(response => response.json())
  .then(data => {
    heroesData = data;
    dailyHero = heroesData[Math.floor(Math.random() * heroesData.length)];
    console.log("Daily hero chosen. Waiting for guesses...");
  })
  .catch(error => console.error("Error fetching data:", error));

// Handle guess submission
function submitGuess() {
  const guessInput = document.getElementById("guessInput");
  const guess = guessInput.value.trim().toLowerCase();

  if (!guess) return;

  // Find guessed hero
  const guessedHero = heroesData.find(h => h.hero.toLowerCase() === guess);

  if (!guessedHero) {
    alert("Hero not found. Please try again.");
    return;
  }

  // Add guessed hero to the table
  const table = document.getElementById("guessesTable").getElementsByTagName('tbody')[0];
  const row = table.insertRow();

  // Create columns: Hero, Role, Affiliations, TeamUps, First Appearance
  const heroCell = row.insertCell();
  const roleCell = row.insertCell();
  const affiliationCell = row.insertCell();
  const teamUpCell = row.insertCell();
  const appearanceCell = row.insertCell();

  heroCell.textContent = guessedHero.hero;
  roleCell.textContent = guessedHero.role;
  affiliationCell.textContent = guessedHero.affiliation.join(", ");
  teamUpCell.textContent = guessedHero.teamUp.join(", ");
  appearanceCell.textContent = guessedHero.firstAppearance;

  // Style row if correct
  if (guessedHero.hero.toLowerCase() === dailyHero.hero.toLowerCase()) {
    row.style.backgroundColor = "lightgreen";
    alert("🎉 You guessed the correct hero!");
  }

  guessInput.value = "";
}

// Fetch heroes data from GitHub
fetch('https://raw.githubusercontent.com/ArisePetal/Marvle/main/heroes.json')
  .then(response => response.json())
  .then(data => {
    // Pick a random hero from the data
    const randomHero = data[Math.floor(Math.random() * data.length)];

    // Display the hero's information in the table
    function displayHero(hero) {
        document.getElementById("heroName").textContent = hero.hero;
        document.getElementById("heroRole").textContent = hero.role;
        document.getElementById("heroAffiliation").textContent = hero.affiliation.join(", ");
        document.getElementById("heroFirstAppearance").textContent = hero.firstAppearance;
        document.getElementById("heroTeamUp").textContent = hero.teamUp.join(", ");
    }

    // Initially display the hero
    displayHero(randomHero);

    // Handle the guess submission
    document.getElementById("submitGuess").addEventListener("click", function() {
        const guess = document.getElementById("guessInput").value.trim().toLowerCase();
        if (guess === randomHero.hero.toLowerCase()) {
            alert("Correct! Well done.");
        } else {
            alert("Oops, that's not correct. Try again!");
        }
    });
  })
  .catch(error => console.error('Error fetching data:', error));

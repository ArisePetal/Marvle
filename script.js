function submitGuess() {
  const guess = document.getElementById('guessInput').value.toLowerCase();
  console.log('Guess:', guess); // Add this to debug the guess value

  const table = document.getElementById('guessesTable').getElementsByTagName('tbody')[0];

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

        // Now we need to compare affiliation and teamUp arrays for partial and exact matches
        const roleCell = newRow.cells[1];
        const affiliationCell = newRow.cells[2];
        const teamUpCell = newRow.cells[3];

        // Sort arrays to make sure the order doesn't matter for comparison
        const correctRole = foundHero.role.toLowerCase();
        const guessedRole = guessRole.toLowerCase();
        const roleMatch = correctRole === guessedRole;

        const correctAffiliation = foundHero.affiliation.slice().sort();
        const guessedAffiliation = guessAffiliation.slice().sort();
        const affiliationMatch = correctAffiliation.join(', ') === guessedAffiliation.join(', ');

        const correctTeamUp = foundHero.teamUp.slice().sort();
        const guessedTeamUp = guessTeamUp.slice().sort();
        const teamUpMatch = correctTeamUp.join(', ') === guessedTeamUp.join(', ');

        // The match comparison logic here

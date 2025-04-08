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

        // Check for role match
        const roleCell = newRow.insertCell(1);
        roleCell.textContent = foundHero.role;
        if (guess === foundHero.role.toLowerCase()) {
          roleCell.style.backgroundColor = 'green'; // Exact match
        } else {
          roleCell.style.backgroundColor = 'red'; // No match by default
        }

        // Check for affiliation match
        const affiliationCell = newRow.insertCell(2);
        affiliationCell.textContent = foundHero.affiliation.join(', ');
        const affiliationMatch = foundHero.affiliation.filter(aff => aff.toLowerCase() === guess).length;
        if (affiliationMatch === foundHero.affiliation.length) {
          affiliationCell.style.backgroundColor = 'green'; // Exact match
        } else if (affiliationMatch > 0) {
          affiliationCell.style.backgroundColor = 'orange'; // Partial match
        } else {
          affiliationCell.style.backgroundColor = 'red'; // No match
        }

        // Check for teamUp match
        const teamUpCell = newRow.insertCell(3);
        teamUpCell.textContent = foundHero.teamUp.join(', ');
        const teamUpMatch = foundHero.teamUp.filter(team => team.toLowerCase() === guess).length;
        if (teamUpMatch === foundHero.teamUp.length) {
          teamUpCell.style.backgroundColor = 'green'; // Exact match
        } else if (teamUpMatch > 0) {
          teamUpCell.style.backgroundColor = 'orange'; // Partial match
        } else {
          teamUpCell.style.backgroundColor = 'red'; // No match
        }

        newRow.insertCell(4).textContent = formattedDate;
      } else {
        alert("Hero not found!");
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

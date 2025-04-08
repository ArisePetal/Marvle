document.getElementById("submit-guess").addEventListener("click", checkGuess);

function checkGuess() {
    const guess = document.getElementById("guess-input").value.toLowerCase();
    console.log("Guess:", guess);  // Log the guess to see if it's captured

    const selectedHero = document.getElementById("heroes-table").rows[1]?.cells[0]?.textContent.toLowerCase();
    console.log("Selected Hero:", selectedHero);  // Log the hero name to check if it's being fetched correctly

    if (guess === selectedHero) {
        alert("Correct! Well done!");
    } else {
        alert("Incorrect guess! Try again.");
    }
}

// Fetch data from Google Sheets and populate the table
function fetchSheetData() {
    const apiKey = 'YOUR_API_KEY';
    const sheetId = 'YOUR_GOOGLE_SHEET_ID';
    const range = 'Sheet1!B1:B14';

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const heroData = data.values;
            const selectedHero = selectRandomHero(heroData);  // Randomly select a hero
            console.log('Today\'s hero:', selectedHero);
            displayHeroInTable(selectedHero);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function selectRandomHero(heroes) {
    const randomIndex = Math.floor(Math.random() * heroes.length);
    return heroes[randomIndex];
}

function displayHeroInTable(hero) {
    const tableBody = document.getElementById("heroes-table").getElementsByTagName("tbody")[0];
    const row = tableBody.insertRow(); 

    const heroCell = row.insertCell(0);
    const roleCell = row.insertCell(1);
    const affiliationCell = row.insertCell(2);
    const teamUpCell = row.insertCell(3);
    const firstAppearanceCell = row.insertCell(4);

    heroCell.textContent = hero[0];  // Hero's name
    roleCell.textContent = hero[1];  // Role
    affiliationCell.textContent = hero[2];  // Affiliation
    teamUpCell.textContent = hero[3];  // Team-Up
    firstAppearanceCell.textContent = hero[4];  // First Appearance
}

window.onload = function() {
    fetchSheetData();
};

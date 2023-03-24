document.getElementById("generate-btn").addEventListener("click", generateTeams);

function generateTeams() {
    const teamMembers = document.getElementById("team-members").value.split(",");
    const shuffledMembers = shuffle(teamMembers);
    const teams = createTeams(shuffledMembers);
    displayResults(teams);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createTeams(members) {
    const teams = [];
    while (members.length) {
        const teamSize = members.length >= 4 ? 3 : 2;
        teams.push(members.splice(0, teamSize));
    }
    return teams;
}

function displayResults(teams) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
    teams.forEach((team, index) => {
        const teamDiv = document.createElement("div");
        teamDiv.classList.add("team");
        teamDiv.innerHTML = `<strong>Team ${index + 1}:</strong> ${team.join(", ")}`;
        resultsDiv.appendChild(teamDiv);
    });
}

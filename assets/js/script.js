document.getElementById("generate-btn").addEventListener("click", generateTeams);
document.getElementById("clear-history-btn").addEventListener("click", clearHistory);

function generateTeams() {
    const teamMembers = document.getElementById("team-members").value.split(",");
    if (teamMembers.length < 5) {
        alert('Please enter at least 5 names.');
        return;
    }
    const shuffledMembers = shuffle(teamMembers);
    const teams = createTeams(shuffledMembers);
    displayResults(teams);
    saveToLocalStorage(teams);
    displayHistory();
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

function saveToLocalStorage(teams) {
    const history = JSON.parse(localStorage.getItem("teamHistory")) || [];
    history.push(teams);
    localStorage.setItem("teamHistory", JSON.stringify(history));
}

function displayHistory() {
    const historyList = document.getElementById("history-list");
    historyList.innerHTML = "";
    const history = JSON.parse(localStorage.getItem("teamHistory")) || [];
    history.forEach((teams, index) => {
        const li = document.createElement("li");
        li.innerHTML = `Generation ${index + 1}`;
        li.addEventListener("click", () => displayResults(teams));
        historyList.appendChild(li);
    });
}

function clearHistory() {
    localStorage.removeItem("teamHistory");
    displayHistory();
}

displayHistory();

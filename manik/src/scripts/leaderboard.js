// src/scripts/leaderboard.js
document.addEventListener("DOMContentLoaded", loadLeaderboard);

export function saveScore(score) {
  const user = localStorage.getItem("currentUser") || "Guest";
  const now  = new Date().toLocaleString();
  const scores = JSON.parse(localStorage.getItem("quizScores")||"[]");
  scores.push({ username: user, score, date: now });
  localStorage.setItem("quizScores", JSON.stringify(scores));
}

function loadLeaderboard() {
  const scores = JSON.parse(localStorage.getItem("quizScores")||"[]");
  // sort by score desc, then newest first
  scores.sort((a,b) => b.score - a.score || new Date(b.date) - new Date(a.date));
  const tbody = document.getElementById("leaderboard-body");
  tbody.innerHTML = scores
    .slice(0, 10)  // top 10
    .map(s => `
      <tr>
        <td>${s.username}</td>
        <td>${s.score}</td>
        <td>${s.date}</td>
      </tr>
    `).join("");
}

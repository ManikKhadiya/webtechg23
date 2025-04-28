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
  const tbody = document.getElementById("leaderboard-body");
  if (!tbody) return;   // failshafe

  const scores = JSON.parse(localStorage.getItem("quizScores")||"[]")
    .sort((a,b) => b.score - a.score || new Date(b.date) - new Date(a.date));

  tbody.innerHTML = scores.map(s => `
    <tr>
      <td>${s.username}</td>
      <td>${s.quiz}</td>
      <td>${s.score}</td>
      <td>${s.date}</td>
    </tr>
  `).join("");
}

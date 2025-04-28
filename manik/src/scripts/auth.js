// src/scripts/auth.js
document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname.split("/").pop();
  const user = localStorage.getItem("currentUser");
  // redirect if != login page and no user
  if (!user && path !== "login.html") {
    window.location.href = "login.html";
  }
});

// called login.htmls button
function loginUser() {
  const input = document.getElementById("username");
  const username = input.value.trim();
  if (!username) return alert("Please enter a username");
  localStorage.setItem("currentUser", username);
  window.location.href = "quiz.html";
}

//logout buttion
function logoutUser() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

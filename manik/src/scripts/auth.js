// src/scripts/auth.js
document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname.split("/").pop();
  const user = localStorage.getItem("currentUser");
  // if not on login page and no user → redirect
  if (!user && path !== "login.html") {
    window.location.href = "login.html";
  }
});

// called by login.html’s button
function loginUser() {
  const input = document.getElementById("username");
  const username = input.value.trim();
  if (!username) return alert("Please enter a username");
  localStorage.setItem("currentUser", username);
  window.location.href = "quiz.html";
}

// you can hook this to a “Logout” link in your navbar
function logoutUser() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

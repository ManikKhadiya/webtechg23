//Manik navbar fix 12.32
document.addEventListener("DOMContentLoaded", () => {
    loadComponent("navbar.html", "navbar-container")
  });

  function loadComponent(path, containerId) {
    return fetch(path)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status} loading ${path}`);
        return res.text();
      })
      .then(html => {
        document.getElementById(containerId).innerHTML = html;
      })
      .catch(err => console.error(err));
  }
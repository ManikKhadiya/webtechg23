// src/scripts/accessibility.js
document.addEventListener("DOMContentLoaded", () => {
  // wait-for helper
  const waitFor = (selector, cb) => {
    const el = document.querySelector(selector);
    if (el) return cb(el);
    setTimeout(() => waitFor(selector, cb), 50);
  };

  // once the icon is injected...
  waitFor("#accessibility-toggle", (icon) => {
    const menu = document.getElementById("accessibility-menu");
    const contrast = document.getElementById("toggle-contrast");
    const text = document.getElementById("toggle-text");
    const volume = document.getElementById("volume-slider");

    icon.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });

    contrast.addEventListener("change", e => {
      document.body.classList.toggle("high-contrast", e.target.checked);
    });

    text.addEventListener("change", e => {
      document.body.classList.toggle("large-text", e.target.checked);
    });

    volume.addEventListener("input", e => {
      const v = parseFloat(e.target.value);
      document.querySelectorAll("audio").forEach(a => a.volume = v);
    });
  });
});

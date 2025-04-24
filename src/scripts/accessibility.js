document.addEventListener("DOMContentLoaded", () => {
  const icon = document.getElementById("accessibility-toggle");
  const menu = document.getElementById("accessibility-menu");
  const contrastToggle = document.getElementById("toggle-contrast");
  const textToggle = document.getElementById("toggle-text");
  const volumeSlider = document.getElementById("volume-slider");

  icon.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });

  contrastToggle.addEventListener("change", (e) => {
    document.body.classList.toggle("high-contrast", e.target.checked);
  });

  textToggle.addEventListener("change", (e) => {
    document.body.classList.toggle("large-text", e.target.checked);
  });

  volumeSlider.addEventListener("input", (e) => {
    const volume = parseFloat(e.target.value);
    document.querySelectorAll("audio").forEach((audio) => {
      audio.volume = volume;
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("accessibility-icon").addEventListener("change", function() {
    document.body.style.backgroundColor = this.checked ? "#000" : "#f4f4f4";
    document.body.style.color = this.checked ? "#fff" : "#000";
  });

  document.getElementById("large-text-toggle").addEventListener("change", function() {
    document.body.style.fontSize = this.checked ? "1.5em" : "1em";
  });

  document.addEventListener("keydown", function (event) {
    let options = document.querySelectorAll(".quiz-option");
    let index = Array.from(options).findIndex(option => option === document.activeElement);
    
    if (event.key === "ArrowDown") {
      index = (index + 1) % options.length;
      options[index].focus();
    } else if (event.key === "ArrowUp") {
      index = (index - 1 + options.length) % options.length;
      options[index].focus();
    } else if (event.key === "Enter") {
      options[index].click();
    }
  });
    
});

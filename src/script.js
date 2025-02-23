document.addEventListener("DOMContentLoaded", function() {
    // ensure elements exist before adding event listeners

    function loadNavbar() {
        fetch("components/navbar.html")
            .then(response => response.text())
            .then(data => {
                document.getElementById("navbar-container").innerHTML = data;
                // Add event listeners for accessibility menu after loading navbar
                document.querySelector('.accessibility-icon').addEventListener('click', toggleAccessibilityMenu);
                document.getElementById('high-contrast-toggle').addEventListener('change', function() {
                    document.body.style.backgroundColor = this.checked ? '#000' : '#f4f4f4';
                    document.body.style.color = this.checked ? '#fff' : '#000';
                });

                document.getElementById('large-text-toggle').addEventListener('change', function() {
                    document.body.style.fontSize = this.checked ? '1.5em' : '1em';
                });
            })
            .catch(error => console.error("Error loading navbar:", error));
    }

    // Call the function on page load
    loadNavbar();
});

function toggleAccessibilityMenu() {
    const menu = document.getElementById('accessibility-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function startRandomQuiz() {
    const quizzes = ["index.html", "index.html", "index.html", "index.html"]; //replace with actual names of files
    const randomQuiz = quizzes[Math.floor(Math.random() * quizzes.length)];
    window.location.href = randomQuiz;
}
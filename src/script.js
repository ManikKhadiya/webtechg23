function startRandomQuiz() {
    const quizzes = ["index.html", "index.html", "index.html", "index.html"]; //replace with actual names of files
    const randomQuiz = quizzes[Math.floor(Math.random() * quizzes.length)];
    window.location.href = randomQuiz;
}

document.addEventListener("DOMContentLoaded", function() {
    function loadNavbar() {
        fetch("components/navbar.html")
            .then(response => response.text())
            .then(data => {
                document.getElementById("navbar-container").innerHTML = data;

                // attach event listeners after navbar is loaded
                const accessibilityIcon = document.querySelector('.accessibility-icon');
                const accessibilityMenu = document.getElementById('accessibility-menu');

                if (accessibilityIcon && accessibilityMenu) {
                    accessibilityIcon.addEventListener('click', function () {
                        accessibilityMenu.classList.toggle('hidden');
                    });
                }

                const highContrastToggle = document.getElementById('high-contrast-toggle');
                if (highContrastToggle) {
                    highContrastToggle.addEventListener('change', function() {
                        document.body.style.backgroundColor = this.checked ? '#000' : '#f4f4f4';
                        document.body.style.color = this.checked ? '#fff' : '#000';
                    });
                }

                const largeTextToggle = document.getElementById('large-text-toggle');
                if (largeTextToggle) {
                    largeTextToggle.addEventListener('change', function() {
                        document.body.style.fontSize = this.checked ? '1.5em' : '1em';
                    });
                }
            })
            .catch(error => console.error("Error loading navbar:", error));
    }

    loadNavbar();
});
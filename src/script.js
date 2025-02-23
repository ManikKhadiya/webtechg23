function startRandomQuiz() {
    const quizzes = ["quiz1.html", "quiz2.html", "quiz3.html", "quiz4.html"]; // Replace with actual quiz pages
    const randomQuiz = quizzes[Math.floor(Math.random() * quizzes.length)];
    window.location.href = randomQuiz;
}

document.addEventListener("DOMContentLoaded", function() {
    function loadNavbar() {
        fetch("components/navbar.html")
            .then(response => response.text())
            .then(data => {
                document.getElementById("navbar-container").innerHTML = data;

                // Debugging logs
                console.log("Navbar loaded!");

                // Use setTimeout to attach event listeners properly
                setTimeout(() => {
                    const accessibilityIcon = document.querySelector('.accessibility-icon');
                    const accessibilityMenu = document.getElementById('accessibility-menu');

                    console.log("Accessibility Icon:", accessibilityIcon);
                    console.log("Accessibility Menu:", accessibilityMenu);

                    if (accessibilityIcon && accessibilityMenu) {
                        accessibilityIcon.addEventListener('click', function () {
                            console.log("Accessibility menu toggled ✅"); // Debugging
                            accessibilityMenu.classList.toggle('hidden');
                        });
                    } else {
                        console.error("❌ Error: Accessibility elements not found");
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
                }, 100); // Delay to ensure elements exist
            })
            .catch(error => console.error("Error loading navbar:", error));
    }

    loadNavbar();
});

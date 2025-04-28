// Global javascript to insert the navigation bar

// Find out what folder the page is in
let currentPath = window.location.pathname; 
let folder = currentPath.split("/").length - 2; // -2 because first "/" is empty

// Create a path to go back to the main folder
let goBack = "";
for (let i = 0; i < folder; i++) {
    goBack += "../";
}

// Get the nav bar html
fetch(goBack + "navbar.html")
    .then(function(response) {
        return response.text();
    })
    .then(function(data) {
        // Insert the navbar content into the container
        document.getElementById("navbar-container").innerHTML = data;
});
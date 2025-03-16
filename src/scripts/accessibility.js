document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('high-contrast-toggle').addEventListener('change', function() {
        document.body.style.backgroundColor = this.checked ? '#000' : '#f4f4f4';
        document.body.style.color = this.checked ? '#fff' : '#000';
    });

    document.getElementById('large-text-toggle').addEventListener('change', function() {
        document.body.style.fontSize = this.checked ? '1.5em' : '1em';
    });
});

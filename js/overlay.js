function toggleOverlay() {
    var overlay = document.getElementById("overlay");
    overlay.classList.toggle("open");
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.toggle-btn').addEventListener('click', toggleOverlay);
    document.querySelector('.close-btn').addEventListener('click', toggleOverlay);
});
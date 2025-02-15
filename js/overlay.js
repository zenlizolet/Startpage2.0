document.addEventListener("DOMContentLoaded", function () {
    const openButton = document.getElementById("slide_open");
    const closeButton = document.getElementById("slide_close");
    const overlay = document.getElementById("overlay");
    const table = document.getElementById("catalog-content");

    // Functie om de overlay te openen en de cataloguspagina te laden
    function openOverlay() {
        overlay.classList.add("open");
        document.body.classList.add("no-scroll");
        // Controleer of de content al is geladen
        if (!table.innerHTML.trim()) {
            fetch("Catalog/index.html") // Zorg dat het pad klopt naar jouw catalogusbestand
                .then(response => response.text())
                .then(data => {
                    table.innerHTML = data;
                    initializeCatalog();
                })
                .catch(error => console.error("Fout bij laden van catalogus:", error));
        }
    }

    // Functie om de overlay te sluiten
    function closeOverlay() {
        overlay.classList.remove("open");
        document.body.classList.remove("no-scroll");
    }

    // Functie om de catalogus te initialiseren
    function initializeCatalog() {
        // Voeg event listeners toe aan de links in de catalogus
        document.querySelectorAll('#catalog-content nav a').forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                console.log('Link clicked:', this.getAttribute('href'));
                const file = this.getAttribute('data-file');
                fetch(`Catalog/${file}`) // Zorg dat het pad klopt naar jouw bestanden
                    .then(response => response.text())
                    .then(data => {
                        let contentMain = document.querySelector('.content-main');
                        if (!contentMain) {
                            contentMain = document.createElement('div');
                            contentMain.classList.add('content-main');
                            document.getElementById('content-div').appendChild(contentMain);
                        }
                        contentMain.innerHTML = data;
                    })
                    .catch(error => console.error('Error loading content:', error));
            });
        });
    }

    // Event listeners toevoegen aan de knoppen
    openButton.addEventListener("click", openOverlay);
    closeButton.addEventListener("click", closeOverlay);
});
// Fonction pour gérer le défilement de la souris et ajuster la position horizontale
let isScrolling = false;
function wheelScroll(event) {
    event.preventDefault(); // Empêche le défilement par défaut
    
    if (isScrolling) return;
    isScrolling = true;

    // Durée de transition entre les sections (en millisecondes)
    const transitionDuration = 2000; // 2 secondes
    const startTime = performance.now();
    const sections = document.querySelectorAll('.section'); // Sélectionne toutes les sections
    const sectionWidth = sections[0].offsetWidth; // Obtient la largeur d'une section
    const scrollAmount = sectionWidth * 1 * Math.sign(event.deltaY); // Calcule la distance de défilement ralentie
    const startX = window.pageXOffset;
    const targetX = startX + scrollAmount;

    function scrollStep(timestamp) {
        const progress = Math.min(1, (timestamp - startTime) / transitionDuration);
        window.scrollTo(startX + progress * (targetX - startX), window.pageYOffset);
        if (progress < 1) {
            requestAnimationFrame(scrollStep);
        } else {
            isScrolling = false;
        }
    }

    requestAnimationFrame(scrollStep);
}

// Ajoute un écouteur d'événements pour le défilement de la souris
window.addEventListener('wheel', wheelScroll);

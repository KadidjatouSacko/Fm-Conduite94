document.addEventListener('DOMContentLoaded', function() {
    const reviewsInner = document.querySelector('.reviews-inner');
    const reviewItems = document.querySelectorAll('.review-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    
    let currentIndex = 0;
    const totalItems = reviewItems.length;
    
    // Fonction pour obtenir le nombre d'items visibles selon la largeur d'écran
    function getVisibleItems() {
        const width = window.innerWidth;
        if (width < 576) return 1;
        if (width < 992) return 2;
        if (width < 1200) return 3;
        return 4;
    }
    
    // Fonction pour calculer le nombre de pages du carrousel
    function getTotalPages() {
        const visibleItems = getVisibleItems();
        return Math.ceil(totalItems / visibleItems);
    }
    
    // Fonction pour mettre à jour l'affichage du carrousel
    function updateCarousel() {
        const visibleItems = getVisibleItems(); 
        const slideWidth = 100 / visibleItems;
        
        // Déterminer la translation
        // Si on a 4 items visibles, on déplace de 4 items à la fois (soit 100%)
        const translateValue = (currentIndex * visibleItems * slideWidth);
        
        // S'assurer qu'on ne dépasse pas le nombre total d'items
        if (currentIndex >= getTotalPages()) {
            currentIndex = 0;
        }
        
        reviewsInner.style.transform = `translateX(-${translateValue}%)`;
        
        // Mettre à jour les indicateurs (dots)
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Bouton suivant
    nextBtn.addEventListener('click', function() {
        if (currentIndex < getTotalPages() - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    });
    
    // Bouton précédent
    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = getTotalPages() - 1;
        }
        updateCarousel();
    });
    
    // Clic sur les dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentIndex = index;
            updateCarousel();
        });
    });
    
    // Auto-rotation (optionnel)
    let autoRotate = setInterval(() => {
        if (currentIndex < getTotalPages() - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    }, 7000); // Change d'avis toutes les 7 secondes
    
    // Arrêter la rotation auto quand l'utilisateur interagit
    reviewsInner.addEventListener('mouseenter', () => {
        clearInterval(autoRotate);
    });
    
    // Reprendre la rotation auto quand l'utilisateur n'interagit plus
    reviewsInner.addEventListener('mouseleave', () => {
        autoRotate = setInterval(() => {
            if (currentIndex < getTotalPages() - 1) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarousel();
        }, 7000);
    });
    
    // Gestion tactile pour mobile (swipe)
    let touchStartX = 0;
    let touchEndX = 0;
    
    reviewsInner.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    reviewsInner.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        // Déterminer la direction du swipe
        if (touchEndX < touchStartX - 50) {
            // Swipe gauche (avis suivant)
            if (currentIndex < getTotalPages() - 1) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe droit (avis précédent)
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = getTotalPages() - 1;
            }
        }
        updateCarousel();
    }
    
    // Ajuster le carrousel lors du redimensionnement de la fenêtre
    window.addEventListener('resize', updateCarousel);
    
    // Initialiser l'affichage
    updateCarousel();
    
    // Mettre à jour le nombre de dots en fonction du nombre de pages
    function updateDots() {
        const dotsContainer = document.querySelector('.carousel-dots');
        dotsContainer.innerHTML = '';
        
        for (let i = 0; i < getTotalPages(); i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', function() {
                currentIndex = i;
                updateCarousel();
            });
            dotsContainer.appendChild(dot);
        }
    }
    
    // Initialiser les dots
    updateDots();
    
    // Mettre à jour les dots lors du redimensionnement
    window.addEventListener('resize', updateDots);
});
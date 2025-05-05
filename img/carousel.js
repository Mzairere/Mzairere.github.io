document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousel variables
    let currentIndex = 0;
    let autoSlideInterval;
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    
    // Check if carousel exists and has items
    if (!carousel || totalItems === 0) {
        console.error('Carousel elements not found');
        return;
    }

    const carouselInner = document.querySelector('.carousel-inner');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');

    // Initialize carousel
    function initCarousel() {
        // Set active class to first item
        items[0]?.classList.add('active');
        
        // Start auto-slide if more than one item
        if (totalItems > 1) {
            startAutoSlide();
        }

        // Add event listeners for buttons if they exist
        if (prevButton) {
            prevButton.addEventListener('click', showPrevItem);
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', showNextItem);
        }

        // Pause on hover
        carousel.addEventListener('mouseenter', pauseAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    }

    // Show next item in carousel
    function showNextItem() {
        items[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % totalItems;
        items[currentIndex].classList.add('active');
        updateCarouselPosition();
    }

    // Show previous item in carousel
    function showPrevItem() {
        items[currentIndex].classList.remove('active');
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        items[currentIndex].classList.add('active');
        updateCarouselPosition();
    }

    // Update carousel position
    function updateCarouselPosition() {
        if (carouselInner) {
            const offset = -currentIndex * 100;
            carouselInner.style.transform = `translateX(${offset}%)`;
            carouselInner.style.transition = 'transform 0.5s ease-in-out';
        }
    }

    // Start auto sliding
    function startAutoSlide() {
        if (totalItems <= 1) return;
        
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(showNextItem, 3000);
    }

    // Pause auto sliding
    function pauseAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Initialize the carousel
    initCarousel();

    // Clean up on window unload
    window.addEventListener('beforeunload', function() {
        clearInterval(autoSlideInterval);
        if (prevButton) prevButton.removeEventListener('click', showPrevItem);
        if (nextButton) nextButton.removeEventListener('click', showNextItem);
        carousel.removeEventListener('mouseenter', pauseAutoSlide);
        carousel.removeEventListener('mouseleave', startAutoSlide);
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', function () {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when a link is clicked
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // Initialize carousel
    updateCarousel(2);
});

// Carousel functionality
let currentImages = { 2: 0 }; // Track current image for each carousel

function nextImage(projectId) {
    const carousel = document.getElementById(`carousel-${projectId}`);
    const totalImages = carousel.children.length;
    currentImages[projectId] = (currentImages[projectId] + 1) % totalImages;
    updateCarousel(projectId);
}

function prevImage(projectId) {
    const carousel = document.getElementById(`carousel-${projectId}`);
    const totalImages = carousel.children.length;
    currentImages[projectId] = (currentImages[projectId] - 1 + totalImages) % totalImages;
    updateCarousel(projectId);
}

function goToImage(projectId, imageIndex) {
    currentImages[projectId] = imageIndex;
    updateCarousel(projectId);
}

function updateCarousel(projectId) {
    const carousel = document.getElementById(`carousel-${projectId}`);
    const translateX = -currentImages[projectId] * 100;
    carousel.style.transform = `translateX(${translateX}%)`;
    
    // Update dots
    const totalImages = carousel.children.length;
    for (let i = 0; i < totalImages; i++) {
        const dot = document.getElementById(`dot-${projectId}-${i}`);
        if (dot) {
            if (i === currentImages[projectId]) {
                dot.classList.add('bg-opacity-100');
                dot.classList.remove('bg-opacity-50');
            } else {
                dot.classList.add('bg-opacity-50');
                dot.classList.remove('bg-opacity-100');
            }
        }
    }
}

// Modal functionality
function openModal(imageSrc, imageAlt) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    modalImage.src = imageSrc;
    modalImage.alt = imageAlt;
    modalCaption.textContent = imageAlt;
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal when clicking outside the image
document.addEventListener('DOMContentLoaded', function() {
    const imageModal = document.getElementById('imageModal');
    if (imageModal) {
        imageModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

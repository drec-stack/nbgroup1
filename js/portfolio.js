// Portfolio page specific JavaScript
function initPortfolio() {
    setupPortfolioFilter();
    setupProjectInteractions();
    setupTestimonialCarousel();
}

function setupPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Filter items
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

function setupProjectInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const image = card.querySelector('.project-image');
            const info = card.querySelector('.project-info');
            
            if (image) image.style.transform = 'scale(1.05)';
            if (info) info.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            const image = card.querySelector('.project-image');
            const info = card.querySelector('.project-info');
            
            if (image) image.style.transform = 'scale(1)';
            if (info) info.style.transform = 'translateY(0)';
        });
        
        // Click to view case study
        const caseStudyLink = card.querySelector('.project-link');
        if (caseStudyLink) {
            caseStudyLink.addEventListener('click', (e) => {
                e.preventDefault();
                // In a real implementation, this would open a modal or navigate to case study page
                console.log('Opening case study...');
            });
        }
    });
}

function setupTestimonialCarousel() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    
    if (testimonialCards.length > 1) {
        // Auto-rotate testimonials
        setInterval(() => {
            testimonialCards[currentTestimonial].classList.remove('active');
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            testimonialCards[currentTestimonial].classList.add('active');
        }, 5000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initPortfolio();
});

// Export for global access
window.initPortfolio = initPortfolio;
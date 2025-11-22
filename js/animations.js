// Animations controller
class NBAnimations {
    constructor() {
        this.observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupCounterAnimation();
        this.setupParallax();
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    
                    // Special handling for counters
                    if (entry.target.classList.contains('counter') || entry.target.classList.contains('stat-number')) {
                        this.animateCounter(entry.target);
                    }
                    
                    // Special handling for title words
                    if (entry.target.classList.contains('title-animate')) {
                        this.animateTitleWords(entry.target);
                    }
                }
            });
        }, this.observerOptions);

        // Observe all reveal elements
        const revealElements = document.querySelectorAll(
            '.reveal-element, .text-reveal, .title-reveal, .card-reveal, .counter, .stat-number, .title-animate'
        );
        
        revealElements.forEach(el => {
            observer.observe(el);
        });
    }

    animateTitleWords(element) {
        const words = element.querySelectorAll('.title-word');
        words.forEach((word, index) => {
            setTimeout(() => {
                word.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    setupCounterAnimation() {
        // Counters will be animated when they come into view
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target')) || parseInt(element.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
                element.classList.add('counter-animate');
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }

    setupParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length > 0) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                
                parallaxElements.forEach(element => {
                    const parallaxSpeed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
                    const offset = scrolled * parallaxSpeed;
                    element.style.transform = `translate3d(0, ${offset}px, 0)`;
                });
            });
        }
    }

    // Utility for staggered animations
    staggerAnimation(elements, delay = 100) {
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('revealed');
            }, index * delay);
        });
    }
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    window.NBAnimations = new NBAnimations();
});
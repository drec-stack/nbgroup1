// parallax.js - FULLSCREEN BACKGROUND CHANGES

class ScrollBackgroundChanger {
    constructor() {
        this.backgrounds = document.querySelectorAll('.parallax-bg');
        this.sections = document.querySelectorAll('.content-section');
        this.heroSection = document.querySelector('.parallax-hero');
        this.progressBar = document.querySelector('.scroll-progress-bar');
        
        this.currentBgIndex = 0;
        this.isAnimating = false;
        
        this.init();
    }
    
    init() {
        console.log('🎯 Initializing fullscreen background changes...');
        
        // Set initial background
        this.setBackground(0);
        
        // Add scroll event listener
        window.addEventListener('scroll', this.handleScroll.bind(this));
        
        // Add intersection observer for sections
        this.setupIntersectionObserver();
        
        // Add progress bar
        this.setupProgressBar();
        
        console.log('✅ Fullscreen background changer initialized');
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const section = entry.target;
                    const bgIndex = parseInt(section.getAttribute('data-bg-index')) || 0;
                    
                    this.setBackground(bgIndex);
                }
            });
        }, {
            threshold: 0.4,
            rootMargin: '-100px 0px -100px 0px'
        });
        
        this.sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    setupProgressBar() {
        window.addEventListener('scroll', () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const progress = (scrollTop / documentHeight) * 100;
            
            if (this.progressBar) {
                this.progressBar.style.width = progress + '%';
            }
        });
    }
    
    handleScroll() {
        if (this.isAnimating) return;
        
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Calculate which background should be active based on scroll position
        let newBgIndex = 0;
        
        // Hero section - first background
        if (scrollY < windowHeight * 0.5) {
            newBgIndex = 0;
        }
        // Clients section - second background
        else if (scrollY >= windowHeight * 0.5 && scrollY < windowHeight * 1.5) {
            newBgIndex = 1;
        }
        // Services section - first background
        else if (scrollY >= windowHeight * 1.5 && scrollY < windowHeight * 2.5) {
            newBgIndex = 0;
        }
        // Stats section - second background
        else if (scrollY >= windowHeight * 2.5 && scrollY < windowHeight * 3.5) {
            newBgIndex = 1;
        }
        // CTA section - first background
        else {
            newBgIndex = 0;
        }
        
        // Change background if needed
        if (newBgIndex !== this.currentBgIndex && newBgIndex < this.backgrounds.length) {
            this.setBackground(newBgIndex);
        }
    }
    
    setBackground(index) {
        if (this.isAnimating || index === this.currentBgIndex) return;
        
        this.isAnimating = true;
        this.currentBgIndex = index;
        
        console.log(`🎨 Changing background to index: ${index}`);
        
        // Remove active class from all backgrounds
        this.backgrounds.forEach(bg => {
            bg.classList.remove('active');
        });
        
        // Add active class to current background
        if (this.backgrounds[index]) {
            this.backgrounds[index].classList.add('active');
        }
        
        // Reset animation flag
        setTimeout(() => {
            this.isAnimating = false;
        }, 1200);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const parallaxBackgrounds = document.querySelectorAll('.parallax-bg');
    
    if (parallaxBackgrounds.length > 0) {
        new ScrollBackgroundChanger();
    }
});

// Export for global access
window.ScrollBackgroundChanger = ScrollBackgroundChanger;
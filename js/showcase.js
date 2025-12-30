// showcase.js - Speck Design Showcase Animation and Interactivity

(function() {
    'use strict';
    
    class ShowcaseAnimations {
        constructor() {
            this.isReducedMotion = window.matchMedia ? 
                window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
            
            console.log('🎨 Showcase animations initializing...');
            this.init();
        }

        init() {
            this.initShowcaseGridAnimation();
            this.initShowcaseHoverEffects();
            this.initShowcaseClickHandlers();
            this.initParallaxImages();
            this.initSectionAnimation();
        }

        initShowcaseGridAnimation() {
            const showcaseItems = document.querySelectorAll('.showcase-item');
            
            if (!showcaseItems.length) {
                console.log('⚠️ Showcase items not found');
                return;
            }

            if (window.IntersectionObserver && !this.isReducedMotion) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry, index) => {
                        if (entry.isIntersecting) {
                            setTimeout(() => {
                                entry.target.style.opacity = '1';
                                entry.target.style.transform = 'translateY(0)';
                                entry.target.classList.add('visible');
                            }, index * 200);
                            observer.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                });

                showcaseItems.forEach(item => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(40px)';
                    item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    observer.observe(item);
                });
            } else {
                // Fallback for older browsers
                setTimeout(() => {
                    showcaseItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                            item.classList.add('visible');
                        }, index * 200);
                    });
                }, 500);
            }
            
            console.log('✅ Initialized ' + showcaseItems.length + ' showcase items');
        }

        initShowcaseHoverEffects() {
            const showcaseItems = document.querySelectorAll('.showcase-item');
            
            showcaseItems.forEach(item => {
                item.addEventListener('mouseenter', () => {
                    if (!this.isReducedMotion) {
                        item.style.transform = 'translateY(-15px) scale(1.02)';
                    }
                });
                
                item.addEventListener('mouseleave', () => {
                    if (!this.isReducedMotion) {
                        item.style.transform = 'translateY(0) scale(1)';
                    }
                });
                
                // Touch device support
                item.addEventListener('touchstart', () => {
                    if (this.isReducedMotion) return;
                    item.style.transform = 'translateY(-10px) scale(1.01)';
                });
                
                item.addEventListener('touchend', () => {
                    if (this.isReducedMotion) return;
                    item.style.transform = 'translateY(0) scale(1)';
                });
            });
        }

        initShowcaseClickHandlers() {
            const showcaseItems = document.querySelectorAll('.showcase-item');
            
            showcaseItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    // Add click feedback
                    item.style.transform = 'translateY(-5px) scale(0.98)';
                    item.style.transition = 'transform 0.2s ease';
                    
                    setTimeout(() => {
                        item.style.transform = 'translateY(-15px) scale(1.02)';
                    }, 150);
                    
                    // Navigate to project page
                    const href = item.getAttribute('href');
                    if (href) {
                        setTimeout(() => {
                            window.location.href = href;
                        }, 350);
                    }
                });
                
                // Keyboard support
                item.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        item.click();
                    }
                });
                
                // Accessibility
                if (!item.hasAttribute('tabindex')) {
                    item.setAttribute('tabindex', '0');
                }
                
                if (!item.hasAttribute('role')) {
                    item.setAttribute('role', 'link');
                }
                
                if (!item.hasAttribute('aria-label')) {
                    const title = item.querySelector('h3')?.textContent || 'Проект';
                    item.setAttribute('aria-label', 'Перейти к проекту: ' + title);
                }
            });
        }

        initParallaxImages() {
            const showcaseImages = document.querySelectorAll('.showcase-image-wrapper');
            
            if (!showcaseImages.length || this.isReducedMotion) return;
            
            const handleParallax = () => {
                const scrolled = window.pageYOffset;
                
                showcaseImages.forEach(image => {
                    const rect = image.getBoundingClientRect();
                    const isInView = (
                        rect.top <= window.innerHeight &&
                        rect.bottom >= 0
                    );
                    
                    if (isInView) {
                        const speed = 0.3;
                        const yPos = -(scrolled * speed * 0.5);
                        image.style.transform = `translateY(${yPos}px)`;
                    }
                });
            };
            
            window.addEventListener('scroll', handleParallax, { passive: true });
            
            // Initial call
            setTimeout(handleParallax, 100);
        }

        initSectionAnimation() {
            const sections = document.querySelectorAll('.showcase-section, .expertise-tags-section');
            
            if (!sections.length || this.isReducedMotion) return;
            
            if (window.IntersectionObserver) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animated');
                            observer.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                });

                sections.forEach(section => observer.observe(section));
            } else {
                // Fallback
                setTimeout(() => {
                    sections.forEach(section => {
                        section.classList.add('animated');
                    });
                }, 500);
            }
        }
    }

    // Initialize showcase animations
    function initShowcase() {
        if (!document.querySelector('.showcase-section')) {
            return;
        }
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                window.showcaseAnimations = new ShowcaseAnimations();
            });
        } else {
            window.showcaseAnimations = new ShowcaseAnimations();
        }
    }
    
    // Auto-initialize
    initShowcase();
    
    // Export for manual initialization
    window.initShowcase = initShowcase;
    
    console.log('✅ showcase.js loaded and ready');
})();
// home.js - Vertical Speck Design blocks functionality

class HomePage {
    constructor() {
        this.init();
    }

    init() {
        this.initVerticalSpeckCards();
        this.initScrollAnimations();
        this.initStatsCounter();
        this.initParallaxBackgrounds();
        this.initMarqueeAnimations();
    }

    // Vertical Speck Cards Initialization
    initVerticalSpeckCards() {
        const speckCards = document.querySelectorAll('.speck-service-card-vertical');
        
        if (!speckCards.length) return;

        // Scroll animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animated');
                    }, index * 200);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        speckCards.forEach(card => {
            observer.observe(card);
            
            // Hover effects
            card.addEventListener('mouseenter', () => {
                card.style.background = 'rgba(255, 255, 255, 0.02)';
                
                const features = card.querySelectorAll('.speck-feature-vertical');
                features.forEach((feature, idx) => {
                    setTimeout(() => {
                        feature.style.transform = 'translateY(-2px)';
                    }, idx * 60);
                });
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.background = '';
                
                const features = card.querySelectorAll('.speck-feature-vertical');
                features.forEach(feature => {
                    feature.style.transform = '';
                });
            });
            
            // Click handler
            card.addEventListener('click', (e) => {
                e.preventDefault();
                
                const category = card.getAttribute('data-category');
                window.location.href = `services-${category}.html`;
            });
        });
    }

    // Анимации при скролле
    initScrollAnimations() {
        const elementsToAnimate = document.querySelectorAll('.reveal-element, .slide-up');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed', 'animate-in');
                }
            });
        }, { threshold: 0.1 });

        elementsToAnimate.forEach(el => observer.observe(el));
    }

    // Счетчики статистики
    initStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number-improved');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumber = entry.target;
                    const target = parseInt(statNumber.getAttribute('data-target')) || 0;
                    
                    if (target > 0) {
                        this.animateNumber(statNumber, target);
                        observer.unobserve(statNumber);
                    }
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => observer.observe(stat));
    }

    animateNumber(element, target) {
        let current = 0;
        const duration = 2000;
        const startTime = Date.now();
        
        const updateNumber = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            current = Math.floor(easeOutQuart * target);
            
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = target.toLocaleString();
                element.classList.add('counter-animate');
            }
        };
        requestAnimationFrame(updateNumber);
    }

    // Параллакс фоны
    initParallaxBackgrounds() {
        const contentSections = document.querySelectorAll('.content-section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bgIndex = entry.target.getAttribute('data-bg-index');
                    this.switchBackground(bgIndex);
                }
            });
        }, { threshold: 0.3 });

        contentSections.forEach(section => observer.observe(section));
    }

    switchBackground(bgIndex) {
        const backgrounds = document.querySelectorAll('.parallax-bg');
        backgrounds.forEach(bg => bg.classList.remove('active'));
        
        const targetBg = document.getElementById(`parallax-bg-${parseInt(bgIndex) + 1}`);
        if (targetBg) {
            targetBg.classList.add('active');
        }
    }

    // Marquee анимации
    initMarqueeAnimations() {
        const marqueeElements = document.querySelectorAll('.marquee-track');
        
        if (!marqueeElements.length) return;

        marqueeElements.forEach((track, index) => {
            const isReverse = index % 2 === 1;
            this.createMarqueeAnimation(track, isReverse);
        });
    }

    createMarqueeAnimation(track, reverse = false) {
        const content = track.querySelector('.marquee-content');
        const clone = content.cloneNode(true);
        track.appendChild(clone);
        
        const contentWidth = content.offsetWidth;
        let position = 0;
        let animationId = null;
        let isPaused = false;
        
        const animate = () => {
            if (isPaused) {
                animationId = requestAnimationFrame(animate);
                return;
            }
            
            if (reverse) {
                position += 1;
                if (position >= contentWidth) {
                    position = 0;
                }
            } else {
                position -= 1;
                if (position <= -contentWidth) {
                    position = 0;
                }
            }
            
            track.style.transform = `translateX(${position}px)`;
            animationId = requestAnimationFrame(animate);
        };
        
        // Start animation
        animate();
        
        // Pause on hover
        track.addEventListener('mouseenter', () => {
            isPaused = true;
        });
        
        track.addEventListener('mouseleave', () => {
            isPaused = false;
        });
        
        // Store animation ID for cleanup
        track._animationId = animationId;
    }

    // Очистка событий
    destroy() {
        const marqueeTracks = document.querySelectorAll('.marquee-track');
        marqueeTracks.forEach(track => {
            if (track._animationId) {
                cancelAnimationFrame(track._animationId);
            }
        });
    }
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    window.homePage = new HomePage();
});

// Функция для ручной инициализации (если нужно из другого скрипта)
function initHomePage() {
    if (!window.homePage) {
        window.homePage = new HomePage();
    }
}

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { HomePage, initHomePage };
}

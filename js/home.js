// home.js - Complete Home Page Functionality

class HomePage {
    constructor() {
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.init();
    }

    init() {
        this.initCompactSpeckCards();
        this.initScrollAnimations();
        this.initStatsCounter();
        this.initParallaxBackgrounds();
        this.initMarqueeAnimations();
    }

    // Compact Speck Cards Initialization
    initCompactSpeckCards() {
        const speckCards = document.querySelectorAll('.speck-service-card-compact');
        
        if (!speckCards.length) return;

        // Scroll animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animated');
                    }, index * 150);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        speckCards.forEach(card => {
            observer.observe(card);
            
            // Hover effects
            card.addEventListener('mouseenter', () => {
                const features = card.querySelectorAll('.speck-feature-compact');
                features.forEach((feature, idx) => {
                    setTimeout(() => {
                        feature.style.transform = 'translateY(-1px)';
                    }, idx * 50);
                });
            });
            
            card.addEventListener('mouseleave', () => {
                const features = card.querySelectorAll('.speck-feature-compact');
                features.forEach(feature => {
                    feature.style.transform = '';
                });
            });
            
            // Click handler
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const category = card.getAttribute('data-category');
                window.location.href = `services.html#${category}`;
            });
        });
    }

    // Scroll animations
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

    // Stats counters
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

    // Parallax backgrounds
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

    // Marquee animations - ИСПРАВЛЕННАЯ ВЕРСИЯ
    initMarqueeAnimations() {
        const marqueeElements = document.querySelectorAll('.marquee-track');
        
        if (!marqueeElements.length) return;

        console.log('♿ Reduced motion detected:', this.isReducedMotion);

        // ВСЕГДА используем JavaScript для лучшего контроля скорости
        this.initMarqueeJS();
    }

    // JavaScript анимация с нормальной скоростью
    initMarqueeJS() {
        console.log('🚀 Запуск JavaScript бегущей строки...');
        
        const tracks = document.querySelectorAll('.marquee-track');
        
        tracks.forEach((track, index) => {
            const isReverse = index === 1;
            
            // УБИРАЕМ CSS анимации полностью
            track.style.animation = 'none';
            
            let position = 0;
            // НОРМАЛЬНАЯ СКОРОСТЬ даже при reduced motion
            const speed = isReverse ? 2 : -2;
            const contentWidth = track.scrollWidth / 3;
            let animationId = null;
            let isPaused = false;
            
            function animate() {
                if (isPaused) {
                    animationId = requestAnimationFrame(animate);
                    return;
                }
                
                position += speed;
                
                if (position <= -contentWidth) {
                    position = 0;
                } else if (position >= 0) {
                    position = -contentWidth;
                }
                
                track.style.transform = `translateX(${position}px)`;
                animationId = requestAnimationFrame(animate);
            }
            
            // Запускаем анимацию
            animate();
            
            // Пауза при наведении
            track.addEventListener('mouseenter', () => {
                isPaused = true;
            });
            
            track.addEventListener('mouseleave', () => {
                isPaused = false;
            });
            
            // Сохраняем ID для очистки
            track._animationId = animationId;
            
            console.log(`✅ Трек ${index + 1} запущен через JS (${isReverse ? 'обратный' : 'прямой'}) скорость: ${speed}px/frame`);
        });
    }

    // Cleanup
    destroy() {
        const tracks = document.querySelectorAll('.marquee-track');
        tracks.forEach(track => {
            if (track._animationId) {
                cancelAnimationFrame(track._animationId);
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.homePage = new HomePage();
    console.log('🏠 HomePage инициализирован');
});

// Manual initialization function (if needed from another script)
function initHomePage() {
    if (!window.homePage) {
        window.homePage = new HomePage();
    }
}

// Проверка работы бегущей строки
function checkMarqueeWorking() {
    setTimeout(() => {
        const tracks = document.querySelectorAll('.marquee-track');
        let isWorking = false;
        
        tracks.forEach(track => {
            const transform = track.style.transform;
            if (transform && transform !== 'translateX(0px)' && transform !== 'none') {
                isWorking = true;
                console.log(`🎯 Трек двигается: ${transform}`);
            }
        });
        
        if (!isWorking) {
            console.warn('⚠️ Бегущая строка не работает, принудительный запуск...');
            if (window.homePage) {
                window.homePage.initMarqueeJS();
            }
        } else {
            console.log('✅ Бегущая строка работает корректно');
        }
    }, 2000);
}

// Проверяем после полной загрузки
window.addEventListener('load', () => {
    checkMarqueeWorking();
});

// Резервный запуск через 5 секунд
setTimeout(() => {
    const tracks = document.querySelectorAll('.marquee-track');
    let anyMoving = false;
    
    tracks.forEach(track => {
        const transform = track.style.transform;
        if (transform && transform !== 'translateX(0px)' && transform !== 'none') {
            anyMoving = true;
        }
    });
    
    if (!anyMoving && window.homePage) {
        console.log('🔄 Резервный запуск бегущей строки...');
        window.homePage.initMarqueeJS();
    }
}, 5000);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { HomePage, initHomePage };
}

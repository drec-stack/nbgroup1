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
        this.initMarqueeCSSAnimations(); // Исправленный метод
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

    // Бегущая строка через CSS анимации (исправленная версия)
    initMarqueeCSSAnimations() {
        console.log('♿ Reduced motion:', this.isReducedMotion);
        console.log('✅ Бегущая строка работает через CSS анимации');
        
        if (this.isReducedMotion) {
            console.log('⏸️ Reduced motion включен - показываем статичную бегущую строку');
            return;
        }
        
        // Просто гарантируем, что CSS анимации активны
        const marquees = document.querySelectorAll('.marquee-infinite-wrapper');
        
        marquees.forEach((marquee, index) => {
            // Проверяем, есть ли CSS анимация
            const style = window.getComputedStyle(marquee);
            const animationName = style.animationName;
            
            if (animationName && animationName !== 'none') {
                console.log(`✅ Marquee ${index + 1}: CSS анимация "${animationName}" активна`);
                marquee.style.animationPlayState = 'running';
            } else {
                console.warn(`⚠️ Marquee ${index + 1}: CSS анимация не найдена, принудительный запуск`);
                
                // Резервная CSS анимация через style
                if (index === 0) {
                    marquee.style.animation = 'marqueeLeft 40s linear infinite';
                } else {
                    marquee.style.animation = 'marqueeRight 40s linear infinite';
                }
            }
            
            // Оптимизация для плавности
            marquee.style.willChange = 'transform';
            marquee.style.transform = 'translate3d(0, 0, 0)';
        });
    }

    // Cleanup
    destroy() {
        // Ничего не делаем, так как используем только CSS анимации
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.homePage = new HomePage();
    console.log('🏠 HomePage инициализирован');
});

// Manual initialization function
function initHomePage() {
    if (!window.homePage) {
        window.homePage = new HomePage();
    }
}

// Проверка работы бегущей строки через CSS
function checkMarqueeWorking() {
    setTimeout(() => {
        const marquees = document.querySelectorAll('.marquee-infinite-wrapper');
        let workingCount = 0;
        
        marquees.forEach((marquee, index) => {
            const style = window.getComputedStyle(marquee);
            const isAnimating = style.animationName !== 'none' && 
                               style.animationPlayState === 'running';
            
            if (isAnimating) {
                workingCount++;
                console.log(`✅ Marquee ${index + 1}: работает (${style.animationName})`);
            } else {
                console.warn(`⚠️ Marquee ${index + 1}: не работает`);
            }
        });
        
        if (workingCount === marquees.length) {
            console.log('🎉 Все бегущие строки работают корректно!');
        } else if (workingCount > 0) {
            console.log(`⚠️ Работает ${workingCount} из ${marquees.length} строк`);
        } else {
            console.error('❌ Бегущие строки не работают!');
            // Принудительный запуск
            if (window.homePage) {
                window.homePage.initMarqueeCSSAnimations();
            }
        }
    }, 1000);
}

// Проверяем после полной загрузки
window.addEventListener('load', () => {
    setTimeout(checkMarqueeWorking, 500);
});

// Резервный запуск через 3 секунды
setTimeout(() => {
    const marquees = document.querySelectorAll('.marquee-infinite-wrapper');
    let anyWorking = false;
    
    marquees.forEach(marquee => {
        const style = window.getComputedStyle(marquee);
        if (style.animationName !== 'none') {
            anyWorking = true;
        }
    });
    
    if (!anyWorking && window.homePage) {
        console.log('🔄 Резервный запуск CSS анимаций...');
        window.homePage.initMarqueeCSSAnimations();
        checkMarqueeWorking();
    }
}, 3000);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { HomePage, initHomePage };
}

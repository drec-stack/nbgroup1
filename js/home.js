// home.js - Complete Home Page Functionality with WORKING MARQUEE

class HomePage {
    constructor() {
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.marqueeAnimations = [];
        this.init();
    }

    init() {
        this.initCompactSpeckCards();
        this.initScrollAnimations();
        this.initStatsCounter();
        this.initParallaxBackgrounds();
        this.initMarquee(); // Запускаем бегущую строку сразу
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

    // ===== РАБОЧАЯ БЕГУЩАЯ СТРОКА =====
    initMarquee() {
        console.log('🎬 Инициализация бегущей строки...');
        
        // Останавливаем предыдущие анимации
        this.stopMarquee();
        
        const marquee1 = document.getElementById('marquee1');
        const marquee2 = document.getElementById('marquee2');
        
        if (!marquee1 || !marquee2) {
            console.error('❌ Не найдены элементы бегущей строки');
            return;
        }

        // Для reduced motion показываем статично
        if (this.isReducedMotion) {
            console.log('♿ Reduced motion: показываем статичную строку');
            this.setupStaticMarquee(marquee1, marquee2);
            return;
        }

        // Запускаем анимации через requestAnimationFrame для плавности
        this.startMarqueeAnimation(marquee1, false); // Первая строка - влево
        this.startMarqueeAnimation(marquee2, true);  // Вторая строка - вправо
        
        console.log('✅ Бегущая строка запущена');
        
        // Добавляем обработчики для паузы при наведении
        this.addMarqueeHoverHandlers(marquee1, marquee2);
    }

    // Запуск анимации через requestAnimationFrame
    startMarqueeAnimation(marqueeElement, reverse = false) {
        const tracks = marqueeElement.querySelectorAll('.marquee-track');
        if (!tracks.length) return;
        
        const track = tracks[0];
        const trackWidth = track.offsetWidth;
        let position = 0;
        let speed = reverse ? 2 : -2; // px per frame
        let isPaused = false;
        let animationId = null;
        
        console.log(`▶️ Запуск анимации: ${reverse ? 'вправо' : 'влево'}, скорость: ${speed}px/кадр`);
        
        function animate() {
            if (isPaused) {
                animationId = requestAnimationFrame(animate);
                return;
            }
            
            position += speed;
            
            // Сброс позиции для бесконечной прокрутки
            if (position <= -trackWidth) {
                position = 0;
            } else if (position >= 0) {
                position = -trackWidth;
            }
            
            // Применяем трансформацию
            marqueeElement.style.transform = `translateX(${position}px)`;
            animationId = requestAnimationFrame(animate);
        }
        
        // Начальная позиция для второй строки (стартуем с середины)
        if (reverse) {
            position = -trackWidth / 2;
            marqueeElement.style.transform = `translateX(${position}px)`;
        }
        
        // Запускаем анимацию
        animate();
        
        // Сохраняем данные для управления анимацией
        marqueeElement._marqueeData = {
            animationId,
            isPaused,
            position,
            speed,
            trackWidth
        };
        
        this.marqueeAnimations.push(marqueeElement);
    }

    // Добавление обработчиков для паузы при наведении
    addMarqueeHoverHandlers(...marquees) {
        marquees.forEach(marquee => {
            const container = marquee.closest('.marquee-container');
            if (!container) return;
            
            container.addEventListener('mouseenter', () => {
                if (marquee._marqueeData) {
                    marquee._marqueeData.isPaused = true;
                }
            });
            
            container.addEventListener('mouseleave', () => {
                if (marquee._marqueeData) {
                    marquee._marqueeData.isPaused = false;
                }
            });
        });
    }

    // Статичная версия для reduced motion
    setupStaticMarquee(marquee1, marquee2) {
        // Центрируем содержимое
        marquee1.style.justifyContent = 'center';
        marquee2.style.justifyContent = 'center';
        
        // Показываем только один трек
        const tracks1 = marquee1.querySelectorAll('.marquee-track');
        const tracks2 = marquee2.querySelectorAll('.marquee-track');
        
        if (tracks1.length > 1) tracks1[1].style.display = 'none';
        if (tracks2.length > 1) tracks2[1].style.display = 'none';
        
        // Убираем градиенты
        const containers = document.querySelectorAll('.marquee-container');
        containers.forEach(container => {
            container.style.setProperty('--before-display', 'none');
            container.style.setProperty('--after-display', 'none');
        });
    }

    // Остановка всех анимаций
    stopMarquee() {
        this.marqueeAnimations.forEach(marquee => {
            if (marquee._marqueeData && marquee._marqueeData.animationId) {
                cancelAnimationFrame(marquee._marqueeData.animationId);
            }
        });
        this.marqueeAnimations = [];
    }

    // Перезапуск анимаций
    restartMarquee() {
        console.log('🔄 Перезапуск бегущей строки...');
        this.stopMarquee();
        this.initMarquee();
    }

    // Cleanup
    destroy() {
        this.stopMarquee();
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

// Проверка работы бегущей строки
function checkMarqueeWorking() {
    setTimeout(() => {
        const marquee1 = document.getElementById('marquee1');
        const marquee2 = document.getElementById('marquee2');
        
        if (!marquee1 || !marquee2) {
            console.error('❌ Элементы бегущей строки не найдены');
            return;
        }
        
        const style1 = window.getComputedStyle(marquee1);
        const style2 = window.getComputedStyle(marquee2);
        
        const transform1 = style1.transform;
        const transform2 = style2.transform;
        
        console.log('🎯 Проверка бегущей строки:');
        console.log(`  Marquee 1: ${transform1 !== 'none' ? '✅ Двигается' : '❌ Не двигается'}`);
        console.log(`  Marquee 2: ${transform2 !== 'none' ? '✅ Двигается' : '❌ Не двигается'}`);
        
        // Если не двигаются, перезапускаем
        if (transform1 === 'none' || transform2 === 'none') {
            console.log('🔄 Принудительный перезапуск...');
            if (window.homePage) {
                window.homePage.restartMarquee();
            }
        }
    }, 1500);
}

// Проверяем после полной загрузки
window.addEventListener('load', () => {
    setTimeout(checkMarqueeWorking, 500);
});

// Резервный запуск через 3 секунды
setTimeout(() => {
    const marquee1 = document.getElementById('marquee1');
    if (marquee1) {
        const style = window.getComputedStyle(marquee1);
        if (style.transform === 'none') {
            console.log('🔄 Автоматический перезапуск через 3 секунды...');
            if (window.homePage) {
                window.homePage.restartMarquee();
                checkMarqueeWorking();
            }
        }
    }
}, 3000);

// Обновляем анимации при изменении размера окна
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        console.log('🔄 Обновление анимаций после ресайза...');
        if (window.homePage) {
            window.homePage.restartMarquee();
        }
    }, 250);
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { HomePage, initHomePage };
}

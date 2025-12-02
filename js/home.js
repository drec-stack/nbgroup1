// home.js - Complete Home Page Functionality with WORKING MARQUEE

class HomePage {
    constructor() {
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.marqueeAnimations = [];
        this.init();
    }

    init() {
        console.log('🏠 HomePage инициализация...');
        this.initCompactSpeckCards();
        this.initScrollAnimations();
        this.initStatsCounter();
        this.initParallaxBackgrounds();
        
        // Запускаем бегущую строку с небольшой задержкой
        setTimeout(() => {
            this.initMarquee();
        }, 500);
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
            console.log('♿ Reduced motion: статичная бегущая строка');
            this.setupStaticMarquee(marquee1, marquee2);
            return;
        }

        // Пробуем сначала CSS анимации (они более плавные)
        this.tryCSSAnimations(marquee1, marquee2);
        
        // Резервная проверка через 2 секунды
        setTimeout(() => {
            this.verifyMarqueeRunning(marquee1, marquee2);
        }, 2000);
    }

    // Пробуем CSS анимации
    tryCSSAnimations(marquee1, marquee2) {
        console.log('🎨 Пробуем CSS анимации...');
        
        // Добавляем CSS классы
        marquee1.classList.add('marquee-animate-left');
        marquee2.classList.add('marquee-animate-right');
        
        // Принудительно запускаем
        marquee1.style.animationPlayState = 'running';
        marquee2.style.animationPlayState = 'running';
        
        // Оптимизации для плавности
        this.optimizeForPerformance(marquee1);
        this.optimizeForPerformance(marquee2);
        
        // Добавляем паузу при наведении
        this.addMarqueeHoverHandlers(marquee1, marquee2);
        
        this.marqueeAnimations = [marquee1, marquee2];
        
        console.log('✅ CSS анимации запущены');
    }

    // Проверяем работает ли анимация
    verifyMarqueeRunning(marquee1, marquee2) {
        const style1 = window.getComputedStyle(marquee1);
        const style2 = window.getComputedStyle(marquee2);
        
        const isCSSWorking = style1.animationName !== 'none' && style2.animationName !== 'none';
        
        if (!isCSSWorking) {
            console.log('⚠️ CSS анимации не работают, переключаемся на JS...');
            this.startJSAnimations(marquee1, marquee2);
        } else {
            console.log('✅ CSS анимации работают корректно');
        }
    }

    // Запуск JS анимаций (резервный метод)
    startJSAnimations(marquee1, marquee2) {
        // Убираем CSS классы
        marquee1.classList.remove('marquee-animate-left');
        marquee2.classList.remove('marquee-animate-right');
        
        // Останавливаем любые существующие анимации
        this.stopMarquee();
        
        console.log('🔄 Запуск JS анимаций...');
        
        // Запускаем через requestAnimationFrame
        this.startMarqueeAnimation(marquee1, false); // Влево
        this.startMarqueeAnimation(marquee2, true);  // Вправо
    }

    // JS анимация через requestAnimationFrame
    startMarqueeAnimation(marqueeElement, reverse = false) {
        const tracks = marqueeElement.querySelectorAll('.marquee-track');
        if (!tracks.length) return;
        
        const track = tracks[0];
        const trackWidth = track.offsetWidth;
        let position = 0;
        const speed = reverse ? 1 : -1; // Скорость в пикселях за кадр
        let isPaused = false;
        let animationId = null;
        
        console.log(`▶️ JS анимация: ${reverse ? 'вправо' : 'влево'}`);
        
        function animate() {
            if (isPaused) {
                animationId = requestAnimationFrame(animate);
                return;
            }
            
            position += speed;
            
            // Сброс для бесконечной прокрутки
            if (position <= -trackWidth) {
                position = 0;
            } else if (position >= 0) {
                position = -trackWidth;
            }
            
            marqueeElement.style.transform = `translateX(${position}px)`;
            animationId = requestAnimationFrame(animate);
        }
        
        // Начальная позиция для второй строки
        if (reverse) {
            position = -trackWidth / 2;
            marqueeElement.style.transform = `translateX(${position}px)`;
        }
        
        // Запускаем
        animate();
        
        // Сохраняем данные
        marqueeElement._marqueeData = {
            animationId,
            isPaused,
            position,
            speed
        };
        
        this.marqueeAnimations.push(marqueeElement);
    }

    // Добавление обработчиков для паузы при наведении
    addMarqueeHoverHandlers(marquee1, marquee2) {
        const addHoverToMarquee = (marquee) => {
            const container = marquee.closest('.marquee-container');
            if (!container) return;
            
            container.addEventListener('mouseenter', () => {
                if (marquee._marqueeData) {
                    marquee._marqueeData.isPaused = true;
                } else {
                    marquee.style.animationPlayState = 'paused';
                }
            });
            
            container.addEventListener('mouseleave', () => {
                if (marquee._marqueeData) {
                    marquee._marqueeData.isPaused = false;
                } else {
                    marquee.style.animationPlayState = 'running';
                }
            });
        };
        
        addHoverToMarquee(marquee1);
        addHoverToMarquee(marquee2);
    }

    // Оптимизация для производительности
    optimizeForPerformance(element) {
        element.style.willChange = 'transform';
        element.style.transform = 'translate3d(0, 0, 0)';
        element.style.backfaceVisibility = 'hidden';
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
    }

    // Остановка всех анимаций
    stopMarquee() {
        this.marqueeAnimations.forEach(marquee => {
            // Останавливаем JS анимации
            if (marquee._marqueeData && marquee._marqueeData.animationId) {
                cancelAnimationFrame(marquee._marqueeData.animationId);
                delete marquee._marqueeData;
            }
            
            // Останавливаем CSS анимации
            marquee.classList.remove('marquee-animate-left', 'marquee-animate-right');
            marquee.style.animation = '';
            marquee.style.transform = '';
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
    // Небольшая задержка для гарантии загрузки всех ресурсов
    setTimeout(() => {
        window.homePage = new HomePage();
        console.log('✅ HomePage инициализирован');
    }, 100);
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
        
        if (!marquee1 || !marquee2) return;
        
        const style1 = window.getComputedStyle(marquee1);
        const style2 = window.getComputedStyle(marquee2);
        
        const isWorking = 
            (style1.transform !== 'none' && style1.transform !== 'matrix(1, 0, 0, 1, 0, 0)') ||
            (style2.transform !== 'none' && style2.transform !== 'matrix(1, 0, 0, 1, 0, 0)') ||
            style1.animationName !== 'none' ||
            style2.animationName !== 'none';
        
        if (!isWorking) {
            console.warn('⚠️ Бегущая строка не работает, перезапуск...');
            if (window.homePage) {
                window.homePage.restartMarquee();
            }
            
            // Пробуем fallback
            if (typeof window.startMarqueeFallback === 'function') {
                window.startMarqueeFallback();
            }
        }
    }, 3000);
}

// Проверяем после полной загрузки
window.addEventListener('load', () => {
    setTimeout(checkMarqueeWorking, 1000);
});

// Резервный запуск через 5 секунд
setTimeout(() => {
    const marquee1 = document.getElementById('marquee1');
    if (marquee1) {
        const style = window.getComputedStyle(marquee1);
        if (style.transform === 'none' && style.animationName === 'none') {
            console.log('🔄 Резервный запуск через 5 секунд...');
            if (window.homePage) {
                window.homePage.restartMarquee();
            }
        }
    }
}, 5000);

// Обновляем при изменении размера окна
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

// Глобальные функции для отладки
window.debugMarquee = function() {
    const marquee1 = document.getElementById('marquee1');
    const marquee2 = document.getElementById('marquee2');
    
    if (!marquee1 || !marquee2) {
        console.error('❌ Элементы не найдены');
        return;
    }
    
    const style1 = window.getComputedStyle(marquee1);
    const style2 = window.getComputedStyle(marquee2);
    
    console.log('🔍 Отладка бегущей строки:');
    console.log('Marquee 1:', {
        transform: style1.transform,
        animationName: style1.animationName,
        animationPlayState: style1.animationPlayState,
        hasData: !!marquee1._marqueeData
    });
    console.log('Marquee 2:', {
        transform: style2.transform,
        animationName: style2.animationName,
        animationPlayState: style2.animationPlayState,
        hasData: !!marquee2._marqueeData
    });
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { HomePage, initHomePage };
}

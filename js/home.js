// home.js - Simple and Reliable Home Page Functionality

class HomePage {
    constructor() {
        console.log('🏠 HomePage инициализация...');
        this.marqueeAnimation = null;
        this.init();
    }

    init() {
        this.initCompactSpeckCards();
        this.initScrollAnimations();
        this.initStatsCounter();
        this.initParallaxBackgrounds();
        
        // Не инициализируем бегущую строку здесь - она запускается из index.html
        console.log('✅ HomePage инициализирован');
    }

    // Compact Speck Cards Initialization
    initCompactSpeckCards() {
        const speckCards = document.querySelectorAll('.speck-service-card-compact');
        
        if (!speckCards.length) {
            console.log('ℹ️ Compact speck cards не найдены');
            return;
        }

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
        
        console.log(`✅ ${speckCards.length} compact speck cards инициализированы`);
    }

    // Scroll animations
    initScrollAnimations() {
        const elementsToAnimate = document.querySelectorAll('.reveal-element, .slide-up');
        
        if (!elementsToAnimate.length) {
            console.log('ℹ️ Нет элементов для scroll анимаций');
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed', 'animate-in');
                }
            });
        }, { threshold: 0.1 });

        elementsToAnimate.forEach(el => observer.observe(el));
        
        console.log(`✅ ${elementsToAnimate.length} scroll элементов отслеживаются`);
    }

    // Stats counters
    initStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number-improved');
        
        if (!statNumbers.length) {
            console.log('ℹ️ Статистические счетчики не найдены');
            return;
        }

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
        
        console.log(`✅ ${statNumbers.length} статистических счетчиков отслеживаются`);
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
        
        if (!contentSections.length) {
            console.log('ℹ️ Секции для параллакса не найдены');
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bgIndex = entry.target.getAttribute('data-bg-index');
                    this.switchBackground(bgIndex);
                }
            });
        }, { threshold: 0.3 });

        contentSections.forEach(section => observer.observe(section));
        
        console.log(`✅ ${contentSections.length} параллакс секций отслеживаются`);
    }

    switchBackground(bgIndex) {
        const backgrounds = document.querySelectorAll('.parallax-bg');
        backgrounds.forEach(bg => bg.classList.remove('active'));
        
        const targetBg = document.getElementById(`parallax-bg-${parseInt(bgIndex) + 1}`);
        if (targetBg) {
            targetBg.classList.add('active');
        }
    }

    // Метод для ручного запуска бегущей строки (если нужно)
    initMarquee() {
        console.log('🎬 HomePage: инициализация бегущей строки...');
        
        const marquee1 = document.getElementById('marquee1');
        const marquee2 = document.getElementById('marquee2');
        
        if (!marquee1 || !marquee2) {
            console.error('❌ Элементы бегущей строки не найдены');
            return;
        }
        
        // Простая JS анимация как резерв
        if (this.marqueeAnimation) {
            cancelAnimationFrame(this.marqueeAnimation);
        }
        
        let pos1 = 0;
        let pos2 = 0;
        const speed = 1;
        
        const animate = () => {
            // Первая строка - влево
            pos1 -= speed;
            const track1 = marquee1.querySelector('.marquee-track');
            if (track1) {
                const width1 = track1.offsetWidth;
                if (pos1 <= -width1) pos1 = 0;
                marquee1.style.transform = `translateX(${pos1}px)`;
            }
            
            // Вторая строка - вправо
            pos2 += speed;
            const track2 = marquee2.querySelector('.marquee-track');
            if (track2) {
                const width2 = track2.offsetWidth;
                if (pos2 >= 0) pos2 = -width2;
                marquee2.style.transform = `translateX(${pos2}px)`;
            }
            
            this.marqueeAnimation = requestAnimationFrame(animate);
        };
        
        animate();
        
        console.log('✅ HomePage: JS бегущая строка запущена');
    }

    // Cleanup
    destroy() {
        if (this.marqueeAnimation) {
            cancelAnimationFrame(this.marqueeAnimation);
            this.marqueeAnimation = null;
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Небольшая задержка чтобы все загрузилось
    setTimeout(() => {
        try {
            window.homePage = new HomePage();
            console.log('✅ HomePage успешно создан');
        } catch (error) {
            console.error('❌ Ошибка создания HomePage:', error);
        }
    }, 100);
});

// Manual initialization function
function initHomePage() {
    if (!window.homePage) {
        window.homePage = new HomePage();
    }
}

// Проверка через 3 секунды
setTimeout(() => {
    const marquee1 = document.getElementById('marquee1');
    if (marquee1) {
        const style = window.getComputedStyle(marquee1);
        console.log('🎯 Через 3 секунды:');
        console.log('  Анимация:', style.animationName);
        console.log('  Transform:', style.transform);
        
        // Если не двигается, попробуем запустить
        if (style.animationName === 'none' && style.transform === 'none') {
            console.log('⚠️ Бегущая строка не работает через 3 секунды');
            // Можно вызвать window.forceMarquee() из консоли
        }
    }
}, 3000);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { HomePage, initHomePage };
}

// Fix для ошибки в main.js
if (typeof window !== 'undefined') {
    window.updateLanguageSwitcher = function(lang) {
        console.log('🌍 updateLanguageSwitcher called with:', lang);
        // Минимальная реализация чтобы избежать ошибки
        const switcher = document.querySelector('.language-switcher');
        if (switcher) {
            switcher.setAttribute('data-current-lang', lang);
        }
    };
}

// home.js - ФУНКЦИИ ГЛАВНОЙ СТРАНИЦЫ

class HomePage {
    constructor() {
        console.log('🏠 HomePage инициализация...');
        this.init();
    }

    init() {
        this.initCompactSpeckCards();
        this.initScrollAnimations();
        this.initStatsCounter();
        this.initParallaxBackgrounds();
        this.initHeroAnimation();
        
        console.log('✅ HomePage инициализирован');
    }

    // Анимация героя
    initHeroAnimation() {
        const heroTitle = document.querySelector('.hero h1');
        const heroText = document.querySelector('.hero p');
        const heroButtons = document.querySelector('.hero-actions');
        
        if (heroTitle) {
            setTimeout(() => {
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            }, 300);
        }
        
        if (heroText) {
            setTimeout(() => {
                heroText.style.opacity = '1';
                heroText.style.transform = 'translateY(0)';
            }, 600);
        }
        
        if (heroButtons) {
            setTimeout(() => {
                heroButtons.style.opacity = '1';
                heroButtons.style.transform = 'translateY(0)';
            }, 900);
        }
    }

    // Карточки услуг
    initCompactSpeckCards() {
        const speckCards = document.querySelectorAll('.speck-service-card-compact');
        
        if (!speckCards.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animated');
                    }, index * 150);
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        speckCards.forEach(card => {
            observer.observe(card);
            
            // Клик по карточке
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const category = card.getAttribute('data-category');
                
                // Анимация нажатия
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = '';
                }, 200);
                
                // Переход на страницу услуг
                setTimeout(() => {
                    window.location.href = `services.html#${category}`;
                }, 300);
            });
            
            // Анимация при наведении для разделов
            card.addEventListener('mouseenter', () => {
                const allCards = document.querySelectorAll('.speck-service-card-compact');
                allCards.forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.style.opacity = '0.6';
                        otherCard.style.filter = 'blur(1px)';
                    }
                });
            });
            
            card.addEventListener('mouseleave', () => {
                const allCards = document.querySelectorAll('.speck-service-card-compact');
                allCards.forEach(otherCard => {
                    otherCard.style.opacity = '';
                    otherCard.style.filter = '';
                });
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
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

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
                    
                    if (target > 0 && !statNumber.classList.contains('animated')) {
                        this.animateNumber(statNumber, target);
                        statNumber.classList.add('animated');
                        observer.unobserve(statNumber);
                    }
                }
            });
        }, { 
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        });

        statNumbers.forEach(stat => {
            if (!stat.classList.contains('animated')) {
                observer.observe(stat);
            }
        });
    }

    // Анимация чисел
    animateNumber(element, target) {
        let current = 0;
        const duration = 2000;
        const startTime = Date.now();
        const startValue = parseInt(element.textContent) || 0;
        
        const updateNumber = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            current = Math.floor(easeOutQuart * (target - startValue) + startValue);
            
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = target.toLocaleString();
                element.classList.add('counter-animate');
                
                // Убираем анимацию через 500мс
                setTimeout(() => {
                    element.classList.remove('counter-animate');
                }, 500);
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
        }, { 
            threshold: 0.3,
            rootMargin: '-100px 0px -100px 0px'
        });

        contentSections.forEach(section => {
            if (section.getAttribute('data-bg-index') !== null) {
                observer.observe(section);
            }
        });
    }

    // Переключение фона
    switchBackground(bgIndex) {
        const backgrounds = document.querySelectorAll('.parallax-bg');
        backgrounds.forEach(bg => bg.classList.remove('active'));
        
        const targetBg = document.getElementById(`parallax-bg-${parseInt(bgIndex) + 1}`);
        if (targetBg) {
            targetBg.classList.add('active');
        }
    }

    // Утилиты
    static debug() {
        console.log('🔍 Отладка HomePage:');
        console.log('- speckCards:', document.querySelectorAll('.speck-service-card-compact').length);
        console.log('- statNumbers:', document.querySelectorAll('.stat-number-improved').length);
        console.log('- marquee1:', document.getElementById('marquee1'));
        console.log('- marquee2:', document.getElementById('marquee2'));
        console.log('- header:', document.querySelector('.main-header'));
    }
}

// Инициализация после загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
    // Ждем немного чтобы все загрузилось
    setTimeout(() => {
        try {
            window.homePage = new HomePage();
            
            // Проверяем бегущую строку
            const marquee1 = document.getElementById('marquee1');
            const marquee2 = document.getElementById('marquee2');
            
            if (marquee1 && marquee2) {
                const checkMarquee = () => {
                    const style1 = window.getComputedStyle(marquee1);
                    if (style1.animationName === 'none' || style1.animationPlayState === 'paused') {
                        console.log('🔄 Запуск бегущей строки через home.js...');
                        marquee1.style.animation = 'marqueeLeft 40s linear infinite';
                        marquee2.style.animation = 'marqueeRight 40s linear infinite';
                        marquee1.style.animationPlayState = 'running';
                        marquee2.style.animationPlayState = 'running';
                    }
                };
                
                // Проверяем через 2 секунды
                setTimeout(checkMarquee, 2000);
                
                // И каждые 10 секунд на случай остановки
                setInterval(checkMarquee, 10000);
            }
        } catch (error) {
            console.error('❌ Ошибка инициализации HomePage:', error);
        }
    }, 1000);
});

// Глобальные хелперы
if (typeof window !== 'undefined') {
    window.homePageDebug = HomePage.debug;
    
    // Фикс для i18n если он есть
    window.updateLanguageSwitcher = function(lang) {
        const switcher = document.querySelector('.language-switcher');
        if (switcher) {
            switcher.setAttribute('data-current-lang', lang);
        }
    };
    
    // Проверка статуса анимаций
    window.checkAnimations = function() {
        console.log('🎬 Статус анимаций:');
        
        const marquee1 = document.getElementById('marquee1');
        if (marquee1) {
            const style = window.getComputedStyle(marquee1);
            console.log('- Бегущая строка:', {
                animation: style.animationName,
                playState: style.animationPlayState,
                transform: style.transform
            });
        }
        
        console.log('- Карточки услуг:', document.querySelectorAll('.speck-service-card-compact.animated').length + '/' + document.querySelectorAll('.speck-service-card-compact').length);
        console.log('- Счетчики:', document.querySelectorAll('.stat-number-improved.animated').length + '/' + document.querySelectorAll('.stat-number-improved').length);
    };
}

console.log('✅ home.js загружен');

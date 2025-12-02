// ===========================================
// HOME.JS - JavaScript для главной страницы
// ===========================================

console.log('🏠 home.js загружен - NBGROUP.TECH');

class HomePage {
    constructor() {
        console.log('🚀 Инициализация главной страницы...');
        this.init();
    }

    init() {
        // Запускаем все функции по порядку
        this.initHeroAnimation();
        this.initSpeckCards();
        this.initMarquee();
        this.initStatsCounter();
        this.initParallaxBackgrounds();
        this.initScrollAnimations();
        this.initCTAAnimation();
        this.initScrollIndicator();
        
        console.log('✅ Главная страница инициализирована');
    }

    // 1. Анимация героя при загрузке
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
        
        console.log('🎨 Анимация героя запущена');
    }

    // 2. Карточки услуг с анимациями
    initSpeckCards() {
        const speckCards = document.querySelectorAll('.speck-service-card-compact');
        
        if (!speckCards.length) {
            console.warn('⚠️ Карточки услуг не найдены');
            return;
        }
        
        console.log(`🎴 Найдено ${speckCards.length} карточек услуг`);
        
        // Intersection Observer для появления карточек
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

        // Наблюдаем за каждой карточкой
        speckCards.forEach(card => {
            observer.observe(card);
            
            // Клик по карточке
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const category = card.getAttribute('data-category');
                
                // Анимация нажатия
                card.style.transform = 'scale(0.97)';
                setTimeout(() => {
                    card.style.transform = '';
                }, 200);
                
                // Переход на страницу услуг
                setTimeout(() => {
                    if (category) {
                        window.location.href = `services.html#${category}`;
                    } else {
                        window.location.href = 'services.html';
                    }
                }, 350);
            });
            
            // Эффект при наведении
            card.addEventListener('mouseenter', () => {
                const allCards = document.querySelectorAll('.speck-service-card-compact');
                allCards.forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.style.opacity = '0.5';
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
        
        console.log('✅ Карточки услуг инициализированы');
    }

    // 3. БЕГУЩАЯ СТРОКА - ГАРАНТИРОВАННАЯ РАБОТА
    initMarquee() {
        const marquee1 = document.getElementById('marquee1');
        const marquee2 = document.getElementById('marquee2');
        
        if (!marquee1 || !marquee2) {
            console.error('❌ Элементы бегущей строки не найдены');
            return;
        }
        
        console.log('🎬 Инициализация бегущей строки...');
        
        // Сбрасываем все стили
        marquee1.style.cssText = '';
        marquee2.style.cssText = '';
        
        // Принудительно запускаем CSS анимации
        marquee1.style.animation = 'marqueeLeft 35s linear infinite';
        marquee2.style.animation = 'marqueeRight 35s linear infinite';
        marquee1.style.animationPlayState = 'running';
        marquee2.style.animationPlayState = 'running';
        
        // Оптимизация для плавности
        marquee1.style.willChange = 'transform';
        marquee2.style.willChange = 'transform';
        marquee1.style.transform = 'translate3d(0, 0, 0)';
        marquee2.style.transform = 'translate3d(0, 0, 0)';
        
        console.log('✅ CSS анимации установлены');
        
        // Пауза при наведении
        document.querySelectorAll('.marquee-container').forEach(container => {
            container.addEventListener('mouseenter', () => {
                marquee1.style.animationPlayState = 'paused';
                marquee2.style.animationPlayState = 'paused';
            });
            
            container.addEventListener('mouseleave', () => {
                marquee1.style.animationPlayState = 'running';
                marquee2.style.animationPlayState = 'running';
            });
        });
        
        // Проверка через 2 секунды
        setTimeout(() => {
            const style1 = window.getComputedStyle(marquee1);
            
            // Если CSS не работает, запускаем JS fallback
            if (style1.animationName === 'none' || style1.animationPlayState === 'paused') {
                console.log('🔄 CSS не работает, запускаем JS fallback...');
                this.startJSMarquee();
            } else {
                console.log('🎉 Бегущая строка работает через CSS');
            }
        }, 2000);
        
        console.log('✅ Бегущая строка инициализирована');
    }

    // 4. JS Fallback для бегущей строки
    startJSMarquee() {
        const marquee1 = document.getElementById('marquee1');
        const marquee2 = document.getElementById('marquee2');
        
        if (!marquee1 || !marquee2) return;
        
        let pos1 = 0;
        let pos2 = 0;
        const speed = 1;
        let animationId = null;
        
        function animate() {
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
            
            animationId = requestAnimationFrame(animate);
        }
        
        // Запускаем анимацию
        animate();
        
        // Сохраняем ID для возможности остановки
        window._marqueeAnimationId = animationId;
        
        console.log('✅ JS fallback анимация запущена');
    }

    // 5. Счетчики статистики
    initStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number-improved');
        
        if (!statNumbers.length) {
            console.warn('⚠️ Счетчики статистики не найдены');
            return;
        }
        
        console.log(`📊 Найдено ${statNumbers.length} счетчиков`);
        
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

        // Наблюдаем за каждым счетчиком
        statNumbers.forEach(stat => {
            if (!stat.classList.contains('animated')) {
                observer.observe(stat);
            }
        });
        
        // Анимируем карточки статистики
        const statCards = document.querySelectorAll('.stat-card');
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animated');
                    }, index * 150);
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        statCards.forEach(card => cardObserver.observe(card));
        
        console.log('✅ Счетчики статистики инициализированы');
    }

    // 6. Анимация чисел
    animateNumber(element, target) {
        let current = 0;
        const duration = 2000;
        const startTime = Date.now();
        const startValue = parseInt(element.textContent) || 0;
        
        const updateNumber = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease Out Quart функция для плавности
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            current = Math.floor(easeOutQuart * (target - startValue) + startValue);
            
            // Обновляем значение с форматированием
            element.textContent = current.toLocaleString();
            
            // Продолжаем анимацию если не достигли цели
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                // Финальное значение
                element.textContent = target.toLocaleString();
                
                // Добавляем небольшую анимацию завершения
                element.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 150);
            }
        };
        
        // Запускаем анимацию
        requestAnimationFrame(updateNumber);
    }

    // 7. Параллакс фоны
    initParallaxBackgrounds() {
        const contentSections = document.querySelectorAll('.content-section');
        
        if (!contentSections.length) return;
        
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
        
        console.log('🌌 Параллакс фоны инициализированы');
    }

    // 8. Переключение фона
    switchBackground(bgIndex) {
        const backgrounds = document.querySelectorAll('.parallax-bg');
        backgrounds.forEach(bg => bg.classList.remove('active'));
        
        const targetBg = document.getElementById(`parallax-bg-${parseInt(bgIndex) + 1}`);
        if (targetBg) {
            targetBg.classList.add('active');
        }
    }

    // 9. Анимации при скролле для общих элементов
    initScrollAnimations() {
        const elementsToAnimate = document.querySelectorAll('.reveal-element');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elementsToAnimate.forEach(el => observer.observe(el));
    }

    // 10. Анимация для CTA секции
    initCTAAnimation() {
        const ctaSection = document.querySelector('.cta-improved');
        if (!ctaSection) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(ctaSection);
    }

    // 11. Индикатор прокрутки для героя
    initScrollIndicator() {
        const scrollIndicator = document.querySelector('.parallax-scroll-indicator');
        if (!scrollIndicator) return;
        
        let isVisible = true;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100 && isVisible) {
                scrollIndicator.classList.add('hidden');
                isVisible = false;
            } else if (window.scrollY <= 100 && !isVisible) {
                scrollIndicator.classList.remove('hidden');
                isVisible = true;
            }
        });
    }

    // Утилиты для отладки
    static debug() {
        console.log('🔍 Отладка главной страницы:');
        console.log('- Карточки услуг:', document.querySelectorAll('.speck-service-card-compact').length);
        console.log('- Счетчики:', document.querySelectorAll('.stat-number-improved').length);
        console.log('- Бегущая строка 1:', document.getElementById('marquee1') ? '✓ найден' : '✗ не найден');
        console.log('- Бегущая строка 2:', document.getElementById('marquee2') ? '✓ найден' : '✗ не найден');
        console.log('- Хедер:', document.querySelector('.main-header') ? '✓ найден' : '✗ не найден');
        console.log('- Hero секция:', document.querySelector('.hero') ? '✓ найдена' : '✗ не найдена');
    }
}

// ===========================================
// ЗАПУСК ВСЕГО ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
// ===========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM полностью загружен, запускаем инициализацию...');
    
    // Ждем немного чтобы все статические элементы загрузились
    setTimeout(() => {
        try {
            // Создаем экземпляр главной страницы
            window.homePage = new HomePage();
            
            // Дополнительная проверка бегущей строки через 3 секунды
            setTimeout(() => {
                const marquee1 = document.getElementById('marquee1');
                if (marquee1) {
                    const style = window.getComputedStyle(marquee1);
                    if (style.animationName === 'none' || style.animationPlayState === 'paused') {
                        console.log('🔄 Повторная проверка: запускаем бегущую строку...');
                        marquee1.style.animation = 'marqueeLeft 35s linear infinite';
                        marquee1.style.animationPlayState = 'running';
                        
                        const marquee2 = document.getElementById('marquee2');
                        if (marquee2) {
                            marquee2.style.animation = 'marqueeRight 35s linear infinite';
                            marquee2.style.animationPlayState = 'running';
                        }
                    }
                }
            }, 3000);
            
        } catch (error) {
            console.error('❌ Критическая ошибка при инициализации главной страницы:', error);
        }
    }, 500);
});

// ===========================================
// ГЛОБАЛЬНЫЕ ФУНКЦИИ ДЛЯ ОТЛАДКИ
// ===========================================

if (typeof window !== 'undefined') {
    // Отладка
    window.debugHomePage = HomePage.debug;
    
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
        
        console.log('- Анимированные карточки услуг:', document.querySelectorAll('.speck-service-card-compact.animated').length + '/' + document.querySelectorAll('.speck-service-card-compact').length);
        console.log('- Анимированные счетчики:', document.querySelectorAll('.stat-number-improved.animated').length + '/' + document.querySelectorAll('.stat-number-improved').length);
        console.log('- Анимированные карточки статистики:', document.querySelectorAll('.stat-card.animated').length + '/' + document.querySelectorAll('.stat-card').length);
    };
    
    // Ручной запуск бегущей строки
    window.restartMarquee = function() {
        console.log('🔁 Ручной перезапуск бегущей строки...');
        
        const marquee1 = document.getElementById('marquee1');
        const marquee2 = document.getElementById('marquee2');
        
        if (marquee1 && marquee2) {
            // Останавливаем существующие анимации
            marquee1.style.animation = 'none';
            marquee2.style.animation = 'none';
            
            // Перезапускаем
            setTimeout(() => {
                marquee1.style.animation = 'marqueeLeft 35s linear infinite';
                marquee2.style.animation = 'marqueeRight 35s linear infinite';
                marquee1.style.animationPlayState = 'running';
                marquee2.style.animationPlayState = 'running';
                console.log('✅ Бегущая строка перезапущена');
            }, 50);
        }
    };
}

console.log('✅ home.js готов к работе');

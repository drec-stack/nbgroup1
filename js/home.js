// home.js - SIMPLE AND GUARANTEED TO WORK
console.log('🚀 home.js loaded - SIMPLE VERSION');

// Главная функция инициализации
function initHome() {
    console.log('🎯 Initializing home page...');
    
    // Сначала запускаем бегущую строку - это самое важное
    setupSimpleMarquee();
    
    // Потом остальные функции
    setupStatsCounter();
    setupScrollAnimations();
    
    console.log('✅ Home page initialized successfully');
}

// САМАЯ ПРОСТАЯ И РАБОЧАЯ ФУНКЦИЯ ДЛЯ БЕГУЩЕЙ СТРОКИ
function setupSimpleMarquee() {
    const marquee = document.querySelector('.marquee-content');
    
    if (!marquee) {
        console.error('❌ Marquee element not found!');
        return;
    }
    
    console.log('✅ Marquee found, starting simple animation...');
    
    // 1. Полностью сбрасываем анимацию
    marquee.style.animation = 'none';
    marquee.style.webkitAnimation = 'none';
    
    // 2. Принудительная перерисовка
    void marquee.offsetWidth;
    
    // 3. Применяем анимацию с задержкой чтобы браузер успел обработать
    setTimeout(() => {
        marquee.style.animation = 'marquee-scroll 40s linear infinite';
        marquee.style.webkitAnimation = 'marquee-scroll 40s linear infinite';
        marquee.style.animationPlayState = 'running';
        marquee.style.webkitAnimationPlayState = 'running';
        
        console.log('🎬 Marquee animation APPLIED:', marquee.style.animation);
    }, 100);
    
    // 4. Добавляем обработчики для паузы при наведении
    marquee.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
        this.style.webkitAnimationPlayState = 'paused';
    });
    
    marquee.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
        this.style.webkitAnimationPlayState = 'running';
    });
    
    // 5. Фикс для Safari - перезапуск каждые 30 секунд
    setInterval(() => {
        if (marquee.style.animationPlayState !== 'paused') {
            console.log('🔄 Restarting marquee animation (Safari fix)');
            
            const currentAnimation = marquee.style.animation;
            marquee.style.animation = 'none';
            marquee.style.webkitAnimation = 'none';
            
            void marquee.offsetWidth;
            
            setTimeout(() => {
                marquee.style.animation = currentAnimation;
                marquee.style.webkitAnimation = currentAnimation;
            }, 50);
        }
    }, 30000);
}

// Функция для счетчиков (оставляем как было)
function setupStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.getAttribute('data-target')) || 0;
                
                if (target > 0) {
                    animateNumber(statNumber, target);
                    observer.unobserve(statNumber);
                }
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        if (stat.getAttribute('data-target')) {
            observer.observe(stat);
        }
    });
}

function animateNumber(element, target) {
    let current = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const startTime = Date.now();
    
    function updateNumber() {
        const elapsed = Date.now() - startTime;
        current = Math.min(target, (elapsed / duration) * target);
        
        element.textContent = Math.floor(current).toLocaleString();
        
        if (current < target) {
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Функция для анимаций при скролле
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.slide-up, .fade-in');
    
    if (animatedElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.getAttribute('data-delay')) || 0;
                
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }, delay);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        if (el.classList.contains('slide-up')) {
            el.style.transform = 'translateY(30px)';
        }
        
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// МНОЖЕСТВЕННЫЕ СПОСОБЫ ИНИЦИАЛИЗАЦИИ - ЧТОБЫ ТОЧНО СРАБОТАЛО

// Способ 1: При полной загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏠 DOM fully loaded');
    setTimeout(initHome, 200);
});

// Способ 2: Если DOM уже загружен
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    console.log('🏠 DOM already ready');
    setTimeout(initHome, 200);
}

// Способ 3: При полной загрузке страницы
window.addEventListener('load', function() {
    console.log('🏠 Window fully loaded');
    setTimeout(initHome, 300);
});

// Способ 4: Резервная инициализация через 2 секунды
setTimeout(() => {
    if (!window.homeInitialized) {
        console.log('🕒 Fallback initialization after 2s');
        initHome();
        window.homeInitialized = true;
    }
}, 2000);

// Делаем функцию глобальной для вызова из других скриптов
window.initHome = initHome;
window.setupSimpleMarquee = setupSimpleMarquee;

// Экспорт для модулей
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initHome, setupSimpleMarquee };
}

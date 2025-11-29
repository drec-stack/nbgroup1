// home.js - ГЛАВНАЯ СТРАНИЦА
console.log('🚀 home.js loaded - Header will hide on scroll');

// Флаг инициализации
window.homeInitialized = false;

function initHome() {
    if (window.homeInitialized) {
        console.log('🚫 Home already initialized, skipping...');
        return;
    }
    
    console.log('🎯 Initializing home page...');
    window.homeInitialized = true;
    
    // Запускаем анимации
    setupHomeAnimations();
    setupMobileMarquee();
    setupStatsCounter();
    setupScrollAnimations();
    
    console.log('✅ Home page initialized - Header will hide on scroll');
}

// АНИМАЦИИ ДЛЯ ГЛАВНОЙ СТРАНИЦЫ
function setupHomeAnimations() {
    console.log('🏠 Setting up home animations');
    
    // Анимация появления hero контента
    const heroContent = document.querySelector('.parallax-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Скрываем индикатор прокрутки после первого скролла
    const scrollIndicator = document.querySelector('.parallax-scroll-indicator');
    if (scrollIndicator) {
        let scrolled = false;
        
        window.addEventListener('scroll', () => {
            if (!scrolled && window.pageYOffset > 50) {
                scrolled = true;
                scrollIndicator.style.opacity = '0';
                setTimeout(() => {
                    if (scrollIndicator && scrollIndicator.parentNode) {
                        scrollIndicator.style.display = 'none';
                    }
                }, 500);
            }
        }, { passive: true });
    }
}

// БЕГУЩАЯ СТРОКА
function setupMobileMarquee() {
    const marqueeTracks = document.querySelectorAll('.marquee-track');
    
    if (marqueeTracks.length === 0) return;
    
    marqueeTracks.forEach((track, index) => {
        const isMobile = window.innerWidth <= 768;
        const animationDuration = isMobile ? '25s' : '40s';
        const animationName = index === 1 ? 'marquee-scroll-reverse' : 'marquee-scroll';
        
        track.style.animation = `${animationName} ${animationDuration} linear infinite`;
    });
}

// СЧЕТЧИКИ СТАТИСТИКИ
function setupStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number-improved');
    
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
    }, { threshold: 0.3 });

    statNumbers.forEach(stat => {
        if (stat.getAttribute('data-target')) {
            observer.observe(stat);
        }
    });
}

function animateNumber(element, target, duration = 2000) {
    let start = null;
    
    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min(progress / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
        const currentValue = Math.floor(easeOutQuart * target);
        
        element.textContent = currentValue.toLocaleString();
        
        if (percentage < 1) {
            requestAnimationFrame(step);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    requestAnimationFrame(step);
}

// АНИМАЦИИ ПРИ СКРОЛЛЕ
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .stat-card');
    
    if (animatedElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ИНИЦИАЛИЗАЦИЯ
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initHome, 100);
});

// РЕЗЕРВНАЯ ИНИЦИАЛИЗАЦИЯ
setTimeout(() => {
    if (!window.homeInitialized) {
        initHome();
    }
}, 2000);

// ГЛОБАЛЬНЫЕ ФУНКЦИИ
window.initHome = initHome;

console.log('✅ Home.js loaded successfully');

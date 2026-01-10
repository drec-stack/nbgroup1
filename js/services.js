// services.js - Services Page Functionality
console.log('✅ Services.js loaded');

// Проверяем, не инициализировался ли уже скрипт
if (window.servicesInitialized) {
    console.log('⚠️ Services.js already initialized, skipping...');
    // Останавливаем выполнение если уже инициализировался
    throw new Error('Services.js already initialized');
}
window.servicesInitialized = true;

// ===== ОСНОВНАЯ ИНИЦИАЛИЗАЦИЯ =====
function initServicesPage() {
    console.log('🚀 Initializing Services page...');
    
    // 1. Настройка контента страницы
    setupServicesContent();
    
    // 2. Настройка навигации по услугам
    setupServicesNavigation();
    
    // 3. Настройка анимаций
    setupServicesAnimations();
    
    console.log('✅ Services page initialized');
}

// ===== НАСТРОЙКА КОНТЕНТА =====
function setupServicesContent() {
    console.log('📊 Setting up services content...');
    
    // Добавляем класс к body для специфичных стилей
    document.body.classList.add('services-page');
    
    // Настраиваем плавное появление элементов
    const animatedElements = document.querySelectorAll('.service-detail, .feature, .process-phase, .stat');
    
    if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}

// ===== НАСТРОЙКА НАВИГАЦИИ ПО УСЛУГАМ =====
function setupServicesNavigation() {
    console.log('📍 Setting up services navigation...');
    
    const navItems = document.querySelectorAll('.services-nav .nav-item');
    const sections = document.querySelectorAll('.service-detail');
    
    if (navItems.length === 0 || sections.length === 0) return;
    
    // Наблюдатель за видимостью секций
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 });
    
    // Наблюдаем за всеми секциями
    sections.forEach(section => observer.observe(section));
    
    // Обработка кликов по навигации
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            
            if (target) {
                // Рассчитываем правильный отступ с учетом хедера
                const header = document.querySelector('.main-header');
                const headerHeight = header ? header.offsetHeight : 100;
                const navHeight = document.querySelector('.services-nav').offsetHeight;
                const offset = headerHeight + navHeight + 20;
                
                // Плавный скролл
                window.scrollTo({
                    top: target.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== НАСТРОЙКА АНИМАЦИЙ =====
function setupServicesAnimations() {
    console.log('🎬 Setting up animations...');
    
    // Анимация для статистики
    const stats = document.querySelectorAll('.stat-value');
    if (stats.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stat = entry.target;
                    const finalValue = stat.textContent;
                    const numericValue = parseFloat(finalValue);
                    
                    if (!isNaN(numericValue)) {
                        let startValue = 0;
                        const duration = 1500;
                        const startTime = Date.now();
                        
                        function animate() {
                            const elapsed = Date.now() - startTime;
                            const progress = Math.min(elapsed / duration, 1);
                            
                            // Easing function
                            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                            const currentValue = Math.floor(startValue + (numericValue - startValue) * easeOutQuart);
                            
                            stat.textContent = currentValue;
                            
                            if (progress < 1) {
                                requestAnimationFrame(animate);
                            } else {
                                stat.textContent = finalValue;
                            }
                        }
                        
                        requestAnimationFrame(animate);
                    }
                    
                    observer.unobserve(stat);
                }
            });
        }, { threshold: 0.5 });
        
        stats.forEach(stat => observer.observe(stat));
    }
    
    // Анимация для фаз процесса
    const processPhases = document.querySelectorAll('.process-phase');
    if (processPhases.length > 0) {
        processPhases.forEach((phase, index) => {
            phase.style.transitionDelay = `${index * 100}ms`;
        });
    }
}

// ===== ОБРАБОТКА ПРОКРУТКИ =====
function handleServicesScroll() {
    // Эта функция оставлена для совместимости, но не вмешивается в работу хедера
    const servicesNav = document.querySelector('.services-nav');
    if (!servicesNav) return;
    
    const scrollY = window.scrollY || window.pageYOffset;
    const servicesHero = document.querySelector('.services-hero');
    
    if (servicesHero) {
        const heroBottom = servicesHero.offsetTop + servicesHero.offsetHeight;
        
        if (scrollY > heroBottom - 100) {
            servicesNav.classList.add('sticky');
        } else {
            servicesNav.classList.remove('sticky');
        }
    }
}

// ===== АВТОМАТИЧЕСКИЙ ЗАПУСК =====
// Запускаем при готовности DOM
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM loaded - initializing Services...');
    
    try {
        initServicesPage();
    } catch (error) {
        console.error('Initialization error:', error);
        // Пробуем еще раз через 500мс
        setTimeout(initServicesPage, 500);
    }
    
    // Добавляем обработчик скролла
    window.addEventListener('scroll', handleServicesScroll, { passive: true });
});

// Экспортируем функции для использования в других местах
window.servicesModule = {
    init: initServicesPage,
    setupNavigation: setupServicesNavigation,
    setupAnimations: setupServicesAnimations
};

console.log('✅ services.js loaded successfully!');

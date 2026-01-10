// services.js - Services Page Functionality
console.log('✅ Services.js loaded');

// Проверяем, не инициализировался ли уже скрипт
if (window.servicesInitialized) {
    console.log('⚠️ Services.js already initialized, skipping...');
    throw new Error('Services.js already initialized');
}
window.servicesInitialized = true;

// ===== ФИКС ДЛЯ ХЕДЕРА =====
function fixHeaderOnServicesPage() {
    console.log('🔧 Fixing header on services page...');
    
    // Находим хедер
    const header = document.getElementById('main-header');
    if (!header) {
        console.warn('⚠️ Header not found');
        return;
    }
    
    // Убираем все классы, которые могут мешать
    const badClasses = ['header-hidden', 'glass-morph', 'header-glass-enter'];
    header.classList.remove(...badClasses);
    
    // Добавляем правильные классы
    header.classList.add('main-header', 'header-visible');
    
    // Если мы вверху страницы, добавляем класс at-top
    if (window.scrollY < 50) {
        header.classList.add('at-top');
    }
    
    // Устанавливаем базовые стили
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Мобильная версия
        header.style.cssText = `
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            transform: none !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            border-radius: 0 !important;
            z-index: 1000 !important;
            opacity: 1 !important;
            visibility: visible !important;
            pointer-events: auto !important;
            padding: 12px 0 !important;
            background: rgba(10, 10, 20, 0.95) !important;
            backdrop-filter: blur(30px) saturate(180%) !important;
            -webkit-backdrop-filter: blur(30px) saturate(180%) !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
            box-shadow: 
                0 8px 32px rgba(0, 0, 0, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;
        `;
    } else {
        // Десктоп версия
        header.style.cssText = `
            position: fixed !important;
            top: 20px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            right: auto !important;
            width: calc(100% - 40px) !important;
            max-width: 1400px !important;
            margin: 0 auto !important;
            border-radius: 20px !important;
            z-index: 1000 !important;
            opacity: 1 !important;
            visibility: visible !important;
            pointer-events: auto !important;
            padding: 15px 0 !important;
            background: rgba(255, 255, 255, 0.05) !important;
            backdrop-filter: blur(25px) saturate(180%) !important;
            -webkit-backdrop-filter: blur(25px) saturate(180%) !important;
            box-shadow: 
                0 8px 32px rgba(0, 0, 0, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.1),
                inset 0 0 20px rgba(255, 255, 255, 0.05) !important;
            border: 1px solid rgba(255, 255, 255, 0.12) !important;
            animation: headerSlideIn 0.6s ease-out 0.3s both !important;
        `;
    }
    
    console.log('✅ Header fixed successfully');
}

// ===== ОСНОВНАЯ ИНИЦИАЛИЗАЦИЯ =====
function initServicesPage() {
    console.log('🚀 Initializing Services page...');
    
    // 1. Исправляем хедер
    fixHeaderOnServicesPage();
    
    // 2. Настройка контента страницы
    setupServicesContent();
    
    // 3. Настройка навигации по услугам
    setupServicesNavigation();
    
    console.log('✅ Services page initialized');
}

// ===== НАСТРОЙКА КОНТЕНТА =====
function setupServicesContent() {
    console.log('📊 Setting up services content...');
    
    // Плавное появление элементов
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

// ===== ОБРАБОТКА ПРОКРУТКИ =====
function handleServicesScroll() {
    const header = document.getElementById('main-header');
    if (!header) return;
    
    const scrollY = window.scrollY || window.pageYOffset;
    const now = Date.now();
    
    // Убираем все классы скролла
    header.classList.remove('scroll-down', 'scroll-up', 'scroll-fast', 'at-top', 'at-middle', 'at-bottom');
    
    // Определяем положение на странице
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPercentage = (scrollY / (documentHeight - windowHeight)) * 100;
    
    if (scrollY < 50) {
        header.classList.add('at-top');
    } else if (scrollPercentage > 45 && scrollPercentage < 55) {
        header.classList.add('at-middle');
    } else if (scrollPercentage > 95) {
        header.classList.add('at-bottom');
    }
    
    // Определяем направление скролла (упрощенная версия)
    if (scrollY > 100) {
        if (window.lastScrollY !== undefined) {
            if (scrollY > window.lastScrollY) {
                header.classList.add('scroll-down');
            } else {
                header.classList.add('scroll-up');
            }
        }
    }
    
    window.lastScrollY = scrollY;
}

// ===== АВТОМАТИЧЕСКИЙ ЗАПУСК =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM loaded - initializing Services...');
    
    try {
        initServicesPage();
    } catch (error) {
        console.error('Initialization error:', error);
        setTimeout(initServicesPage, 500);
    }
    
    // Добавляем обработчик скролла
    window.addEventListener('scroll', handleServicesScroll, { passive: true });
    
    // Добавляем обработчик изменения размера
    window.addEventListener('resize', fixHeaderOnServicesPage, { passive: true });
    
    // Применяем фикс несколько раз на случай, если DOM еще не полностью готов
    setTimeout(fixHeaderOnServicesPage, 100);
    setTimeout(fixHeaderOnServicesPage, 500);
    setTimeout(fixHeaderOnServicesPage, 1000);
});

// Периодическая проверка хедера
setInterval(() => {
    const header = document.getElementById('main-header');
    if (header) {
        const isMobile = window.innerWidth <= 768;
        const currentLeft = header.style.left;
        
        if (isMobile && currentLeft !== '0px' && currentLeft !== '0') {
            header.style.left = '0';
            header.style.transform = 'none';
        } else if (!isMobile && currentLeft !== '50%') {
            header.style.left = '50%';
            header.style.transform = 'translateX(-50%)';
        }
    }
}, 2000);

console.log('✅ services.js loaded successfully!');

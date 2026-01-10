// services.js - Services Page Functionality
console.log('✅ Services.js loaded');

// Проверяем, не инициализировался ли уже скрипт
if (window.servicesInitialized) {
    console.log('⚠️ Services.js already initialized, skipping...');
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

// ===== АВТОМАТИЧЕСКИЙ ЗАПУСК =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM loaded - initializing Services...');
    
    try {
        initServicesPage();
    } catch (error) {
        console.error('Initialization error:', error);
        setTimeout(initServicesPage, 500);
    }
});

console.log('✅ services.js loaded successfully!');

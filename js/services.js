// services.js - COMPLETE header stabilization - NO MOVEMENT AT ALL!
console.log('🛡️ Services.js loaded - ABSOLUTELY NO header movement!');

// ===== ГЛАВНЫЙ ФИКС ХЕДЕРА =====
function lockHeaderPosition() {
    console.log('🔒 Locking header position permanently...');
    
    const header = document.querySelector('.main-header');
    if (!header) {
        console.warn('⚠️ Header not found');
        return;
    }
    
    // 1. УСТАНАВЛИВАЕМ КЛАСС ДЛЯ CSS
    document.body.classList.add('services-page');
    
    // 2. ПОЛНОЕ ОТКЛЮЧЕНИЕ АНИМАЦИЙ
    const disableAllAnimations = () => {
        header.style.animation = 'none';
        header.style.transition = 'none';
        header.style.webkitTransition = 'none';
        header.style.transitionProperty = 'none';
        
        // Отключаем у всех детей тоже
        const children = header.querySelectorAll('*');
        children.forEach(child => {
            child.style.transition = 'none';
            child.style.animation = 'none';
        });
    };
    
    // 3. УСТАНАВЛИВАЕМ ФИКСИРОВАННУЮ ПОЗИЦИЮ
    const setFixedPosition = () => {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // МОБИЛЬНАЯ ВЕРСИЯ - фиксированная сверху
            header.style.position = 'fixed';
            header.style.top = '0';
            header.style.left = '0';
            header.style.right = '0';
            header.style.width = '100%';
            header.style.maxWidth = '100%';
            header.style.margin = '0';
            header.style.transform = 'none';
            header.style.borderRadius = '0';
        } else {
            // ДЕСКТОП ВЕРСИЯ - центрированная
            header.style.position = 'fixed';
            header.style.top = '20px';
            header.style.left = '50%';
            header.style.right = 'auto';
            header.style.width = 'calc(100% - 40px)';
            header.style.maxWidth = '1400px';
            header.style.margin = '0 auto';
            header.style.transform = 'translateX(-50%)';
            header.style.borderRadius = '20px';
        }
        
        // ГАРАНТИИ
        header.style.opacity = '1';
        header.style.visibility = 'visible';
        header.style.zIndex = '1000';
        header.style.pointerEvents = 'auto';
        
        // Убираем все проблемные классы
        header.classList.remove('header-hidden');
        header.classList.add('scrolled');
    };
    
    // 4. ПРИМЕНЯЕМ СРАЗУ
    disableAllAnimations();
    setFixedPosition();
    
    // 5. БЛОКИРОВКА ВСЕХ СОБЫТИЙ
    const blockEvents = ['mouseenter', 'mouseleave', 'mouseover', 'mouseout', 'mousemove'];
    blockEvents.forEach(event => {
        header.addEventListener(event, (e) => {
            e.stopPropagation();
            e.preventDefault();
            setFixedPosition();
        });
    });
    
    // 6. РЕСАЙЗ ОКНА
    window.addEventListener('resize', () => {
        setTimeout(setFixedPosition, 10);
    });
    
    // 7. СКРОЛЛ
    window.addEventListener('scroll', () => {
        header.classList.add('scrolled');
        // НИКАКИХ ИЗМЕНЕНИЙ ПОЗИЦИИ ПРИ СКРОЛЛЕ!
    }, { passive: true });
    
    // 8. ПЕРИОДИЧЕСКАЯ ПРОВЕРКА
    const checkInterval = setInterval(() => {
        setFixedPosition();
    }, 2000);
    
    // 9. ДОПОЛНИТЕЛЬНЫЕ ФИКСЫ
    setTimeout(setFixedPosition, 100);
    setTimeout(setFixedPosition, 500);
    setTimeout(setFixedPosition, 1000);
    
    console.log('✅ Header position LOCKED permanently');
    
    // Функция очистки
    return () => clearInterval(checkInterval);
}

// ===== ОСНОВНАЯ ИНИЦИАЛИЗАЦИЯ =====
function initServicesPage() {
    console.log('🚀 Initializing Services page with FIXED header...');
    
    // 1. ФИКСИРУЕМ ХЕДЕР
    const cleanup = lockHeaderPosition();
    
    // 2. ИНИЦИАЛИЗИРУЕМ ОСТАЛЬНОЙ ФУНКЦИОНАЛ
    setupServicesContent();
    setupNavigation();
    
    // 3. ОЧИСТКА
    window.addEventListener('beforeunload', () => {
        if (cleanup) cleanup();
    });
    
    console.log('✅ Services page initialized');
}

// ===== ДОПОЛНИТЕЛЬНЫЙ ФУНКЦИОНАЛ =====
function setupServicesContent() {
    // Анимации для контента (не для хедера!)
    const animatedElements = document.querySelectorAll('.service-detail, .feature, .process-phase');
    
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

function setupNavigation() {
    const navItems = document.querySelectorAll('.services-nav .nav-item');
    const sections = document.querySelectorAll('.service-detail');
    
    if (navItems.length === 0 || sections.length === 0) return;
    
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
    
    sections.forEach(section => observer.observe(section));
    
    // Smooth scroll
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            
            if (target) {
                const header = document.querySelector('.main-header');
                const headerHeight = header.offsetHeight;
                const navHeight = document.querySelector('.services-nav').offsetHeight;
                const offset = headerHeight + navHeight + 20;
                
                window.scrollTo({
                    top: target.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== АВТОМАТИЧЕСКАЯ ИНИЦИАЛИЗАЦИЯ =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initServicesPage, 100);
    });
} else {
    setTimeout(initServicesPage, 100);
}

// Экспорт
window.lockHeaderPosition = lockHeaderPosition;
window.initServicesPage = initServicesPage;

console.log('✅ services.js ready - header will NOT move!');

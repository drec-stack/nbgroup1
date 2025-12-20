// services.js - Enhanced version with guaranteed header hide functionality

console.log('🎯 services.js loaded - ENHANCED VERSION WITH HEADER FIX');

function initServices() {
    console.log('🎯 Initializing services page functionality...');
    
    // Setup service animations
    setupServiceAnimations();
    
    // Setup process interactions
    setupProcessInteractions();
    
    // Setup guaranteed header scroll functionality
    setupGuaranteedHeaderScroll();
    
    console.log('✅ Services page functionality initialized');
}

// Анимации для секций услуг
function setupServiceAnimations() {
    const serviceFeatures = document.querySelectorAll('.feature');
    const serviceStats = document.querySelectorAll('.stat');
    const isMobile = window.innerWidth <= 768;
    
    if (serviceFeatures.length > 0) {
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
        }, { 
            threshold: isMobile ? 0.1 : 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        serviceFeatures.forEach(feature => {
            feature.style.opacity = '0';
            feature.style.transform = 'translateY(20px)';
            feature.style.transition = 'all 0.6s ease 150ms';
            observer.observe(feature);
        });
    }
    
    // Анимации для статистики
    if (!isMobile) {
        serviceStats.forEach(stat => {
            stat.addEventListener('mouseenter', () => {
                stat.style.transform = 'scale(1.05)';
                stat.style.transition = 'transform 0.3s ease';
            });
            
            stat.addEventListener('mouseleave', () => {
                stat.style.transform = 'scale(1)';
            });
        });
    }
}

// Взаимодействия с процессом
function setupProcessInteractions() {
    const processPhases = document.querySelectorAll('.process-phase');
    const isMobile = window.innerWidth <= 768;
    
    processPhases.forEach(phase => {
        // Упрощенные анимации для мобильных
        if (!isMobile) {
            phase.addEventListener('mouseenter', () => {
                const number = phase.querySelector('.phase-number');
                if (number) {
                    number.style.transform = 'scale(1.1)';
                    number.style.transition = 'transform 0.3s ease';
                }
            });
            
            phase.addEventListener('mouseleave', () => {
                const number = phase.querySelector('.phase-number');
                if (number) {
                    number.style.transform = 'scale(1)';
                }
            });
        }
        
        // Клик для навигации
        phase.addEventListener('click', () => {
            const phaseText = phase.querySelector('h3').textContent.toLowerCase();
            let targetSection = '';
            
            if (phaseText.includes('discover') || phaseText.includes('исследование')) {
                targetSection = 'strategy';
            } else if (phaseText.includes('design') || phaseText.includes('дизайн')) {
                targetSection = 'design';
            } else if (phaseText.includes('develop') || phaseText.includes('разработка')) {
                targetSection = 'engineering';
            } else if (phaseText.includes('deliver') || phaseText.includes('реализация')) {
                targetSection = 'production';
            }
            
            if (targetSection) {
                const targetElement = document.getElementById(targetSection);
                if (targetElement) {
                    const header = document.querySelector('.main-header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    const additionalOffset = isMobile ? 20 : 40;
                    const targetPosition = targetElement.offsetTop - headerHeight - additionalOffset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ГАРАНТИРОВАННАЯ функция скролла хедера (исправленная версия)
function setupGuaranteedHeaderScroll() {
    const header = document.querySelector('.main-header');
    const servicesNav = document.querySelector('.services-nav');
    
    if (!header) {
        console.error('❌ Header not found for scroll functionality');
        return;
    }
    
    console.log('📜 Setting up guaranteed header scroll functionality');
    
    let lastScrollY = window.scrollY;
    const scrollThreshold = 100;
    let isMobile = window.innerWidth <= 768;
    
    // Убедимся, что хедер и навигация имеют правильные классы для анимации
    header.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    if (servicesNav) {
        servicesNav.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    
    const updateHeaderState = () => {
        const currentScrollY = window.scrollY;
        const isDesktop = !isMobile;
        
        // Для мобильных - не скрываем, только меняем фон
        if (isMobile) {
            if (currentScrollY > 50) {
                header.classList.remove('header-hidden');
                header.style.background = 'rgba(0, 102, 255, 0.25)';
            } else {
                header.classList.remove('header-hidden');
                header.style.background = 'rgba(0, 102, 255, 0.22)';
            }
            if (servicesNav) servicesNav.classList.remove('nav-hidden');
            lastScrollY = currentScrollY;
            return;
        }
        
        // Для десктопа: логика скрытия/показа
        if (currentScrollY <= 50) {
            // Вверху страницы - всегда показываем
            header.classList.remove('header-hidden');
            if (servicesNav) servicesNav.classList.remove('nav-hidden');
        } else if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
            // Скроллим вниз - скрываем
            header.classList.add('header-hidden');
            if (servicesNav) servicesNav.classList.add('nav-hidden');
        } else if (currentScrollY < lastScrollY) {
            // Скроллим вверх - показываем
            header.classList.remove('header-hidden');
            if (servicesNav) servicesNav.classList.remove('nav-hidden');
        }
        
        lastScrollY = currentScrollY;
    };
    
    // Используем requestAnimationFrame для оптимизации
    let ticking = false;
    
    const handleScroll = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateHeaderState();
                ticking = false;
            });
            ticking = true;
        }
    };
    
    // Добавляем обработчик скролла
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Добавляем обработчик наведения для десктопа
    if (!isMobile) {
        header.addEventListener('mouseenter', () => {
            header.classList.remove('header-hidden');
            if (servicesNav) servicesNav.classList.remove('nav-hidden');
        });
        
        // Скрываем снова через 2 секунды после ухода мыши
        header.addEventListener('mouseleave', () => {
            if (window.scrollY > scrollThreshold) {
                setTimeout(() => {
                    if (window.scrollY > scrollThreshold) {
                        header.classList.add('header-hidden');
                        if (servicesNav) servicesNav.classList.add('nav-hidden');
                    }
                }, 2000);
            }
        });
    }
    
    // Обновляем isMobile при изменении размера окна
    window.addEventListener('resize', () => {
        isMobile = window.innerWidth <= 768;
        
        // При переходе с мобильного на десктоп сбрасываем состояние
        if (!isMobile && header.classList.contains('header-hidden')) {
            header.classList.remove('header-hidden');
            if (servicesNav) servicesNav.classList.remove('nav-hidden');
        }
    });
    
    // Инициализация состояния
    if (window.scrollY > scrollThreshold && !isMobile) {
        header.classList.add('header-hidden');
        if (servicesNav) servicesNav.classList.add('nav-hidden');
    }
    
    // Также вызываем при загрузке
    updateHeaderState();
    
    console.log('✅ Header scroll functionality setup complete');
}

// Анимация секций услуг с учетом хедера
function animateServiceSections() {
    const serviceSections = document.querySelectorAll('.service-detail');
    const isMobile = window.innerWidth <= 768;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = index * 200;
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
                
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: isMobile ? 0.1 : 0.2,
        rootMargin: isMobile ? '0px 0px -30px 0px' : '0px 0px -50px 0px'
    });

    serviceSections.forEach((section) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(section);
    });
}

// Функция для временного показа хедера
function showHeaderTemporarily(duration = 3000) {
    const header = document.querySelector('.main-header');
    const servicesNav = document.querySelector('.services-nav');
    const isMobile = window.innerWidth <= 768;
    
    if (!header || isMobile) return;
    
    // Показываем хедер
    header.classList.remove('header-hidden');
    if (servicesNav) servicesNav.classList.remove('nav-hidden');
    
    // Скрываем через указанное время
    setTimeout(() => {
        if (window.scrollY > 100) {
            header.classList.add('header-hidden');
            if (servicesNav) servicesNav.classList.add('nav-hidden');
        }
    }, duration);
}

// ФИКС: Проверка и принудительное включение скрытия хедера
function ensureHeaderHidesOnScroll() {
    const header = document.querySelector('.main-header');
    if (!header) return;
    
    console.log('🔧 Running header hide fix...');
    
    // Принудительно удаляем любые inline-стили, которые могут мешать
    header.style.removeProperty('opacity');
    header.style.removeProperty('transform');
    
    // Гарантируем, что классы работают
    if (window.scrollY > 100 && window.innerWidth > 768) {
        if (!header.classList.contains('header-hidden')) {
            header.classList.add('header-hidden');
            console.log('✅ Header now hidden (forced)');
        }
    }
    
    // Добавляем проверку каждые 2 секунды
    setInterval(() => {
        if (window.scrollY > 100 && window.innerWidth > 768) {
            if (!header.classList.contains('header-hidden')) {
                header.classList.add('header-hidden');
            }
        }
    }, 2000);
}

// Auto-initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            initServices();
            animateServiceSections();
            ensureHeaderHidesOnScroll();
        }, 500);
    });
} else {
    setTimeout(() => {
        initServices();
        animateServiceSections();
        ensureHeaderHidesOnScroll();
    }, 500);
}

// Export functions
window.initServices = initServices;
window.animateServiceSections = animateServiceSections;
window.setupGuaranteedHeaderScroll = setupGuaranteedHeaderScroll;
window.setupOptimizedHeaderScroll = setupGuaranteedHeaderScroll; // Алиас для обратной совместимости
window.showHeaderTemporarily = showHeaderTemporarily;
window.ensureHeaderHidesOnScroll = ensureHeaderHidesOnScroll;

console.log('✅ services.js fully loaded and ready');

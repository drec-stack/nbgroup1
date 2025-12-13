// services.js - Optimized for Services Page

console.log('🎯 services.js loaded - OPTIMIZED VERSION');

function initServices() {
    console.log('🎯 Initializing services page...');
    
    // Инициализация с учетом стеклянного хедера
    setupServicesNavigation();
    setupServiceAnimations();
    setupProcessInteractions();
    setupBrandbookLink();
    setupTouchOptimizations();
    
    console.log('✅ Services page initialized');
}

// ОПТИМИЗИРОВАННАЯ НАВИГАЦИЯ ДЛЯ УСЛУГ
function setupServicesNavigation() {
    const servicesNav = document.querySelector('.services-nav');
    const navItems = document.querySelectorAll('.nav-item');
    const serviceSections = document.querySelectorAll('.service-detail');
    
    if (!servicesNav || navItems.length === 0) return;
    
    const isMobile = window.innerWidth <= 768;
    
    // Общая логика для smooth scroll
    setupSmoothScrollNavigation(navItems, serviceSections, isMobile);
    
    // Активное состояние при скролле
    setupScrollActiveState(navItems, serviceSections, isMobile);
}

function setupSmoothScrollNavigation(navItems, serviceSections, isMobile) {
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = item.getAttribute('href');
            
            // Обработка ссылки на brandbook
            if (targetId === '#brandbook') {
                window.location.href = 'brandbook.html';
                return;
            }
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const header = document.querySelector('.main-header');
                const headerHeight = header ? header.offsetHeight : 0;
                const navHeight = isMobile ? 0 : document.querySelector('.services-nav').offsetHeight;
                const additionalOffset = isMobile ? 20 : 40;
                const targetPosition = targetSection.offsetTop - headerHeight - navHeight - additionalOffset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Обновляем активное состояние
                navItems.forEach(navItem => navItem.classList.remove('active'));
                item.classList.add('active');
                
                // На мобильных закрываем клавиатуру если открыта
                if (isMobile) {
                    document.activeElement.blur();
                }
            }
        });
    });
}

function setupScrollActiveState(navItems, serviceSections, isMobile) {
    const updateActiveNav = () => {
        let current = '';
        const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0;
        const scrollPosition = window.pageYOffset + headerHeight + 100;
        
        serviceSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionBottom = sectionTop + sectionHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href').replace('#', '');
            if (href === current) {
                item.classList.add('active');
            }
        });
        
        // Если нет активной секции, делаем первую активной
        if (!current && navItems.length > 0 && window.pageYOffset < 100) {
            navItems[0].classList.add('active');
        }
    };
    
    // Throttled scroll handler
    const throttledScroll = throttle(updateActiveNav, isMobile ? 100 : 50);
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Initial update
    setTimeout(updateActiveNav, 300);
}

// ОПТИМИЗИРОВАННЫЕ АНИМАЦИИ
function setupServiceAnimations() {
    const serviceFeatures = document.querySelectorAll('.feature');
    const serviceStats = document.querySelectorAll('.stat');
    const isMobile = window.innerWidth <= 768;
    
    // Более быстрые анимации на мобильных
    const animationDelay = isMobile ? 80 : 150;
    
    // Анимация features с staggered эффектом
    if (serviceFeatures.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * animationDelay);
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
            feature.style.transition = `all 0.6s ease ${animationDelay}ms`;
            observer.observe(feature);
        });
    }
    
    // Анимации для статистики
    serviceStats.forEach(stat => {
        const eventType = isMobile ? 'touchstart' : 'mouseenter';
        const leaveEvent = isMobile ? 'touchend' : 'mouseleave';
        
        stat.addEventListener(eventType, () => {
            if (!isMobile) {
                stat.style.transform = 'scale(1.05)';
                stat.style.transition = 'transform 0.3s ease';
            }
        });
        
        stat.addEventListener(leaveEvent, () => {
            if (!isMobile) {
                stat.style.transform = 'scale(1)';
            }
        });
    });
}

// ОПТИМИЗИРОВАННЫЕ ВЗАИМОДЕЙСТВИЯ С ПРОЦЕССОМ
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
        
        // Клик для навигации (работает на всех устройствах)
        const handlePhaseClick = () => {
            const phaseText = phase.querySelector('h3').textContent.toLowerCase();
            let targetSection = '';
            
            // Определяем целевую секцию на основе текста фазы
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
                    
                    // Обновляем навигацию
                    const navItems = document.querySelectorAll('.nav-item');
                    navItems.forEach(item => {
                        item.classList.remove('active');
                        if (item.getAttribute('href') === `#${targetSection}`) {
                            item.classList.add('active');
                        }
                    });
                }
            }
        };
        
        // Для мобильных используем touch, для десктопов - click
        if (isMobile) {
            phase.addEventListener('touchend', handlePhaseClick);
        } else {
            phase.addEventListener('click', handlePhaseClick);
        }
    });
}

// ДОПОЛНИТЕЛЬНЫЕ ОПТИМИЗАЦИИ ДЛЯ TOUCH-УСТРОЙСТВ
function setupTouchOptimizations() {
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) return;
    
    // Улучшение feedback для кнопок
    const buttons = document.querySelectorAll('.service-cta .btn, .nav-item');
    
    buttons.forEach(btn => {
        btn.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.1s ease';
        });
        
        btn.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
        
        btn.addEventListener('touchcancel', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

function setupBrandbookLink() {
    const brandbookLink = document.querySelector('a[href="#brandbook"]');
    if (brandbookLink) {
        brandbookLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'brandbook.html';
        });
    }
    
    const brandbookCta = document.querySelector('.service-cta .btn');
    if (brandbookCta && (brandbookCta.textContent.includes('Brandbook') || brandbookCta.textContent.includes('брендбук'))) {
        brandbookCta.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'brandbook.html';
        });
    }
}

// АНИМАЦИИ СЕКЦИЙ С ОПТИМИЗАЦИЕЙ ДЛЯ МОБИЛЬНЫХ
function animateServiceSections() {
    const serviceSections = document.querySelectorAll('.service-detail');
    const isMobile = window.innerWidth <= 768;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = index * (isMobile ? 150 : 200);
                
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

    serviceSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        
        // Разная скорость анимации для мобильных
        const transitionDuration = isMobile ? '0.5s' : '0.8s';
        section.style.transition = `all ${transitionDuration} cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        
        observer.observe(section);
    });
}

// ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ THROTTLE
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ФУНКЦИЯ ДЛЯ КОРРЕКТНОЙ НАСТРОЙКИ ОТСТУПОВ
function setupServicesSpacing() {
    const header = document.querySelector('.main-header');
    const hero = document.querySelector('.services-hero');
    
    if (!header || !hero) return;
    
    function updateSpacing() {
        const headerHeight = header.offsetHeight;
        
        if (window.innerWidth > 768) {
            hero.style.paddingTop = (headerHeight + 80) + 'px';
        } else {
            hero.style.paddingTop = (headerHeight + 40) + 'px';
        }
    }
    
    // Инициализация
    updateSpacing();
    
    // Обновление при ресайзе
    window.addEventListener('resize', updateSpacing);
}

// ИНИЦИАЛИЗАЦИЯ
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 Services page DOM loaded');
    
    // Задержка для стабилизации DOM
    setTimeout(() => {
        // Инициализируем сервисы
        initServices();
        
        // Анимируем секции
        animateServiceSections();
        
        // Настраиваем отступы
        setupServicesSpacing();
        
        console.log('✅ Services page fully initialized');
    }, 300);
});

// ОБРАБОТЧИК ИЗМЕНЕНИЯ РАЗМЕРА ОКНА
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        console.log('🔄 Reinitializing services for new screen size');
        if (typeof initServices === 'function') {
            initServices();
        }
        if (typeof setupServicesSpacing === 'function') {
            setupServicesSpacing();
        }
    }, 250);
});

// Экспорт для глобального доступа
window.initServices = initServices;
window.animateServiceSections = animateServiceSections;
window.setupServicesSpacing = setupServicesSpacing;

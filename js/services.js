// services.js - Enhanced version with header hide functionality

console.log('🎯 services.js loaded - ENHANCED VERSION');

function initServices() {
    console.log('🎯 Initializing services page functionality...');
    
    // Setup service animations
    setupServiceAnimations();
    
    // Setup process interactions
    setupProcessInteractions();
    
    // Setup optimized header scroll
    setupOptimizedHeaderScroll();
    
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

// Оптимизированный скролл хедера
function setupOptimizedHeaderScroll() {
    const header = document.querySelector('.main-header');
    const servicesNav = document.querySelector('.services-nav');
    
    if (!header) return;
    
    let lastScrollY = window.scrollY;
    const scrollThreshold = 100;
    let ticking = false;
    let isMobile = window.innerWidth <= 768;
    
    const updateScroll = () => {
        const currentScrollY = window.scrollY;
        
        // На мобильных - не скрываем полностью
        if (isMobile) {
            ticking = false;
            return;
        }
        
        // На десктопе: логика скрытия/показа
        if (currentScrollY <= 50) {
            // Вверху страницы - показываем
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
        ticking = false;
    };
    
    const handleScroll = () => {
        if (!ticking) {
            requestAnimationFrame(updateScroll);
            ticking = true;
        }
    };
    
    // Удаляем старый обработчик если есть
    if (window._servicesScrollHandler) {
        window.removeEventListener('scroll', window._servicesScrollHandler);
    }
    
    window._servicesScrollHandler = handleScroll;
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Обновляем isMobile при ресайзе
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
}

// Анимация секций услуг с учетом хедера
function animateServiceSections() {
    const serviceSections = document.querySelectorAll('.service-detail');
    const isMobile = window.innerWidth <= 768;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = index * 200;
                
                // Временно показываем хедер при скролле к секции
                if (!isMobile) {
                    const header = document.querySelector('.main-header');
                    const servicesNav = document.querySelector('.services-nav');
                    
                    if (header && header.classList.contains('header-hidden')) {
                        header.classList.remove('header-hidden');
                        if (servicesNav) servicesNav.classList.remove('nav-hidden');
                        
                        // Снова скрываем через 3 секунды
                        setTimeout(() => {
                            if (window.scrollY > 100) {
                                header.classList.add('header-hidden');
                                if (servicesNav) servicesNav.classList.add('nav-hidden');
                            }
                        }, 3000);
                    }
                }
                
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

// Auto-initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            initServices();
            animateServiceSections();
        }, 500);
    });
} else {
    setTimeout(() => {
        initServices();
        animateServiceSections();
    }, 500);
}

// Export functions
window.initServices = initServices;
window.animateServiceSections = animateServiceSections;
window.setupOptimizedHeaderScroll = setupOptimizedHeaderScroll;
window.showHeaderTemporarily = showHeaderTemporarily;

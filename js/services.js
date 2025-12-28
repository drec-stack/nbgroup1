// services.js - Simplified version with HEADER FIX for Services page
console.log('🎯 Services.js loaded - With header fix');

function initServices() {
    console.log('🎯 Initializing services page animations with header fix...');
    
    // ВАЖНО: Применяем фикс для хедера
    fixServicesHeader();
    
    setupServiceAnimations();
    setupProcessInteractions();
    
    console.log('✅ Services animations initialized');
}

// ВАЖНЫЙ ФИКС: Исправление позиции хедера на странице услуг
function fixServicesHeader() {
    console.log('🔧 Applying header fix for Services page...');
    
    const header = document.querySelector('.main-header');
    if (!header) {
        console.warn('⚠️ Header not found on Services page');
        return;
    }
    
    // Гарантируем, что это Services страница
    document.body.classList.add('services-page');
    
    // Функция для фиксации позиции хедера
    const applyHeaderFix = () => {
        const isMobile = window.innerWidth <= 768;
        
        // Отключаем все анимации для хедера на Services странице
        header.style.transition = 'background-color 0.3s ease, box-shadow 0.3s ease';
        
        if (isMobile) {
            // Мобильная версия
            header.style.position = 'fixed';
            header.style.left = '0';
            header.style.transform = 'translateY(0)';
            header.style.right = '0';
            header.style.width = '100%';
            header.style.maxWidth = '100%';
            header.style.margin = '0';
            header.style.borderRadius = '0';
            header.style.top = '0';
        } else {
            // Десктопная версия - ВСЕГДА центрируем
            header.style.position = 'fixed';
            header.style.left = '50%';
            header.style.transform = 'translateX(-50%) translateY(0)';
            header.style.right = 'auto';
            header.style.width = 'calc(100% - 40px)';
            header.style.maxWidth = '1400px';
            header.style.margin = '0 auto';
            header.style.top = '20px';
            header.style.borderRadius = '20px';
        }
        
        // Гарантируем видимость
        header.style.opacity = '1';
        header.style.zIndex = '1000';
        header.style.pointerEvents = 'auto';
        
        // Убираем все классы, которые могут скрывать хедер
        header.classList.remove('header-hidden', 'header-scrolled');
        
        console.log('✅ Services header position fixed');
    };
    
    // Применяем фикс сразу
    applyHeaderFix();
    
    // Применяем фикс при изменении размера окна
    window.addEventListener('resize', applyHeaderFix);
    
    // Применяем фикс при полной загрузке страницы
    window.addEventListener('load', () => {
        setTimeout(applyHeaderFix, 300);
    });
    
    // Дополнительный фикс через 1 секунду
    setTimeout(applyHeaderFix, 1000);
    
    // ФИКС: Предотвращаем сдвиг при наведении
    preventHeaderShiftOnHover();
}

// ФИКС: Предотвращение сдвига хедера при наведении
function preventHeaderShiftOnHover() {
    const header = document.querySelector('.main-header');
    if (!header) return;
    
    console.log('🔧 Preventing header shift on hover...');
    
    // Сохраняем исходную позицию
    const originalTransform = header.style.transform;
    
    // Обработчики для предотвращения сдвига
    header.addEventListener('mouseenter', (e) => {
        e.stopPropagation();
        
        // Восстанавливаем правильную позицию
        const isMobile = window.innerWidth <= 768;
        header.style.transform = isMobile ? 'translateY(0)' : 'translateX(-50%) translateY(0)';
        
        // Отключаем переходы на время наведения
        header.style.transition = 'none';
    });
    
    header.addEventListener('mouseleave', (e) => {
        e.stopPropagation();
        
        // Восстанавливаем правильную позицию
        const isMobile = window.innerWidth <= 768;
        header.style.transform = isMobile ? 'translateY(0)' : 'translateX(-50%) translateY(0)';
        
        // Восстанавливаем переходы
        setTimeout(() => {
            header.style.transition = 'background-color 0.3s ease, box-shadow 0.3s ease';
        }, 50);
    });
    
    // Также предотвращаем сдвиг при наведении на навигацию услуг
    const servicesNav = document.querySelector('.services-nav');
    if (servicesNav) {
        servicesNav.addEventListener('mouseenter', () => {
            const isMobile = window.innerWidth <= 768;
            header.style.transform = isMobile ? 'translateY(0)' : 'translateX(-50%) translateY(0)';
            header.style.transition = 'none';
        });
        
        servicesNav.addEventListener('mouseleave', () => {
            const isMobile = window.innerWidth <= 768;
            header.style.transform = isMobile ? 'translateY(0)' : 'translateX(-50%) translateY(0)';
            setTimeout(() => {
                header.style.transition = 'background-color 0.3s ease, box-shadow 0.3s ease';
            }, 50);
        });
    }
    
    console.log('✅ Header shift prevention enabled');
}

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

function setupProcessInteractions() {
    const processPhases = document.querySelectorAll('.process-phase');
    const isMobile = window.innerWidth <= 768;
    
    processPhases.forEach(phase => {
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
window.fixServicesHeader = fixServicesHeader;

console.log('✅ services.js loaded with header fix');

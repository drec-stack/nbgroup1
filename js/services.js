// services.js - МОБИЛЬНАЯ ОПТИМИЗАЦИЯ С ОБНОВЛЕННЫМ ХЕДЕРОМ
console.log('🎯 services.js loaded - UPDATED HEADER SUPPORT');

function initServices() {
    console.log('🎯 Initializing services page with updated header support...');
    
    // Инициализация с учетом обновленного стеклянного хедера
    setupUpdatedHeaderSupport();
    setupMobileServiceNavigation();
    setupServiceAnimations();
    setupProcessInteractions();
    setupBrandbookLink();
    setupTouchOptimizations();
    setupPerformanceMonitoring();
    
    console.log('✅ Services page initialized with glass header support');
}

// ОБНОВЛЕННАЯ ПОДДЕРЖКА СТЕКЛЯННОГО ХЕДЕРА
function setupUpdatedHeaderSupport() {
    const header = document.querySelector('.main-header');
    if (!header) {
        console.warn('⚠️ No header found for setup');
        return;
    }
    
    console.log('🔵 Setting up glass header behavior for services page...');
    
    // Убедимся, что хедер имеет правильные стили
    ensureHeaderStyles(header);
    
    // Настройка поведения при скролле
    setupServicesHeaderScroll(header);
    
    // Обновление отступов для контента
    updateContentPadding();
    
    // Слушатель изменения размера окна
    window.addEventListener('resize', updateContentPadding);
    
    // Принудительное обновление при загрузке
    setTimeout(updateContentPadding, 500);
}

function ensureHeaderStyles(header) {
    // Применяем стили если они не были применены
    if (!header.style.backdropFilter || header.style.backdropFilter === '') {
        header.style.position = 'fixed';
        header.style.top = '20px';
        header.style.left = '0';
        header.style.right = '0';
        header.style.width = 'calc(100% - 40px)';
        header.style.maxWidth = '1400px';
        header.style.margin = '0 auto';
        header.style.borderRadius = '20px';
        header.style.background = 'rgba(0, 102, 255, 0.12)';
        header.style.backdropFilter = 'blur(16px) saturate(180%)';
        header.style.webkitBackdropFilter = 'blur(16px) saturate(180%)';
        header.style.border = '1px solid rgba(255, 255, 255, 0.22)';
        header.style.boxShadow = '0 8px 32px rgba(0, 102, 255, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.12), inset 0 0 20px rgba(255, 255, 255, 0.05)';
        header.style.zIndex = '1000';
        header.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
    
    // Для мобильных
    if (window.innerWidth <= 768) {
        header.style.top = '0';
        header.style.width = '100%';
        header.style.maxWidth = '100%';
        header.style.borderRadius = '0';
        header.style.background = 'rgba(0, 102, 255, 0.25)';
        header.style.border = 'none';
        header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.15)';
    }
}

function setupServicesHeaderScroll(header) {
    let lastScrollY = window.scrollY;
    const scrollThreshold = 100;
    
    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY <= 0) {
            header.style.transform = 'translateY(0px)';
            header.classList.remove('header-hidden', 'header-scrolled');
            return;
        }
        
        if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
            // Scrolling down
            header.classList.remove('header-hidden');
            header.classList.add('header-scrolled');
            header.style.opacity = '1';
        } else if (currentScrollY < lastScrollY) {
            // Scrolling up
            header.classList.remove('header-hidden');
            header.classList.remove('header-scrolled');
            header.style.opacity = '1';
        }
        
        lastScrollY = currentScrollY;
    }
    
    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Show header on hover
    header.addEventListener('mouseenter', () => {
        if (header.classList.contains('header-hidden')) {
            header.classList.remove('header-hidden', 'header-scrolled');
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }
    });
}

function updateContentPadding() {
    const header = document.querySelector('.main-header');
    const servicesHero = document.querySelector('.services-hero');
    
    if (header && servicesHero) {
        if (window.innerWidth <= 768) {
            servicesHero.style.paddingTop = '120px';
        } else {
            const headerHeight = header.offsetHeight;
            servicesHero.style.paddingTop = (headerHeight + 60) + 'px';
        }
    }
}

// ОПТИМИЗИРОВАННАЯ НАВИГАЦИЯ ДЛЯ МОБИЛЬНЫХ
function setupMobileServiceNavigation() {
    const servicesNav = document.querySelector('.services-nav');
    const navItems = document.querySelectorAll('.nav-item');
    const serviceSections = document.querySelectorAll('.service-detail');
    
    if (!servicesNav) return;
    
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        servicesNav.classList.add('mobile-optimized');
        setupMobileNavBehavior();
    } else {
        setupScrollHideNavigation();
    }
    
    setupSmoothScrollNavigation(navItems, serviceSections, isMobile);
    setupScrollActiveState(navItems, serviceSections, isMobile);
}

function setupMobileNavBehavior() {
    const navItems = document.querySelectorAll('.nav-item');
    const servicesNav = document.querySelector('.services-nav');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#brandbook') return;
            
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 300);
        });
    });
    
    servicesNav.style.willChange = 'transform';
}

function setupSmoothScrollNavigation(navItems, serviceSections, isMobile) {
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = item.getAttribute('href');
            
            if (targetId === '#brandbook') {
                window.location.href = 'brandbook.html';
                return;
            }
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const navHeight = isMobile ? 0 : document.querySelector('.services-nav').offsetHeight;
                const additionalOffset = isMobile ? 20 : 40;
                const targetPosition = targetSection.offsetTop - headerHeight - navHeight - additionalOffset;
                
                const scrollBehavior = isMobile ? 'smooth' : 'smooth';
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: scrollBehavior
                });
                
                navItems.forEach(navItem => navItem.classList.remove('active'));
                item.classList.add('active');
                
                if (isMobile) {
                    document.activeElement.blur();
                }
            }
        });
    });
}

function setupScrollActiveState(navItems, serviceSections, isMobile) {
    let scrollTimeout;
    
    const updateActiveNav = () => {
        let current = '';
        const scrollPosition = window.pageYOffset + (isMobile ? 100 : 200);
        
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
        
        if (!current && navItems.length > 0 && window.pageYOffset < 100) {
            navItems[0].classList.add('active');
        }
    };
    
    const throttledScroll = throttle(updateActiveNav, isMobile ? 100 : 50);
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    updateActiveNav();
}

function setupScrollHideNavigation() {
    const servicesNav = document.querySelector('.services-nav');
    if (!servicesNav) return;

    let lastScrollTop = 0;
    const scrollThreshold = 100;
    let isHidden = false;

    const handleScroll = () => {
        if (window.innerWidth <= 768) return;

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollDelta = scrollTop - lastScrollTop;
        
        if (scrollDelta > 5 && scrollTop > scrollThreshold && !isHidden) {
            servicesNav.classList.add('hidden');
            servicesNav.classList.remove('visible');
            isHidden = true;
        } else if (scrollDelta < -5 && isHidden) {
            servicesNav.classList.remove('hidden');
            servicesNav.classList.add('visible');
            isHidden = false;
        }
        
        lastScrollTop = scrollTop;
    };

    window.addEventListener('scroll', throttle(handleScroll, 50), { passive: true });
    servicesNav.classList.add('visible');
}

// ОПТИМИЗИРОВАННЫЕ АНИМАЦИИ ДЛЯ МОБИЛЬНЫХ
function setupServiceAnimations() {
    const serviceFeatures = document.querySelectorAll('.feature');
    const serviceStats = document.querySelectorAll('.stat');
    const isMobile = window.innerWidth <= 768;
    
    const animationDelay = isMobile ? 80 : 150;
    
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
        
        const handlePhaseClick = () => {
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
                    const headerHeight = document.querySelector('.main-header').offsetHeight;
                    const additionalOffset = isMobile ? 20 : 40;
                    const targetPosition = targetElement.offsetTop - headerHeight - additionalOffset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
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
    
    document.documentElement.style.scrollBehavior = 'smooth';
}

// МОНИТОРИНГ ПРОИЗВОДИТЕЛЬНОСТИ
function setupPerformanceMonitoring() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile && 'performance' in window) {
        const loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
        console.log(`📱 Mobile page load time: ${loadTime}ms`);
        
        if (loadTime > 3000) {
            console.warn('⚠️ Slow mobile load time detected, applying optimizations');
            applyAggressiveOptimizations();
        }
    }
}

function applyAggressiveOptimizations() {
    const heavyElements = document.querySelectorAll('.process-phase, .stat, .feature');
    heavyElements.forEach(el => {
        el.style.willChange = 'auto';
    });
    
    document.documentElement.style.scrollBehavior = 'auto';
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
        
        const transitionDuration = isMobile ? '0.5s' : '0.8s';
        section.style.transition = `all ${transitionDuration} cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        
        observer.observe(section);
    });
}

// ИНИЦИАЛИЗАЦИЯ И ОБРАБОТЧИКИ
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initServices();
        animateServiceSections();
    }, 100);
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
    }, 250);
});

// ОБРАБОТКА ВИДИМОСТИ СТРАНИЦЫ
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        setTimeout(() => {
            if (typeof initServices === 'function') {
                initServices();
            }
        }, 100);
    }
});

// Экспорт для глобального доступа
window.initServices = initServices;
window.animateServiceSections = animateServiceSections;
window.updateContentPadding = updateContentPadding;

// Авто-инициализация если DOM уже готов
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    setTimeout(() => {
        if (typeof initServices === 'function') {
            initServices();
            animateServiceSections();
        }
    }, 200);
}

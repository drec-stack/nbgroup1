// Services page specific JavaScript
function initServices() {
    setupScrollHideNavigation(); // Добавляем скрытие навигации при скролле
    setupServiceNavigation();
    setupServiceAnimations();
    setupProcessInteractions(); // Эта функция теперь исправлена
    setupBrandbookLink();
}

// Hide/Show services navigation on scroll
function setupScrollHideNavigation() {
    const servicesNav = document.querySelector('.services-nav');
    if (!servicesNav) return;

    let lastScrollTop = 0;
    const scrollThreshold = 100; // Минимальная дистанция скролла перед скрытием
    const navHeight = servicesNav.offsetHeight;

    window.addEventListener('scroll', () => {
        if (window.innerWidth <= 768) return; // Не скрываем на мобильных

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Определяем направление скролла
        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
            // Скролл вниз - скрываем
            servicesNav.classList.add('hidden');
            servicesNav.classList.remove('visible');
        } else {
            // Скролл вверх - показываем
            servicesNav.classList.remove('hidden');
            servicesNav.classList.add('visible');
        }
        
        lastScrollTop = scrollTop;
    });

    // Показываем навигацию при загрузке
    servicesNav.classList.add('visible');
}

function setupServiceNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const serviceSections = document.querySelectorAll('.service-detail');
    
    // Update active nav item on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + 200;
        
        serviceSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
        
        // If no section is active, make first one active
        if (!current && navItems.length > 0) {
            navItems[0].classList.add('active');
        }
    });
    
    // Smooth scroll for nav items
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = item.getAttribute('href');
            
            // Handle brandbook page link
            if (targetId === '#brandbook') {
                window.location.href = 'brandbook.html';
                return;
            }
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active state
                navItems.forEach(navItem => navItem.classList.remove('active'));
                item.classList.add('active');
            }
        });
    });
}

function setupServiceAnimations() {
    // Stagger animation for service features
    const serviceFeatures = document.querySelectorAll('.feature');
    if (serviceFeatures.length > 0 && window.NBAnimations) {
        window.NBAnimations.staggerAnimation(serviceFeatures, 150);
    }
    
    // Animate stats when they come into view
    const serviceStats = document.querySelectorAll('.stat');
    serviceStats.forEach(stat => {
        stat.addEventListener('mouseenter', () => {
            stat.style.transform = 'scale(1.05)';
        });
        
        stat.addEventListener('mouseleave', () => {
            stat.style.transform = 'scale(1)';
        });
    });
    
    // Animate new service sections
    const newServices = document.querySelectorAll('#brand, #brandbook');
    if (newServices.length > 0 && window.NBAnimations) {
        window.NBAnimations.staggerAnimation(newServices, 200);
    }
}

// ИСПРАВЛЕННАЯ ФУНКЦИЯ - убраны проблемные стили
function setupProcessInteractions() {
    const processPhases = document.querySelectorAll('.process-phase');
    
    processPhases.forEach(phase => {
        // Убраны проблемные обработчики, которые меняли стили цифр
        phase.addEventListener('mouseenter', () => {
            // Только легкая анимация, без изменения цвета цифр
            const number = phase.querySelector('.phase-number');
            if (number) {
                number.style.transform = 'scale(1.1)';
            }
        });
        
        phase.addEventListener('mouseleave', () => {
            // Возвращаем исходное состояние
            const number = phase.querySelector('.phase-number');
            if (number) {
                number.style.transform = 'scale(1)';
            }
        });
        
        // Click to navigate to corresponding service
        phase.addEventListener('click', () => {
            const phaseText = phase.querySelector('h3').textContent.toLowerCase();
            let targetSection = '';
            
            switch(phaseText) {
                case 'discover':
                case 'исследование':
                    targetSection = 'strategy';
                    break;
                case 'design':
                case 'дизайн':
                    targetSection = 'design';
                    break;
                case 'develop':
                case 'разработка':
                    targetSection = 'engineering';
                    break;
                case 'deliver':
                case 'реализация':
                    targetSection = 'production';
                    break;
            }
            
            if (targetSection) {
                const targetElement = document.getElementById(targetSection);
                if (targetElement) {
                    const headerHeight = document.querySelector('.main-header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update navigation
                    const navItems = document.querySelectorAll('.nav-item');
                    navItems.forEach(item => {
                        item.classList.remove('active');
                        if (item.getAttribute('href') === `#${targetSection}`) {
                            item.classList.add('active');
                        }
                    });
                }
            }
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
    
    // Add click handler for brandbook CTA button
    const brandbookCta = document.querySelector('.service-cta .btn');
    if (brandbookCta) {
        brandbookCta.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'brandbook.html';
        });
    }
}

// Enhanced service section animations
function animateServiceSections() {
    const serviceSections = document.querySelectorAll('.service-detail');
    
    serviceSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.2}s`;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(section);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initServices();
    animateServiceSections();
});

// Export for global access
window.initServices = initServices;

// about.js - МОБИЛЬНАЯ ОПТИМИЗАЦИЯ (ПОЛНАЯ ВЕРСИЯ)
console.log('🎯 about.js loaded - MOBILE OPTIMIZED');

function initAbout() {
    console.log('🎯 Initializing about page with mobile optimizations...');
    
    // Основные функции с мобильной оптимизацией
    setupTeamInteractions();
    setupValueAnimations();
    setupStoryScroll();
    setupServicesAnimations();
    removeAvatarLetters();
    setupMobileOptimizations();
    setupImageLoading();
    setupPerformanceMonitoring();
    
    console.log('✅ About page optimized for mobile');
}

// ОПТИМИЗИРОВАННЫЕ ВЗАИМОДЕЙСТВИЯ С КОМАНДОЙ
function setupTeamInteractions() {
    const teamMembers = document.querySelectorAll('.team-member');
    const isMobile = window.innerWidth <= 768;
    
    teamMembers.forEach(member => {
        // Убираем сложные hover-эффекты на мобильных
        if (!isMobile) {
            member.addEventListener('mouseenter', () => {
                const photo = member.querySelector('.member-photo');
                if (photo) {
                    photo.style.transform = 'scale(1.05)';
                    photo.style.transition = 'transform 0.3s ease';
                }
            });
            
            member.addEventListener('mouseleave', () => {
                const photo = member.querySelector('.member-photo');
                if (photo) {
                    photo.style.transform = 'scale(1)';
                }
            });
        }
        
        // Тап на мобильных для показа био
        if (isMobile) {
            let tapTimer;
            
            member.addEventListener('touchstart', function() {
                tapTimer = setTimeout(() => {
                    const bio = this.querySelector('.member-bio');
                    if (bio) {
                        bio.style.display = bio.style.display === 'none' ? 'block' : 'none';
                    }
                }, 300);
            });
            
            member.addEventListener('touchend', function() {
                clearTimeout(tapTimer);
            });
        }
    });
}

// ОПТИМИЗИРОВАННЫЕ АНИМАЦИИ ЦЕННОСТЕЙ
function setupValueAnimations() {
    const valueCards = document.querySelectorAll('.value-card');
    const isMobile = window.innerWidth <= 768;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = index * (isMobile ? 80 : 150);
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
                
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: isMobile ? 0.1 : 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    valueCards.forEach((card) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// АНИМАЦИИ ДЛЯ СЕКЦИИ УСЛУГ
function setupServicesAnimations() {
    const serviceCategories = document.querySelectorAll('.service-category');
    const isMobile = window.innerWidth <= 768;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = index * (isMobile ? 100 : 200);
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
                
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: isMobile ? 0.1 : 0.15,
        rootMargin: '0px 0px -30px 0px'
    });

    serviceCategories.forEach((category) => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
        category.style.transition = 'all 0.7s ease';
        observer.observe(category);
    });
}

// ОПТИМИЗИРОВАННЫЙ СКРОЛЛ ДЛЯ ИСТОРИИ
function setupStoryScroll() {
    const storySection = document.querySelector('.our-story');
    const storyStats = document.querySelectorAll('.story-stat');
    
    if (storySection && 'IntersectionObserver' in window) {
        const isMobile = window.innerWidth <= 768;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    storyStats.forEach((stat, index) => {
                        setTimeout(() => {
                            stat.style.opacity = '1';
                            stat.style.transform = 'translateY(0)';
                        }, index * (isMobile ? 100 : 200));
                    });
                }
            });
        }, { threshold: isMobile ? 0.3 : 0.5 });
        
        storyStats.forEach(stat => {
            stat.style.opacity = '0';
            stat.style.transform = 'translateY(20px)';
            stat.style.transition = 'all 0.6s ease';
        });
        
        observer.observe(storySection);
    }
}

// УДАЛЕНИЕ БУКВ ИЗ АВАТАРОК
function removeAvatarLetters() {
    const memberPhotos = document.querySelectorAll('.member-photo');
    
    memberPhotos.forEach((photo) => {
        const elementsToRemove = photo.querySelectorAll('*:not(.member-avatar)');
        elementsToRemove.forEach(el => el.remove());
        
        const avatar = photo.querySelector('.member-avatar');
        if (avatar) {
            avatar.style.width = '100%';
            avatar.style.height = '100%';
            avatar.style.objectFit = 'cover';
        }
    });
}

// ДОПОЛНИТЕЛЬНЫЕ МОБИЛЬНЫЕ ОПТИМИЗАЦИИ
function setupMobileOptimizations() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Touch optimization
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.97)';
            });
            
            btn.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
        
        // Оптимизация прокрутки
        document.documentElement.style.scrollBehavior = 'smooth';
        
        // Предотвращение двойного тапа для зумирования
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(event) {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }
}

// ОПТИМИЗАЦИЯ ЗАГРУЗКИ ИЗОБРАЖЕНИЙ
function setupImageLoading() {
    const images = document.querySelectorAll('.member-avatar');
    const isMobile = window.innerWidth <= 768;
    
    images.forEach(img => {
        img.loading = 'lazy';
        if (isMobile) {
            img.fetchPriority = 'low';
        }
    });
}

// МОНИТОРИНГ ПРОИЗВОДИТЕЛЬНОСТИ
function setupPerformanceMonitoring() {
    if ('performance' in window) {
        const loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
        if (loadTime > 2000) {
            applyPerformanceOptimizations();
        }
    }
}

function applyPerformanceOptimizations() {
    const heavyElements = document.querySelectorAll('.value-card, .team-member, .service-category');
    heavyElements.forEach(el => {
        el.style.willChange = 'auto';
    });
}

// ИНИЦИАЛИЗАЦИЯ
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initAbout();
    }, 100);
});

window.addEventListener('resize', () => {
    setTimeout(() => {
        if (typeof initAbout === 'function') initAbout();
    }, 250);
});

if (document.readyState === 'interactive' || document.readyState === 'complete') {
    setTimeout(() => {
        if (typeof initAbout === 'function') initAbout();
    }, 200);
}

window.initAbout = initAbout;

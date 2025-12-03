// about.js - МОБИЛЬНАЯ ОПТИМИЗАЦИЯ ДЛЯ SPECK DESIGN СТИЛЯ
console.log('🎯 about.js loaded - SPECK DESIGN OPTIMIZED');

function initAbout() {
    console.log('🎯 Initializing about page with Speck Design optimizations...');
    
    // Основные функции с мобильной оптимизацией
    setupTeamInteractions();
    setupStoryStats();
    setupSpeckAnimations();
    setupMobileOptimizations();
    setupImageLoading();
    setupCTAAnimations();
    
    console.log('✅ About page with Speck Design fully optimized');
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
                const avatar = member.querySelector('.member-avatar');
                if (photo) {
                    photo.style.transform = 'translateY(-5px)';
                    photo.style.boxShadow = '0 20px 40px rgba(0, 102, 255, 0.3)';
                    photo.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
                }
                if (avatar) {
                    avatar.style.transform = 'scale(1.1)';
                }
            });
            
            member.addEventListener('mouseleave', () => {
                const photo = member.querySelector('.member-photo');
                const avatar = member.querySelector('.member-avatar');
                if (photo) {
                    photo.style.transform = 'translateY(0)';
                    photo.style.boxShadow = '0 10px 30px rgba(0, 102, 255, 0.3)';
                }
                if (avatar) {
                    avatar.style.transform = 'scale(1)';
                }
            });
        }
        
        // Тап на мобильных для показа дополнительной информации
        if (isMobile) {
            member.addEventListener('touchstart', function(e) {
                e.preventDefault();
                this.classList.add('active');
            });
            
            member.addEventListener('touchend', function() {
                this.classList.remove('active');
            });
        }
    });
}

// АНИМАЦИИ ДЛЯ SPECK DESIGN КАРТОЧЕК
function setupSpeckAnimations() {
    const speckCards = document.querySelectorAll('.speck-service-card');
    const isMobile = window.innerWidth <= 768;
    
    if (speckCards.length === 0) {
        console.log('⚠️ No Speck Design cards found');
        return;
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = isMobile ? index * 100 : index * 150;
                
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                    
                    // Анимация иконок с задержкой
                    const icon = entry.target.querySelector('.speck-card-icon');
                    if (icon) {
                        setTimeout(() => {
                            icon.style.transform = 'scale(1) rotate(0deg)';
                        }, 300);
                    }
                    
                }, delay);
                
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: isMobile ? 0.1 : 0.2,
        rootMargin: '0px 0px -30px 0px'
    });

    // Инициализируем начальное состояние
    speckCards.forEach((card) => {
        // Убираем inline стили, если они есть
        card.style.opacity = '1';
        card.style.transform = 'none';
        
        // Наблюдаем за карточками
        observer.observe(card);
    });
    
    // Добавляем hover эффекты для десктопа
    if (!isMobile) {
        speckCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.speck-card-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.15) rotate(5deg)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.speck-card-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
    }
}

// АНИМАЦИЯ СТАТИСТИКИ В ИСТОРИИ
function setupStoryStats() {
    const storyStats = document.querySelectorAll('.story-stat');
    const isMobile = window.innerWidth <= 768;
    
    if (storyStats.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                storyStats.forEach((stat, index) => {
                    setTimeout(() => {
                        stat.style.opacity = '1';
                        stat.style.transform = 'translateY(0)';
                        
                        // Анимация чисел
                        const numberElement = stat.querySelector('.stat-number');
                        if (numberElement) {
                            animateCounter(numberElement);
                        }
                    }, index * (isMobile ? 100 : 200));
                });
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: isMobile ? 0.3 : 0.5 
    });

    const storySection = document.querySelector('.our-story');
    if (storySection) {
        storyStats.forEach(stat => {
            stat.style.opacity = '0';
            stat.style.transform = 'translateY(20px)';
            stat.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
        observer.observe(storySection);
    }
}

// ФУНКЦИЯ АНИМАЦИИ СЧЕТЧИКОВ
function animateCounter(element) {
    const finalValue = parseInt(element.textContent);
    const duration = 2000;
    const increment = finalValue / (duration / 16);
    let currentValue = 0;
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
            element.textContent = finalValue;
            clearInterval(timer);
            
            // Добавляем небольшой bounce эффект
            element.style.transform = 'scale(1.1)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200);
        } else {
            element.textContent = Math.floor(currentValue);
        }
    }, 16);
}

// ДОПОЛНИТЕЛЬНЫЕ МОБИЛЬНЫЕ ОПТИМИЗАЦИИ
function setupMobileOptimizations() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Оптимизация для touch устройств
        const interactiveElements = document.querySelectorAll('.btn, .speck-service-card, .team-member');
        
        interactiveElements.forEach(el => {
            // Увеличиваем область касания для кнопок
            if (el.classList.contains('btn')) {
                el.style.minHeight = '44px';
                el.style.minWidth = '44px';
                el.style.padding = '12px 24px';
            }
            
            // Добавляем active states
            el.addEventListener('touchstart', function() {
                this.style.opacity = '0.8';
                this.style.transform = 'scale(0.98)';
            });
            
            el.addEventListener('touchend', function() {
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
            });
            
            el.addEventListener('touchcancel', function() {
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
            });
        });
        
        // Предотвращаем двойной тап для зумирования
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(event) {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, { passive: false });
        
        // Оптимизация производительности
        document.body.style.webkitOverflowScrolling = 'touch';
        document.documentElement.style.scrollBehavior = 'auto'; // Отключаем smooth scroll для мобильных
    }
}

// ОПТИМИЗАЦИЯ ЗАГРУЗКИ ИЗОБРАЖЕНИЙ
function setupImageLoading() {
    const images = document.querySelectorAll('img[class*="avatar"], img[class*="member"]');
    const isMobile = window.innerWidth <= 768;
    
    images.forEach(img => {
        img.loading = 'lazy';
        img.decoding = 'async';
        
        if (isMobile) {
            img.fetchPriority = 'low';
        }
        
        // Добавляем fallback для битых изображений
        img.onerror = function() {
            this.style.display = 'none';
            const parent = this.parentElement;
            if (parent) {
                const fallback = document.createElement('div');
                fallback.className = 'image-fallback';
                fallback.style.width = '100%';
                fallback.style.height = '100%';
                fallback.style.background = 'var(--accent-gradient)';
                fallback.style.borderRadius = 'inherit';
                fallback.style.display = 'flex';
                fallback.style.alignItems = 'center';
                fallback.style.justifyContent = 'center';
                fallback.style.color = 'white';
                fallback.style.fontWeight = 'bold';
                fallback.innerHTML = this.alt || 'NB';
                parent.appendChild(fallback);
            }
        };
    });
}

// АНИМАЦИИ ДЛЯ CTA КНОПКИ
function setupCTAAnimations() {
    const ctaButton = document.querySelector('.about-cta .btn');
    if (!ctaButton) return;
    
    const arrowIcon = ctaButton.querySelector('.fa-arrow-right');
    
    // Анимация стрелки на hover
    ctaButton.addEventListener('mouseenter', function() {
        if (arrowIcon) {
            arrowIcon.style.transform = 'translateX(8px)';
            arrowIcon.style.transition = 'transform 0.3s ease';
        }
    });
    
    ctaButton.addEventListener('mouseleave', function() {
        if (arrowIcon) {
            arrowIcon.style.transform = 'translateX(0)';
        }
    });
    
    // Pulse animation каждые 10 секунд
    setInterval(() => {
        if (document.visibilityState === 'visible') {
            ctaButton.classList.add('pulse-animation');
            setTimeout(() => {
                ctaButton.classList.remove('pulse-animation');
            }, 1000);
        }
    }, 10000);
}

// ОПТИМИЗАЦИЯ ПРОИЗВОДИТЕЛЬНОСТИ ПРИ СКРОЛЛЕ
function setupScrollPerformance() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Используем пассивные слушатели для лучшей производительности
        let ticking = false;
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    // Оптимизации во время скролла
                    document.body.classList.add('scrolling');
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
        
        window.addEventListener('scrollend', function() {
            document.body.classList.remove('scrolling');
        }, { passive: true });
    }
}

// ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ
document.addEventListener('DOMContentLoaded', () => {
    // Небольшая задержка для полной загрузки компонентов
    setTimeout(() => {
        if (typeof initAbout === 'function') {
            initAbout();
            setupScrollPerformance();
        }
    }, 150);
});

// ОБРАБОТКА ИЗМЕНЕНИЯ РАЗМЕРА ОКНА
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (typeof initAbout === 'function') {
            initAbout();
        }
    }, 250);
});

// ФОЛБЭК ДЛЯ РАННЕЙ ЗАГРУЗКИ
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    setTimeout(() => {
        if (typeof initAbout === 'function') initAbout();
    }, 200);
}

// ДОБАВЛЯЕМ CSS ДЛЯ АНИМАЦИЙ
(function addAnimationStyles() {
    if (!document.getElementById('about-animation-styles')) {
        const style = document.createElement('style');
        style.id = 'about-animation-styles';
        style.textContent = `
            .pulse-animation {
                animation: pulse 1s ease;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            
            .scrolling .speck-service-card,
            .scrolling .team-member,
            .scrolling .story-stat {
                transition: none !important;
                animation: none !important;
            }
            
            @media (max-width: 768px) {
                .team-member.active {
                    transform: scale(0.98);
                    opacity: 0.9;
                }
                
                .btn:active {
                    transform: scale(0.95) !important;
                    transition: transform 0.1s ease !important;
                }
            }
            
            .image-fallback {
                background: linear-gradient(135deg, var(--accent), var(--accent-light)) !important;
                color: white !important;
                font-weight: 700 !important;
                font-size: 1.5rem !important;
            }
        `;
        document.head.appendChild(style);
    }
})();

// ДОБАВЛЯЕМ ОБРАБОТЧИК ДЛЯ СМЕНЫ ЯЗЫКА
document.addEventListener('languageChanged', function() {
    // Переинициализируем после смены языка
    setTimeout(() => {
        if (typeof initAbout === 'function') {
            initAbout();
        }
    }, 500);
});

// ЭКСПОРТ ФУНКЦИЙ ДЛЯ ГЛОБАЛЬНОГО ДОСТУПА
window.initAbout = initAbout;
window.setupSpeckAnimations = setupSpeckAnimations;
window.setupStoryStats = setupStoryStats;

console.log('✅ about.js initialization functions ready');

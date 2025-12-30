// about.js - МОБИЛЬНАЯ ОПТИМИЗАЦИЯ ДЛЯ SPECK DESIGN СТИЛЯ С ИСПРАВЛЕННЫМ ЯЗЫКОМ
console.log('🎯 about.js loaded - SPECK DESIGN OPTIMIZED WITH LANGUAGE FIX');

function initAbout() {
    console.log('🎯 Initializing about page with Speck Design optimizations...');
    
    // ФИКС ДЛЯ ХЕДЕРА НА СТРАНИЦЕ ABOUT
    fixHeaderForAboutPage();
    
    // Основные функции с мобильной оптимизацией
    setupTeamInteractions();
    setupStoryStats();
    setupSpeckAnimations();
    setupMobileOptimizations();
    setupImageLoading();
    setupCTAAnimations();
    setupScrollAnimations();
    
    // Инициализация языковых функций (используем i18n.js)
    setupLanguageIntegration();
    
    console.log('✅ About page with Speck Design fully optimized');
}

// ФИКС ДЛЯ ХЕДЕРА НА СТРАНИЦЕ ABOUT - ОБЕСПЕЧИВАЕМ ФИКСИРОВАННОЕ ПОЛОЖЕНИЕ
function fixHeaderForAboutPage() {
    const header = document.querySelector('.main-header');
    if (header) {
        // Убираем возможные анимации скрытия хедера
        header.classList.remove('header-hidden');
        header.style.opacity = '1';
        header.style.transform = 'translateX(-50%) translateY(0)';
        header.style.pointerEvents = 'auto';
        header.style.transition = 'all 0.3s ease';
        
        // Убедимся, что хедер фиксированный
        header.style.position = 'fixed';
        header.style.top = '20px';
        header.style.left = '50%';
        header.style.transform = 'translateX(-50%)';
        
        // Установим z-index чтобы быть над всем
        header.style.zIndex = '1000';
        
        // Для мобильных корректируем
        if (window.innerWidth <= 768) {
            header.style.top = '0';
            header.style.left = '0';
            header.style.transform = 'none';
            header.style.width = '100%';
            header.style.maxWidth = '100%';
            header.style.borderRadius = '0';
            header.style.margin = '0';
        }
        
        console.log('✅ Header fixed for about page');
    }
}

// ИНТЕГРАЦИЯ С ЯЗЫКОВОЙ СИСТЕМОЙ i18n.js
function setupLanguageIntegration() {
    console.log('🌐 Setting up language integration for about page...');
    
    // Слушаем события изменения языка от i18n.js
    window.addEventListener('languageChanged', function(event) {
        console.log('🔄 Language changed detected in about.js:', event.detail.lang);
        
        // Обновляем анимации после смены языка
        setTimeout(() => {
            if (typeof window.setupSpeckAnimations === 'function') {
                window.setupSpeckAnimations();
            }
            if (typeof window.setupStoryStats === 'function') {
                window.setupStoryStats();
            }
            
            // Синхронизируем UI переключателя языка
            updateLanguageSwitcherUIFromEvent(event.detail.lang);
        }, 300);
    });
    
    // Инициализируем переключатель языка на странице (только UI)
    updateLanguageSwitcherUI();
}

// Обновление UI переключателя языка
function updateLanguageSwitcherUI() {
    const langSwitcher = document.querySelector('.language-switcher');
    if (langSwitcher) {
        // Используем i18n.js если доступен, иначе localStorage
        const currentLang = window.i18n ? window.i18n.getCurrentLang() : (localStorage.getItem('preferredLang') || 'ru');
        langSwitcher.setAttribute('data-current-lang', currentLang);
        
        // Обновляем активные кнопки
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === currentLang) {
                btn.classList.add('active');
            }
        });
    }
}

function updateLanguageSwitcherUIFromEvent(lang) {
    const langSwitcher = document.querySelector('.language-switcher');
    if (langSwitcher) {
        langSwitcher.setAttribute('data-current-lang', lang);
        
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
    }
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
                    photo.style.transform = 'translateY(-5px)';
                    photo.style.boxShadow = '0 20px 40px rgba(0, 102, 255, 0.3)';
                    photo.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
                }
            });
            
            member.addEventListener('mouseleave', () => {
                const photo = member.querySelector('.member-photo');
                if (photo) {
                    photo.style.transform = 'translateY(0)';
                    photo.style.boxShadow = '0 10px 30px rgba(0, 102, 255, 0.3)';
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
                        
                        // Анимация чисел только если еще не анимированы
                        if (!stat.classList.contains('animated')) {
                            const numberElement = stat.querySelector('.stat-number');
                            if (numberElement) {
                                animateCounter(numberElement);
                                stat.classList.add('animated');
                            }
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
    if (element.classList.contains('animated')) return;
    
    const text = element.textContent;
    const finalValue = parseInt(text.replace('+', ''));
    const duration = 2000;
    const increment = finalValue / (duration / 16);
    let currentValue = 0;
    
    element.classList.add('animated');
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
            element.textContent = text;
            clearInterval(timer);
            
            // Добавляем небольшой bounce эффект
            element.style.transform = 'scale(1.1)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200);
        } else {
            element.textContent = Math.floor(currentValue) + (text.includes('+') ? '+' : '');
        }
    }, 16);
}

// АНИМАЦИИ ПРИ СКРОЛЛЕ
function setupScrollAnimations() {
    const sections = document.querySelectorAll('section');
    const isMobile = window.innerWidth <= 768;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { 
        threshold: isMobile ? 0.1 : 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// ДОПОЛНИТЕЛЬНЫЕ МОБИЛЬНЫЕ ОПТИМИЗАЦИИ
function setupMobileOptimizations() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Оптимизация для touch устройств
        const interactiveElements = document.querySelectorAll('.btn, .speck-service-card, .team-member, .story-stat');
        
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
    const images = document.querySelectorAll('.member-photo img');
    const isMobile = window.innerWidth <= 768;
    
    console.log(`📸 Found ${images.length} team images to optimize`);
    
    images.forEach(img => {
        img.loading = 'lazy';
        img.decoding = 'async';
        
        if (isMobile) {
            img.fetchPriority = 'low';
        }
        
        // Проверяем загрузку изображений
        img.onload = function() {
            console.log(`✅ Image loaded: ${this.src}`);
            this.style.opacity = '1';
            this.style.transition = 'opacity 0.3s ease';
        };
        
        // Если изображение не загружается, используем fallback
        img.onerror = function() {
            console.warn(`❌ Failed to load image: ${this.src}`);
            const initials = this.alt.match(/\b([A-Z])/g)?.join('') || 'NB';
            
            // Вызываем глобальную функцию для создания fallback
            if (window.handleTeamPhotoError) {
                window.handleTeamPhotoError(this, initials);
            }
        };
    });
}

// АНИМАЦИИ ДЛЯ CTA КНОПКИ (ИСПРАВЛЕНО - убрана опечатка cttaButton)
function setupCTAAnimations() {
    const ctaButton = document.querySelector('.about-cta .btn');
    if (!ctaButton) {
        console.log('⚠️ CTA button not found in about section');
        return;
    }
    
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
            
            section.animated {
                animation: fadeInUp 0.8s ease forwards;
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            /* Стили для загрузки изображений */
            .member-photo img {
                transition: opacity 0.3s ease;
            }
            
            .member-photo img.loading {
                opacity: 0;
            }
            
            .member-photo img.loaded {
                opacity: 1;
            }
            
            /* Улучшенная плавность для хедера */
            .main-header {
                transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
            }
        `;
        document.head.appendChild(style);
    }
})();

// ЭКСПОРТ ФУНКЦИЙ ДЛЯ ГЛОБАЛЬНОГО ДОСТУПА
window.initAbout = initAbout;
window.setupSpeckAnimations = setupSpeckAnimations;
window.setupStoryStats = setupStoryStats;
window.updateLanguageSwitcherUI = updateLanguageSwitcherUI;

console.log('✅ about.js initialization functions ready');

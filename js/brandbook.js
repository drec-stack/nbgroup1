console.log('🎨 Brandbook page script loaded - FIXED VERSION');

// ===== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ =====
let brandbookInitialized = false;
let brandbookMobileMenuOpen = false;

// ===== ОСНОВНЫЕ ФУНКЦИИ =====

// Инициализация страницы брендбука
function initBrandbook() {
    if (brandbookInitialized) {
        console.log('⚠️ Brandbook уже инициализирован, пропускаем');
        return;
    }
    
    console.log('🚀 Initializing brandbook page...');
    
    try {
        // Проверяем, что мы на странице брендбука
        if (!document.body.classList.contains('brandbook-page')) {
            console.log('⚠️ Это не страница брендбука, выходим');
            return;
        }
        
        // ОЧЕНЬ ВАЖНО: Гарантируем, что мобильное меню закрыто на старте
        ensureMobileMenuClosed();
        
        // Инициализируем все модули страницы
        setupCaseStudies();
        setupFilterButtons();
        setupColorPalettes();
        setupBrandbookAnimations();
        setupCopyFunctionality();
        setupMobileInteractions();
        setupBrandbookLanguageIntegration();
        setupBrandbookInteractions();
        setupMobileMenuToggle();
        
        brandbookInitialized = true;
        
        console.log('✅ Brandbook page fully initialized');
        
    } catch (error) {
        console.error('❌ Error initializing brandbook:', error);
    }
}

// ГАРАНТИРУЕМ ЧТО МОБИЛЬНОЕ МЕНЮ ЗАКРЫТО ПРИ ЗАГРУЗКЕ
function ensureMobileMenuClosed() {
    console.log('🔒 Ensuring mobile menu is closed on load...');
    
    const mobileMenu = document.querySelector('.mobile-menu');
    const burgerBtn = document.querySelector('.burger-btn');
    
    if (mobileMenu) {
        mobileMenu.classList.remove('active');
        mobileMenu.style.display = 'none';
        mobileMenu.style.visibility = 'hidden';
        mobileMenu.style.opacity = '0';
        mobileMenu.style.transform = 'translateX(100%)';
        brandbookMobileMenuOpen = false;
        console.log('✅ Mobile menu forced to be closed');
    }
    
    if (burgerBtn) {
        burgerBtn.classList.remove('active');
        burgerBtn.setAttribute('aria-expanded', 'false');
        console.log('✅ Burger button reset to closed state');
    }
    
    // Разрешаем скролл страницы
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
}

// Настройка переключения мобильного меню
function setupMobileMenuToggle() {
    const burgerBtn = document.querySelector('.burger-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (!burgerBtn || !mobileMenu) {
        console.warn('⚠️ Burger button or mobile menu not found');
        return;
    }
    
    console.log('🔄 Setting up mobile menu toggle...');
    
    const toggleMenu = function(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        const isOpen = brandbookMobileMenuOpen;
        
        if (isOpen) {
            // Закрываем меню
            mobileMenu.classList.remove('active');
            burgerBtn.classList.remove('active');
            burgerBtn.setAttribute('aria-expanded', 'false');
            brandbookMobileMenuOpen = false;
            
            // Анимация закрытия
            mobileMenu.style.opacity = '0';
            mobileMenu.style.transform = 'translateX(100%)';
            
            setTimeout(() => {
                mobileMenu.style.display = 'none';
                mobileMenu.style.visibility = 'hidden';
            }, 300);
            
            // Возвращаем скролл страницы
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            
            console.log('📱 Mobile menu closed');
        } else {
            // Открываем меню
            mobileMenu.style.display = 'flex';
            mobileMenu.style.visibility = 'visible';
            brandbookMobileMenuOpen = true;
            
            setTimeout(() => {
                mobileMenu.classList.add('active');
                burgerBtn.classList.add('active');
                burgerBtn.setAttribute('aria-expanded', 'true');
                
                mobileMenu.style.opacity = '1';
                mobileMenu.style.transform = 'translateX(0)';
            }, 10);
            
            // Блокируем скролл страницы
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            
            console.log('📱 Mobile menu opened');
        }
    };
    
    // Удаляем старый обработчик если есть
    burgerBtn.removeEventListener('click', toggleMenu);
    
    // Добавляем новый обработчик
    burgerBtn.addEventListener('click', toggleMenu);
    
    // Закрываем меню при клике на ссылку в меню
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            setTimeout(toggleMenu, 300);
        });
    });
    
    console.log('✅ Mobile menu toggle handler added');
}

// ===== ИНТЕГРАЦИЯ С ЯЗЫКОВОЙ СИСТЕМОЙ =====

function setupBrandbookLanguageIntegration() {
    console.log('🌐 Setting up language integration...');
    
    // Инициализируем UI переключателя языка
    updateLanguageSwitcherUI();
    updateActiveNavLink();
    
    // Настраиваем переводы для фильтров
    updateFilterButtonsText();
}

function updateLanguageSwitcherUI() {
    const langSwitcher = document.querySelector('.language-switcher');
    if (!langSwitcher) {
        console.warn('⚠️ Language switcher not found');
        return;
    }
    
    const currentLang = window.i18n ? window.i18n.getCurrentLang() : (localStorage.getItem('preferredLang') || 'ru');
    langSwitcher.setAttribute('data-current-lang', currentLang);
    
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === currentLang) {
            btn.classList.add('active');
        }
    });
}

function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        link.classList.remove('active');
        
        if (href === currentPage) {
            link.classList.add('active');
        }
        
        // Для главной страницы
        if ((currentPage === '' || currentPage === 'index.html' || currentPage === '/') && href === 'index.html') {
            link.classList.add('active');
        }
    });
}

function updateFilterButtonsText() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length === 0) {
        console.warn('⚠️ No filter buttons found');
        return;
    }
    
    filterBtns.forEach(btn => {
        const filter = btn.getAttribute('data-filter');
        if (!filter) return;
        
        const key = `brandbook.filters.${filter}`;
        
        if (window.i18n && window.i18n.getTranslation) {
            const translation = window.i18n.getTranslation(key);
            if (translation) {
                btn.textContent = translation;
            }
        }
    });
}

// ===== НАСТРОЙКА КЕЙСОВ =====

function setupCaseStudies() {
    const caseStudies = document.querySelectorAll('.brand-case');
    if (!caseStudies.length) {
        console.warn('⚠️ No case studies found');
        return;
    }
    
    console.log(`📊 Setting up ${caseStudies.length} case studies`);
    
    caseStudies.forEach((caseStudy, index) => {
        // Добавляем задержку анимации
        caseStudy.style.animationDelay = `${index * 0.1}s`;
        
        // Эффекты для десктопа
        if (window.innerWidth > 768) {
            const mouseEnterHandler = () => {
                caseStudy.style.transform = 'translateY(-15px)';
                caseStudy.style.boxShadow = '0 35px 70px rgba(0, 102, 255, 0.25)';
                caseStudy.style.zIndex = '10';
            };
            
            const mouseLeaveHandler = () => {
                caseStudy.style.transform = 'translateY(0)';
                caseStudy.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.4)';
                caseStudy.style.zIndex = '1';
            };
            
            caseStudy.addEventListener('mouseenter', mouseEnterHandler);
            caseStudy.addEventListener('mouseleave', mouseLeaveHandler);
        }
        
        // Обработка для мобильных устройств
        if (window.innerWidth <= 768) {
            const header = caseStudy.querySelector('.case-header');
            const content = caseStudy.querySelector('.case-content');
            
            if (header && content) {
                const clickHandler = (e) => {
                    if (!e.target.closest('.case-number') && !e.target.closest('.case-category')) {
                        const isExpanded = content.style.maxHeight && content.style.maxHeight !== '0px';
                        
                        // Закрываем все другие кейсы
                        document.querySelectorAll('.case-content').forEach(item => {
                            if (item !== content) {
                                item.style.maxHeight = '0px';
                                item.parentElement.querySelector('.case-header').classList.remove('expanded');
                            }
                        });
                        
                        // Переключаем текущий кейс
                        if (isExpanded) {
                            content.style.maxHeight = '0px';
                            header.classList.remove('expanded');
                        } else {
                            content.style.maxHeight = content.scrollHeight + 'px';
                            header.classList.add('expanded');
                        }
                    }
                };
                
                header.addEventListener('click', clickHandler);
                
                // Инициализируем свернутыми на мобильных
                content.style.maxHeight = '0px';
                content.style.transition = 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                content.style.overflow = 'hidden';
            }
        }
    });
}

// ===== НАСТРОЙКА ФИЛЬТРАЦИИ =====

function setupFilterButtons() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const brandCases = document.querySelectorAll('.brand-case');
    
    if (!filterBtns.length || !brandCases.length) {
        console.log('⚠️ No filter buttons or cases found');
        return;
    }
    
    console.log(`🎯 Setting up ${filterBtns.length} filter buttons`);
    
    filterBtns.forEach(btn => {
        const clickHandler = function() {
            const filter = this.getAttribute('data-filter');
            
            // Обновляем активную кнопку
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Анимация фильтрации
            filterCasesWithAnimation(filter, brandCases);
        };
        
        btn.addEventListener('click', clickHandler);
        
        // Активируем кнопку "Все" по умолчанию
        if (btn.getAttribute('data-filter') === 'all' && !btn.classList.contains('active')) {
            btn.classList.add('active');
        }
    });
}

function filterCasesWithAnimation(filter, brandCases) {
    let visibleCount = 0;
    
    brandCases.forEach((caseEl, index) => {
        const category = caseEl.getAttribute('data-category');
        const shouldShow = filter === 'all' || category === filter;
        
        if (shouldShow) {
            visibleCount++;
            // Показываем с анимацией
            setTimeout(() => {
                caseEl.style.display = 'block';
                caseEl.style.opacity = '0';
                caseEl.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    caseEl.style.opacity = '1';
                    caseEl.style.transform = 'translateY(0)';
                    caseEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                }, 50);
            }, index * 50);
        } else {
            // Скрываем с анимацией
            caseEl.style.opacity = '0';
            caseEl.style.transform = 'translateY(10px)';
            caseEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            
            setTimeout(() => {
                caseEl.style.display = 'none';
            }, 300);
        }
    });
    
    console.log(`👁️ Showing ${visibleCount} cases for filter: ${filter}`);
}

// ===== НАСТРОЙКА ЦВЕТОВЫХ ПАЛИТР =====

function setupColorPalettes() {
    const colorItems = document.querySelectorAll('.color-item');
    if (!colorItems.length) {
        console.warn('⚠️ No color items found');
        return;
    }
    
    console.log(`🎨 Setting up ${colorItems.length} color items`);
    
    colorItems.forEach(item => {
        // Получаем цвет из background
        const bgColor = item.style.backgroundColor || window.getComputedStyle(item).backgroundColor;
        if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)') {
            const hexColor = rgbToHex(bgColor);
            item.setAttribute('title', hexColor);
            item.setAttribute('data-hex-color', hexColor);
        }
    });
}

// ===== НАСТРОЙКА АНИМАЦИЙ =====

function setupBrandbookAnimations() {
    console.log('✨ Setting up brandbook animations');
    
    // Создаем Intersection Observer
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const brandbookObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Задержка анимации для кейсов
                    if (entry.target.classList.contains('brand-case')) {
                        const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                        const delay = Math.min(index * 0.15, 1);
                        entry.target.style.animationDelay = `${delay}s`;
                    }
                }
            });
        }, observerOptions);
        
        // Наблюдаем за элементами
        const animatedElements = document.querySelectorAll(
            '.brand-case, .section-header, .intro-text, .stat-item, .cta-content, .brand-element, .filter-btn'
        );
        
        animatedElements.forEach(el => {
            if (el.classList.contains('fade-in')) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            }
            brandbookObserver.observe(el);
        });
        
        console.log(`👁️ Observing ${animatedElements.length} elements for animations`);
    } else {
        // Fallback для браузеров без IntersectionObserver
        console.log('⚠️ IntersectionObserver not supported, using fallback');
        document.querySelectorAll('.fade-in').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }
}

// ===== НАСТРОЙКА КОПИРОВАНИЯ ЦВЕТОВ =====

function setupCopyFunctionality() {
    const colorItems = document.querySelectorAll('.color-item');
    if (!colorItems.length) {
        console.warn('⚠️ No color items found for copy functionality');
        return;
    }
    
    console.log('📋 Setting up color copy functionality');
    
    colorItems.forEach(item => {
        const clickHandler = async function() {
            const color = this.getAttribute('data-hex-color') || 
                         rgbToHex(this.style.backgroundColor || window.getComputedStyle(this).backgroundColor);
            
            if (!color) {
                console.warn('No color found to copy');
                return;
            }
            
            try {
                // Копируем в буфер обмена
                await navigator.clipboard.writeText(color);
                
                // Показываем уведомление
                showNotification(`Color ${color} copied to clipboard!`, 'success');
                
                // Визуальная обратная связь
                const originalColor = this.style.backgroundColor || window.getComputedStyle(this).backgroundColor;
                this.style.backgroundColor = '#4CAF50';
                this.innerHTML = '<i class="fas fa-check"></i>';
                this.style.color = 'white';
                this.style.fontSize = '16px';
                
                // Сбрасываем через 1 секунду
                setTimeout(() => {
                    this.style.backgroundColor = originalColor;
                    this.innerHTML = '';
                    this.style.color = '';
                    this.style.fontSize = '';
                }, 1000);
                
            } catch (err) {
                console.error('Failed to copy color:', err);
                showNotification('Failed to copy color. Please try again.', 'error');
            }
        };
        
        item.addEventListener('click', clickHandler);
    });
}

// ===== НАСТРОЙКА МОБИЛЬНЫХ ВЗАИМОДЕЙСТВИЙ =====

function setupMobileInteractions() {
    if (window.innerWidth <= 768) {
        console.log('📱 Setting up mobile interactions');
        
        // Проверяем бургер-кнопку
        const burgerBtn = document.querySelector('.burger-btn');
        if (burgerBtn) {
            console.log('✅ Burger button found on mobile');
        }
        
        // Обратная связь при касании
        const interactiveElements = document.querySelectorAll(
            '.brand-case, .color-item, .btn, .filter-btn, .stat-item'
        );
        
        interactiveElements.forEach(el => {
            // Обработка touchstart
            const touchStartHandler = function(e) {
                this.style.transition = 'transform 0.1s ease, opacity 0.1s ease';
                this.style.opacity = '0.9';
                this.style.transform = 'scale(0.98)';
            };
            
            // Обработка touchend
            const touchEndHandler = function() {
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
            };
            
            // Обработка touchcancel
            const touchCancelHandler = function() {
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
                this.style.transition = '';
            };
            
            el.addEventListener('touchstart', touchStartHandler);
            el.addEventListener('touchend', touchEndHandler);
            el.addEventListener('touchcancel', touchCancelHandler);
        });
    }
}

// ===== НАСТРОЙКА ВЗАИМОДЕЙСТВИЙ БРЕНДБУКА =====

function setupBrandbookInteractions() {
    console.log('🔄 Setting up brandbook interactions');
    
    // Обработка нажатия на статистику
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        const clickHandler = function() {
            this.style.transform = 'translateY(-6px) scale(1.03)';
            
            setTimeout(() => {
                this.style.transform = 'translateY(-12px) scale(1.05)';
            }, 50);
            
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        };
        
        item.addEventListener('click', clickHandler);
    });
    
    // Обработка нажатия на кнопку CTA
    const ctaBtn = document.querySelector('.brandbook-cta .btn');
    if (ctaBtn) {
        const clickHandler = function() {
            this.style.transform = 'translateY(-4px) scale(1.04)';
            
            setTimeout(() => {
                this.style.transform = 'translateY(-8px) scale(1.08)';
            }, 100);
        };
        
        ctaBtn.addEventListener('click', clickHandler);
    }
    
    // Обработка ресайза окна
    window.addEventListener('resize', function() {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            if (!brandbookInitialized && document.body.classList.contains('brandbook-page')) {
                initBrandbook();
            }
        }, 250);
    });
}

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====

// Конвертация RGB в HEX
function rgbToHex(rgb) {
    if (!rgb) return '#000000';
    
    // Если уже HEX
    if (rgb.startsWith('#')) {
        return rgb.toUpperCase();
    }
    
    // Извлекаем RGB значения
    let result = rgb.match(/\d+/g);
    if (!result || result.length < 3) return '#000000';
    
    const r = parseInt(result[0]);
    const g = parseInt(result[1]);
    const b = parseInt(result[2]);
    
    // Конвертируем в HEX
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

// Показать уведомление
function showNotification(message, type = 'info') {
    // Удаляем старые уведомления
    document.querySelectorAll('.brandbook-notification').forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `brandbook-notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 120px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 12px 20px;
        border-radius: 12px;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.4s ease;
        max-width: 300px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 12px;
    `;
    
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Автоматическое скрытие через 3 секунды
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    }, 3000);
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        'success': 'rgba(76, 175, 80, 0.9)',
        'error': 'rgba(244, 67, 54, 0.9)',
        'info': 'rgba(33, 150, 243, 0.9)'
    };
    return colors[type] || 'rgba(33, 150, 243, 0.9)';
}

// ===== ИНИЦИАЛИЗАЦИЯ =====

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM loaded for brandbook page');
    
    // Проверяем, что мы на странице брендбука
    if (!document.body.classList.contains('brandbook-page')) {
        console.log('⚠️ Not a brandbook page, skipping initialization');
        return;
    }
    
    // Плавное появление страницы
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Инициализируем страницу с задержкой
    setTimeout(() => {
        initBrandbook();
    }, 300);
});

// Инициализация если страница уже загружена
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    if (document.body.classList.contains('brandbook-page')) {
        setTimeout(() => {
            initBrandbook();
        }, 100);
    }
}

// Экспорт функций для глобального использования
window.initBrandbook = initBrandbook;

// Проверка инициализации
window.isBrandbookInitialized = function() {
    return brandbookInitialized;
};

// Функция для проверки состояния мобильного меню
window.getBrandbookMobileMenuState = function() {
    return brandbookMobileMenuOpen;
};

// Функция для принудительного закрытия мобильного меню
window.closeBrandbookMobileMenu = function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const burgerBtn = document.querySelector('.burger-btn');
    
    if (mobileMenu) {
        mobileMenu.classList.remove('active');
        mobileMenu.style.display = 'none';
        mobileMenu.style.visibility = 'hidden';
        mobileMenu.style.opacity = '0';
        mobileMenu.style.transform = 'translateX(100%)';
        brandbookMobileMenuOpen = false;
    }
    
    if (burgerBtn) {
        burgerBtn.classList.remove('active');
        burgerBtn.setAttribute('aria-expanded', 'false');
    }
    
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    
    console.log('🔄 Mobile menu force closed');
};

console.log('✅ Brandbook.js fully loaded and ready');

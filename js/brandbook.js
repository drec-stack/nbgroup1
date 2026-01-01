// brandbook.js - Complete functionality for brandbook page with glass header
console.log('🎨 Brandbook page script loaded (glass header)');

// ===== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ =====
let brandbookObserver = null;
let resizeTimeout = null;
let lastScrollY = 0;
const SCROLL_THRESHOLD = 50;

// ===== ОСНОВНЫЕ ФУНКЦИИ =====

// Функция для удаления скрытых элементов из хедера
function removeHiddenHeaderElements() {
    console.log('🧹 Removing hidden elements from header...');
    
    // Список всех возможных селекторов скрытых элементов
    const hiddenSelectors = [
        '.mobile-menu-toggle',
        '.menu-toggle',
        '.burger-menu',
        '.hamburger',
        '.menu-btn',
        '.nav-toggle',
        '.mobile-menu-overlay',
        '.menu-overlay',
        '.mobile-menu',
        '.menu-container',
        '.mobile-nav-toggle',
        '[class*="burger"]',
        '[class*="mobile-toggle"]',
        '.burger-btn',
        '.menu-icon',
        '.mobile-nav',
        '.nav-toggle-btn'
    ];
    
    let removedCount = 0;
    
    // Удаляем элементы по каждому селектору
    hiddenSelectors.forEach(selector => {
        try {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                if (el && el.parentNode) {
                    // Проверяем, находится ли элемент в хедере
                    if (el.closest('.main-header') || el.closest('#header-container')) {
                        el.parentNode.removeChild(el);
                        removedCount++;
                        console.log(`🗑️ Removed hidden element: ${selector}`);
                    }
                }
            });
        } catch (e) {
            console.log(`⚠️ Could not process ${selector}:`, e.message);
        }
    });
    
    // Удаляем элементы с inline-стилями display: none
    document.querySelectorAll('[style*="display: none"], [style*="visibility: hidden"]').forEach(el => {
        if (el && el.parentNode && 
            (el.classList.contains('burger') || 
             el.classList.contains('menu') || 
             el.classList.contains('mobile') ||
             el.closest('.main-header'))) {
            el.parentNode.removeChild(el);
            removedCount++;
        }
    });
    
    console.log(`✅ Removed ${removedCount} hidden elements from header`);
    
    // Добавляем CSS гарантии
    addHeaderCleanupStyles();
    
    return removedCount;
}

// Добавление CSS стилей для гарантии чистого хедера
function addHeaderCleanupStyles() {
    // Удаляем старые стили если есть
    const oldStyles = document.getElementById('brandbook-clean-header-styles');
    if (oldStyles) oldStyles.remove();
    
    // Создаем новые стили
    const style = document.createElement('style');
    style.id = 'brandbook-clean-header-styles';
    style.textContent = `
        /* ГАРАНТИЯ: НИКАКИХ СКРЫТЫХ ЭЛЕМЕНТОВ В ХЕДЕРЕ БРЕНДБУКА */
        body.brandbook-page .mobile-menu-toggle,
        body.brandbook-page .menu-toggle,
        body.brandbook-page .burger-menu,
        body.brandbook-page .hamburger,
        body.brandbook-page .menu-btn,
        body.brandbook-page .nav-toggle,
        body.brandbook-page .mobile-menu-overlay,
        body.brandbook-page .menu-overlay,
        body.brandbook-page .mobile-menu,
        body.brandbook-page .menu-container,
        body.brandbook-page .mobile-nav-toggle,
        body.brandbook-page [class*="burger"],
        body.brandbook-page [class*="mobile-toggle"],
        body.brandbook-page [class*="menu-btn"] {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            width: 0 !important;
            height: 0 !important;
            overflow: hidden !important;
            position: absolute !important;
            z-index: -1000 !important;
            pointer-events: none !important;
        }
        
        /* Обеспечиваем правильное позиционирование стеклянного хедера */
        body.brandbook-page .main-header {
            position: fixed !important;
            top: 20px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: calc(100% - 40px) !important;
            max-width: 1400px !important;
            margin: 0 auto !important;
            z-index: 1000 !important;
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
            border-radius: 20px !important;
            background: rgba(255, 255, 255, 0.05) !important;
            backdrop-filter: blur(25px) saturate(180%) !important;
            -webkit-backdrop-filter: blur(25px) saturate(180%) !important;
            box-shadow: 
                0 8px 32px rgba(0, 0, 0, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.1),
                inset 0 0 20px rgba(255, 255, 255, 0.05) !important;
            border: 1px solid rgba(255, 255, 255, 0.12) !important;
        }
        
        /* Мобильная версия хедера */
        @media (max-width: 768px) {
            body.brandbook-page .main-header {
                position: fixed !important;
                left: 0 !important;
                transform: none !important;
                width: 100% !important;
                max-width: 100% !important;
                border-radius: 0 !important;
                top: 0 !important;
                margin: 0 !important;
                background: rgba(10, 10, 20, 0.95) !important;
                backdrop-filter: blur(30px) saturate(180%) !important;
                -webkit-backdrop-filter: blur(30px) saturate(180%) !important;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
                box-shadow: 
                    0 8px 32px rgba(0, 0, 0, 0.4),
                    inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;
                padding: 12px 0 !important;
            }
        }
        
        /* Скрываем основную навигацию на мобильных */
        @media (max-width: 900px) {
            body.brandbook-page .main-nav {
                display: none !important;
            }
        }
        
        /* Поддержка браузеров без backdrop-filter */
        @supports not (backdrop-filter: blur(20px)) {
            body.brandbook-page .main-header {
                background: rgba(15, 20, 35, 0.98) !important;
            }
        }
    `;
    
    document.head.appendChild(style);
    console.log('✅ Added CSS guarantees for clean header');
}

// Инициализация страницы брендбука
function initBrandbook() {
    console.log('🚀 Initializing brandbook page...');
    
    try {
        // 1. Удаляем скрытые элементы из хедера
        removeHiddenHeaderElements();
        
        // 2. Настраиваем эффект скролла для хедера
        setupHeaderScrollEffect();
        
        // 3. Инициализируем все модули страницы
        setTimeout(() => {
            setupCaseStudies();
            setupFilterButtons();
            setupColorPalettes();
            setupBrandbookAnimations();
            setupCopyFunctionality();
            setupMobileInteractions();
            setupBrandbookLanguageIntegration();
            
            // 4. Настраиваем взаимодействия
            setupBrandbookInteractions();
            
            console.log('✅ Brandbook page fully initialized');
        }, 150);
        
    } catch (error) {
        console.error('❌ Error initializing brandbook:', error);
    }
}

// Настройка эффекта скролла для хедера
function setupHeaderScrollEffect() {
    const header = document.querySelector('.main-header');
    if (!header) return;
    
    let ticking = false;
    
    const updateHeaderOnScroll = () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > SCROLL_THRESHOLD) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    };
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateHeaderOnScroll();
            });
            ticking = true;
        }
    }, { passive: true });
    
    // Инициализируем начальное состояние
    updateHeaderOnScroll();
}

// ===== ИНТЕГРАЦИЯ С ЯЗЫКОВОЙ СИСТЕМОЙ =====

function setupBrandbookLanguageIntegration() {
    console.log('🌐 Setting up language integration...');
    
    // Слушаем события изменения языка
    window.addEventListener('languageChanged', function(event) {
        console.log('🔄 Language changed detected:', event.detail.lang);
        
        setTimeout(() => {
            // Обновляем текст кнопок фильтра
            updateFilterButtonsText();
            
            // Синхронизируем переключатель языка
            updateLanguageSwitcherUIFromEvent(event.detail.lang);
            
            // Обновляем активную навигационную ссылку
            updateActiveNavLink();
        }, 300);
    });
    
    // Инициализируем UI переключателя языка
    updateLanguageSwitcherUI();
    updateActiveNavLink();
}

function updateLanguageSwitcherUI() {
    const langSwitcher = document.querySelector('.language-switcher');
    if (langSwitcher) {
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
    filterBtns.forEach(btn => {
        const filter = btn.getAttribute('data-filter');
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
    if (!caseStudies.length) return;
    
    console.log(`📊 Setting up ${caseStudies.length} case studies`);
    
    caseStudies.forEach((caseStudy, index) => {
        // Добавляем задержку анимации
        caseStudy.style.animationDelay = `${index * 0.1}s`;
        
        // Эффекты для десктопа
        if (window.innerWidth > 768) {
            caseStudy.addEventListener('mouseenter', () => {
                caseStudy.style.transform = 'translateY(-15px)';
                caseStudy.style.boxShadow = '0 35px 70px rgba(0, 102, 255, 0.25)';
                caseStudy.style.zIndex = '10';
            });
            
            caseStudy.addEventListener('mouseleave', () => {
                caseStudy.style.transform = 'translateY(0)';
                caseStudy.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.4)';
                caseStudy.style.zIndex = '1';
            });
        }
        
        // Обработка для мобильных устройств
        if (window.innerWidth <= 768) {
            const header = caseStudy.querySelector('.case-header');
            const content = caseStudy.querySelector('.case-content');
            
            if (header && content) {
                header.addEventListener('click', (e) => {
                    // Проверяем, не кликнули ли на элементы, которые не должны раскрывать
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
                            
                            // Прокручиваем к кейсу
                            setTimeout(() => {
                                caseStudy.scrollIntoView({ 
                                    behavior: 'smooth', 
                                    block: 'nearest',
                                    inline: 'nearest'
                                });
                            }, 300);
                        }
                    }
                });
                
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
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Обновляем активную кнопку
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Анимация фильтрации
            filterCasesWithAnimation(filter, brandCases);
            
            // Прокрутка к результатам на мобильных
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    const firstVisible = document.querySelector('.brand-case:not([style*="display: none"])');
                    if (firstVisible) {
                        firstVisible.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start',
                            inline: 'nearest'
                        });
                    }
                }, 500);
            }
        });
    });
}

function filterCasesWithAnimation(filter, brandCases) {
    brandCases.forEach((caseEl, index) => {
        const category = caseEl.getAttribute('data-category');
        const shouldShow = filter === 'all' || category === filter;
        
        if (shouldShow) {
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
}

// ===== НАСТРОЙКА ЦВЕТОВЫХ ПАЛИТР =====

function setupColorPalettes() {
    const colorItems = document.querySelectorAll('.color-item');
    if (!colorItems.length) return;
    
    console.log(`🎨 Setting up ${colorItems.length} color items`);
    
    colorItems.forEach(item => {
        // Получаем цвет из background
        const bgColor = item.style.backgroundColor;
        if (bgColor) {
            const hexColor = rgbToHex(bgColor);
            item.setAttribute('title', hexColor);
            item.setAttribute('data-original-color', bgColor);
            item.setAttribute('data-hex-color', hexColor);
            item.setAttribute('aria-label', `Color: ${hexColor}. Click to copy`);
        }
        
        // Добавляем tooltip для десктопа
        if (window.innerWidth > 768) {
            item.addEventListener('mouseenter', function() {
                const color = this.getAttribute('data-hex-color') || 
                             rgbToHex(this.style.backgroundColor);
                if (color) {
                    this.setAttribute('title', color);
                    
                    // Показываем всплывающую подсказку
                    showColorTooltip(this, color);
                }
            });
            
            item.addEventListener('mouseleave', function() {
                hideColorTooltip();
            });
        }
    });
}

function showColorTooltip(element, color) {
    // Удаляем старый tooltip если есть
    const oldTooltip = document.getElementById('color-tooltip');
    if (oldTooltip) oldTooltip.remove();
    
    // Создаем новый tooltip
    const tooltip = document.createElement('div');
    tooltip.id = 'color-tooltip';
    tooltip.textContent = color;
    tooltip.style.cssText = `
        position: fixed;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 6px 10px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 600;
        font-family: monospace;
        z-index: 10001;
        pointer-events: none;
        transform: translate(-50%, -100%);
        margin-top: -10px;
        white-space: nowrap;
    `;
    
    document.body.appendChild(tooltip);
    
    // Позиционируем tooltip
    const updateTooltipPosition = () => {
        const rect = element.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top}px`;
    };
    
    updateTooltipPosition();
    window.addEventListener('scroll', updateTooltipPosition);
    window.addEventListener('resize', updateTooltipPosition);
    
    // Сохраняем ссылки для удаления
    element._tooltip = tooltip;
    element._updatePosition = updateTooltipPosition;
}

function hideColorTooltip() {
    const tooltip = document.getElementById('color-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
    
    // Удаляем обработчики
    window.removeEventListener('scroll', this._updatePosition);
    window.removeEventListener('resize', this._updatePosition);
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
        
        brandbookObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Задержка анимации для кейсов
                    if (entry.target.classList.contains('brand-case')) {
                        const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                        entry.target.style.animationDelay = `${index * 0.15}s`;
                    }
                    
                    // Можно отключить наблюдение после появления
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Наблюдаем за элементами
        const animatedElements = document.querySelectorAll(
            '.brand-case, .section-header, .intro-text, .stat-item, .cta-content, .brand-element'
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
    if (!colorItems.length) return;
    
    console.log('📋 Setting up color copy functionality');
    
    colorItems.forEach(item => {
        item.addEventListener('click', async function() {
            const color = this.getAttribute('data-hex-color') || 
                         rgbToHex(this.style.backgroundColor) || 
                         this.getAttribute('data-original-color');
            
            if (!color) {
                console.warn('No color found to copy');
                return;
            }
            
            const hexColor = rgbToHex(color);
            
            try {
                // Копируем в буфер обмена
                await navigator.clipboard.writeText(hexColor);
                
                // Показываем уведомление
                showNotification(`Color ${hexColor} copied to clipboard!`, 'success');
                
                // Визуальная обратная связь
                const originalColor = this.getAttribute('data-original-color') || this.style.backgroundColor;
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
                
                // Fallback для старых браузеров
                try {
                    const textArea = document.createElement('textarea');
                    textArea.value = hexColor;
                    textArea.style.position = 'fixed';
                    textArea.style.left = '-999999px';
                    textArea.style.top = '-999999px';
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    
                    const successful = document.execCommand('copy');
                    document.body.removeChild(textArea);
                    
                    if (successful) {
                        showNotification(`Color ${hexColor} copied to clipboard!`, 'success');
                    } else {
                        showNotification('Failed to copy color. Please try again.', 'error');
                    }
                } catch (fallbackErr) {
                    console.error('Fallback copy failed:', fallbackErr);
                    showNotification('Failed to copy color. Please try again.', 'error');
                }
            }
        });
        
        // Добавляем keyboard support
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.click();
            }
        });
    });
}

// ===== НАСТРОЙКА МОБИЛЬНЫХ ВЗАИМОДЕЙСТВИЙ =====

function setupMobileInteractions() {
    if (window.innerWidth <= 768) {
        console.log('📱 Setting up mobile interactions');
        
        // Обратная связь при касании
        const interactiveElements = document.querySelectorAll(
            '.brand-case, .color-item, .btn, .filter-btn, .stat-item'
        );
        
        interactiveElements.forEach(el => {
            // Обработка touchstart
            el.addEventListener('touchstart', function(e) {
                this.style.transition = 'transform 0.1s ease, opacity 0.1s ease';
                this.style.opacity = '0.9';
                this.style.transform = 'scale(0.98)';
                
                // Предотвращаем выделение текста
                e.preventDefault();
            }, { passive: false });
            
            // Обработка touchend
            el.addEventListener('touchend', function() {
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
                
                // Сбрасываем transition
                setTimeout(() => {
                    this.style.transition = '';
                }, 100);
            });
            
            // Обработка touchcancel
            el.addEventListener('touchcancel', function() {
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
                this.style.transition = '';
            });
        });
        
        // Плавная прокрутка для мобильных
        document.documentElement.style.scrollBehavior = 'smooth';
        
        // Предотвращаем двойное нажатие для зумирования
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(event) {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, { passive: false });
        
        // Улучшаем производительность скролла
        document.addEventListener('touchmove', function(e) {
            // Allow touch events for interactive elements
            if (e.target.tagName.match(/BUTTON|A|INPUT|SELECT|TEXTAREA/i)) {
                return;
            }
            
            // Prevent default for better performance
            e.preventDefault();
        }, { passive: false });
    }
}

// ===== НАСТРОЙКА ВЗАИМОДЕЙСТВИЙ БРЕНДБУКА =====

function setupBrandbookInteractions() {
    console.log('🔄 Setting up brandbook interactions');
    
    // Обработка нажатия на статистику
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'translateY(-6px) scale(1.03)';
            
            setTimeout(() => {
                this.style.transform = 'translateY(-12px) scale(1.05)';
            }, 50);
            
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    });
    
    // Обработка нажатия на кнопку CTA
    const ctaBtn = document.querySelector('.brandbook-cta .btn');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', function(e) {
            // Добавляем анимацию нажатия
            this.style.transform = 'translateY(-4px) scale(1.04)';
            
            setTimeout(() => {
                this.style.transform = 'translateY(-8px) scale(1.08)';
            }, 100);
        });
    }
    
    // Обработка ресайза окна
    setupResponsiveBehavior();
}

function setupResponsiveBehavior() {
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        
        resizeTimeout = setTimeout(() => {
            console.log('🔄 Window resized, reinitializing components');
            
            // Переинициализируем компоненты которые зависят от размера
            if (window.innerWidth <= 768) {
                // Переключаемся на мобильный режим
                setupMobileInteractions();
            } else {
                // Переключаемся на десктоп режим
                setupCaseStudies();
            }
            
            // Обновляем позиционирование хедера
            const header = document.querySelector('.main-header');
            if (header) {
                if (window.innerWidth <= 768) {
                    header.style.left = '0';
                    header.style.transform = 'none';
                    header.style.width = '100%';
                    header.style.maxWidth = '100%';
                    header.style.borderRadius = '0';
                    header.style.top = '0';
                } else {
                    header.style.left = '50%';
                    header.style.transform = 'translateX(-50%)';
                    header.style.width = 'calc(100% - 40px)';
                    header.style.maxWidth = '1400px';
                    header.style.borderRadius = '20px';
                    header.style.top = '20px';
                }
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
        // Проверяем корректность HEX
        const hex = rgb.toUpperCase();
        const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        return hexRegex.test(hex) ? hex : '#000000';
    }
    
    // Извлекаем RGB значения
    let result = rgb.match(/\d+/g);
    if (!result || result.length < 3) return '#000000';
    
    const r = parseInt(result[0]);
    const g = parseInt(result[1]);
    const b = parseInt(result[2]);
    
    // Проверяем корректность значений
    if (r > 255 || g > 255 || b > 255 || r < 0 || g < 0 || b < 0) {
        return '#000000';
    }
    
    // Конвертируем в HEX
    const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
    
    // Проверяем результат
    return hex.length === 7 ? hex : '#000000';
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
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        max-width: 300px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 12px;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
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
    
    // Возможность закрыть кликом
    notification.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'info': 'info-circle',
        'warning': 'exclamation-triangle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        'success': 'rgba(76, 175, 80, 0.9)',
        'error': 'rgba(244, 67, 54, 0.9)',
        'info': 'rgba(33, 150, 243, 0.9)',
        'warning': 'rgba(255, 152, 0, 0.9)'
    };
    return colors[type] || 'rgba(33, 150, 243, 0.9)';
}

// ===== ИНИЦИАЛИЗАЦИЯ И СОБЫТИЯ =====

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM loaded for brandbook page');
    
    // Плавное появление страницы
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Инициализируем страницу
    setTimeout(() => {
        initBrandbook();
    }, 300);
    
    // Периодически проверяем и чистим скрытые элементы
    setInterval(() => {
        if (document.body.classList.contains('brandbook-page')) {
            removeHiddenHeaderElements();
        }
    }, 10000); // Каждые 10 секунд
});

// Инициализация если страница уже загружена
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    setTimeout(() => {
        initBrandbook();
    }, 100);
}

// Обработка ресайза окна
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (typeof initBrandbook === 'function') {
            initBrandbook();
        }
    }, 250);
});

// Обработка ухода со страницы
window.addEventListener('beforeunload', () => {
    // Очищаем observer
    if (brandbookObserver) {
        brandbookObserver.disconnect();
        brandbookObserver = null;
    }
    
    // Очищаем таймеры
    clearTimeout(resizeTimeout);
    
    console.log('👋 Brandbook page cleanup');
});

// Экспорт функций для глобального использования
window.initBrandbook = initBrandbook;
window.removeHiddenHeaderElements = removeHiddenHeaderElements;
window.showNotification = showNotification;
window.rgbToHex = rgbToHex;
window.updateLanguageSwitcherUI = updateLanguageSwitcherUI;

console.log('✅ Brandbook.js fully loaded and ready');

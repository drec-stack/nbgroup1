// brandbook.js - Complete functionality for brandbook page with language support
console.log('🎨 Brandbook page script loaded with language support');

// CRITICAL FIX: Apply header positioning immediately
(function applyHeaderFixImmediately() {
    console.log('🔧 Applying immediate header positioning fix...');
    
    // Create style element immediately
    const style = document.createElement('style');
    style.textContent = `
        /* Базовые стили хедера для всех страниц, кроме брендбука */
        .main-header:not(.brandbook-page .main-header) {
            position: fixed !important;
            top: 20px !important;
            left: 50% !important;
            transform: translateX(-50%) translateY(0) !important;
            width: calc(100% - 40px) !important;
            max-width: 1400px !important;
            margin: 0 auto !important;
            z-index: 1000 !important;
            opacity: 1 !important;
            pointer-events: auto !important;
            transition: all 0.4s ease !important;
            border-radius: 20px !important;
            background: rgba(0, 102, 255, 0.12) !important;
            backdrop-filter: blur(16px) saturate(180%) !important;
            -webkit-backdrop-filter: blur(16px) saturate(180%) !important;
            border: 1px solid rgba(255, 255, 255, 0.22) !important;
        }
        
        .main-header.header-hidden:not(.brandbook-page .main-header) {
            transform: translateX(-50%) translateY(-100%) !important;
            opacity: 0 !important;
            pointer-events: none !important;
        }
        
        .main-header.header-scrolled:not(.brandbook-page .main-header) {
            background: rgba(0, 102, 255, 0.2) !important;
            backdrop-filter: blur(20px) saturate(200%) !important;
            -webkit-backdrop-filter: blur(20px) saturate(200%) !important;
        }
        
        @media (max-width: 768px) {
            .main-header:not(.brandbook-page .main-header) {
                top: 0 !important;
                left: 0 !important;
                transform: none !important;
                width: 100% !important;
                max-width: 100% !important;
                border-radius: 0 !important;
                margin: 0 !important;
                padding: 14px 0 !important;
                background: rgba(0, 102, 255, 0.22) !important;
                border: none !important;
                border-bottom: 1px solid rgba(255, 255, 255, 0.15) !important;
            }
            
            .main-header.header-hidden:not(.brandbook-page .main-header) {
                transform: translateY(-100%) !important;
            }
        }
        
        /* Стили для брендбука - хедер скрыт */
        .brandbook-page .main-header {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            height: 0 !important;
            min-height: 0 !important;
            padding: 0 !important;
            margin: 0 !important;
            pointer-events: none !important;
            position: absolute !important;
            z-index: -1000 !important;
            overflow: hidden !important;
            border: none !important;
            box-shadow: none !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            background: transparent !important;
            transform: none !important;
            top: -100px !important;
        }
    `;
    
    // Insert style immediately before any other scripts run
    if (document.head) {
        document.head.insertBefore(style, document.head.firstChild);
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            document.head.insertBefore(style, document.head.firstChild);
        });
    }
    
    // Also apply directly to any existing header
    document.addEventListener('DOMContentLoaded', () => {
        const header = document.querySelector('.main-header');
        const isBrandbookPage = document.body.classList.contains('brandbook-page') || 
                               window.location.pathname.includes('brandbook');
        
        if (header && !isBrandbookPage) {
            console.log('🎯 Applying header fix to existing element');
            header.style.position = 'fixed';
            header.style.top = '20px';
            header.style.left = '50%';
            header.style.transform = 'translateX(-50%) translateY(0)';
            header.style.width = 'calc(100% - 40px)';
            header.style.maxWidth = '1400px';
            header.style.margin = '0 auto';
            header.style.zIndex = '1000';
            
            if (window.innerWidth <= 768) {
                header.style.top = '0';
                header.style.left = '0';
                header.style.transform = 'none';
                header.style.width = '100%';
                header.style.maxWidth = '100%';
                header.style.borderRadius = '0';
                header.style.margin = '0';
                header.style.padding = '14px 0';
            }
        }
    });
})();

// Main initialization function
function initBrandbook() {
    console.log('🚀 Initializing brandbook functionality...');
    
    const isBrandbookPage = document.body.classList.contains('brandbook-page') || 
                           window.location.pathname.includes('brandbook');
    
    // ===== ОЧИСТКА ХЕДЕРА ТОЛЬКО НА СТРАНИЦЕ БРЕНДБУКА =====
    if (isBrandbookPage) {
        console.log('🔧 Brandbook page detected - clearing header...');
        
        const header = document.querySelector('.main-header');
        const headerContainer = document.getElementById('header-container');
        
        // Полностью скрываем хедер
        if (header) {
            header.style.display = 'none';
            header.style.visibility = 'hidden';
            header.style.opacity = '0';
            header.style.height = '0';
            header.style.minHeight = '0';
            header.style.padding = '0';
            header.style.margin = '0';
            header.style.pointerEvents = 'none';
            header.style.overflow = 'hidden';
            header.style.position = 'absolute';
            header.style.zIndex = '-1000';
            header.style.background = 'transparent';
            header.style.border = 'none';
            header.style.boxShadow = 'none';
            header.style.backdropFilter = 'none';
            header.style.webkitBackdropFilter = 'none';
            header.style.transform = 'none';
            header.style.top = '-100px';
            header.style.left = '0';
            
            // Убираем классы скролла
            header.classList.remove('header-scrolled', 'header-hidden');
        }
        
        // Скрываем контейнер хедера
        if (headerContainer) {
            headerContainer.style.display = 'none';
            headerContainer.style.visibility = 'hidden';
            headerContainer.style.height = '0';
            headerContainer.style.minHeight = '0';
            headerContainer.style.padding = '0';
            headerContainer.style.margin = '0';
            headerContainer.style.overflow = 'hidden';
            headerContainer.style.pointerEvents = 'none';
        }
        
        // Корректируем отступы body
        document.body.style.paddingTop = '0';
        
        // Корректируем отступы для hero-секции
        const hero = document.querySelector('.brandbook-hero');
        if (hero) {
            hero.style.paddingTop = window.innerWidth <= 768 ? '100px' : '140px';
            hero.style.transition = 'padding-top 0.3s ease';
        }
        
        // Убираем обработчики скролла для хедера
        window.removeEventListener('scroll', handleHeaderScroll);
    } else {
        // Apply header positioning one more time for safety
        const header = document.querySelector('.main-header');
        if (header) {
            header.style.left = '50%';
            header.style.transform = 'translateX(-50%) translateY(0)';
        }
    }
    
    // Initialize all modules
    setupCaseStudies();
    setupFilterButtons();
    setupColorPalettes();
    setupBrandbookAnimations();
    setupCopyFunctionality();
    
    // Setup mobile interactions
    setupMobileInteractions();
    
    // Setup language integration
    setupBrandbookLanguageIntegration();
    
    // Initialize header properly (только если не страница брендбука)
    if (!isBrandbookPage) {
        setTimeout(() => {
            if (window.initHeader) {
                window.initHeader();
            }
            
            // Final header positioning check
            const finalHeader = document.querySelector('.main-header');
            if (finalHeader) {
                finalHeader.style.left = '50%';
                finalHeader.style.transform = 'translateX(-50%) translateY(0)';
            }
        }, 500);
    }
    
    console.log('✅ Brandbook functionality initialized');
}

// ИНТЕГРАЦИЯ С ЯЗЫКОВОЙ СИСТЕМОЙ i18n.js
function setupBrandbookLanguageIntegration() {
    console.log('🌐 Setting up language integration for brandbook page...');
    
    // Слушаем события изменения языка от i18n.js
    window.addEventListener('languageChanged', function(event) {
        console.log('🔄 Language changed detected in brandbook.js:', event.detail.lang);
        
        // Обновляем анимации после смены языка
        setTimeout(() => {
            if (typeof window.setupCaseStudies === 'function') {
                window.setupCaseStudies();
            }
            
            // Обновляем текст кнопок фильтра
            updateFilterButtonsText();
            
            // Синхронизируем UI переключателя языка
            updateLanguageSwitcherUIFromEvent(event.detail.lang);
        }, 300);
    });
    
    // Инициализируем переключатель языка на странице (только UI)
    updateLanguageSwitcherUI();
}

function updateFilterButtonsText() {
    // Обновляем текст кнопок фильтра после смены языка
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

// Обновление UI переключателя языка
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

// Setup case studies interactions
function setupCaseStudies() {
    const caseStudies = document.querySelectorAll('.brand-case');
    
    caseStudies.forEach((caseStudy, index) => {
        // Add animation delay
        caseStudy.style.animationDelay = `${index * 0.1}s`;
        
        // Desktop hover effects
        if (window.innerWidth > 768) {
            caseStudy.addEventListener('mouseenter', () => {
                caseStudy.style.transform = 'translateY(-15px)';
                caseStudy.style.boxShadow = '0 35px 70px rgba(0, 102, 255, 0.25)';
            });
            
            caseStudy.addEventListener('mouseleave', () => {
                caseStudy.style.transform = 'translateY(0)';
                caseStudy.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.4)';
            });
        }
        
        // Mobile tap handling
        if (window.innerWidth <= 768) {
            const header = caseStudy.querySelector('.case-header');
            const content = caseStudy.querySelector('.case-content');
            
            if (header && content) {
                header.addEventListener('click', (e) => {
                    if (!e.target.closest('.case-number') && !e.target.closest('.case-category')) {
                        const isExpanded = content.style.maxHeight && content.style.maxHeight !== '0px';
                        
                        // Close all other cases
                        document.querySelectorAll('.case-content').forEach(item => {
                            if (item !== content) {
                                item.style.maxHeight = '0px';
                                item.parentElement.querySelector('.case-header').classList.remove('expanded');
                            }
                        });
                        
                        // Toggle current case
                        if (isExpanded) {
                            content.style.maxHeight = '0px';
                            header.classList.remove('expanded');
                        } else {
                            content.style.maxHeight = content.scrollHeight + 'px';
                            header.classList.add('expanded');
                            
                            // Scroll to case
                            setTimeout(() => {
                                caseStudy.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                            }, 300);
                        }
                    }
                });
                
                // Initialize collapsed on mobile
                content.style.maxHeight = '0px';
                content.style.transition = 'max-height 0.3s ease';
            }
        }
    });
}

// Setup filter buttons
function setupFilterButtons() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const brandCases = document.querySelectorAll('.brand-case');
    
    if (!filterBtns.length) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter cases with animation
            brandCases.forEach((caseEl, index) => {
                if (filter === 'all' || caseEl.getAttribute('data-category') === filter) {
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
                    caseEl.style.opacity = '0';
                    caseEl.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        caseEl.style.display = 'none';
                    }, 300);
                }
            });
            
            // Scroll to results on mobile
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    const firstVisible = document.querySelector('.brand-case:not([style*="display: none"])');
                    if (firstVisible) {
                        firstVisible.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 500);
            }
        });
    });
}

// Setup color palettes
function setupColorPalettes() {
    const colorItems = document.querySelectorAll('.color-item');
    
    colorItems.forEach(item => {
        // Get color from background
        const bgColor = item.style.backgroundColor;
        if (bgColor) {
            const hexColor = rgbToHex(bgColor);
            item.setAttribute('title', hexColor);
            item.setAttribute('data-original-color', bgColor);
        }
        
        // Add tooltip for desktop
        if (window.innerWidth > 768) {
            item.addEventListener('mouseenter', function() {
                const color = this.style.backgroundColor || this.getAttribute('data-original-color');
                if (color) {
                    this.setAttribute('title', rgbToHex(color));
                }
            });
        }
    });
}

// Setup animations
function setupBrandbookAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Stagger animation for cases
                if (entry.target.classList.contains('brand-case')) {
                    const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.brand-case, .section-header, .intro-text, .stat-item, .cta-content').forEach(el => {
        if (el.classList.contains('fade-in')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        }
        observer.observe(el);
    });
}

// Setup copy functionality
function setupCopyFunctionality() {
    const colorItems = document.querySelectorAll('.color-item');
    
    colorItems.forEach(item => {
        item.addEventListener('click', async function() {
            const color = this.style.backgroundColor || this.getAttribute('data-original-color');
            if (!color) return;
            
            const hexColor = rgbToHex(color);
            
            try {
                // Copy to clipboard
                await navigator.clipboard.writeText(hexColor);
                
                // Show notification
                showNotification(`Color ${hexColor} copied to clipboard!`, 'success');
                
                // Visual feedback
                const originalColor = this.getAttribute('data-original-color');
                this.style.backgroundColor = '#4CAF50';
                this.innerHTML = '<i class="fas fa-check"></i>';
                this.style.color = 'white';
                
                // Reset after 1 second
                setTimeout(() => {
                    this.style.backgroundColor = originalColor;
                    this.innerHTML = '';
                    this.style.color = '';
                }, 1000);
                
            } catch (err) {
                console.error('Failed to copy color:', err);
                showNotification('Failed to copy color', 'error');
            }
        });
    });
}

// Setup mobile interactions
function setupMobileInteractions() {
    if (window.innerWidth <= 768) {
        // Touch feedback
        const interactiveElements = document.querySelectorAll('.brand-case, .color-item, .btn, .filter-btn');
        
        interactiveElements.forEach(el => {
            el.addEventListener('touchstart', function() {
                this.style.opacity = '0.9';
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
        
        // Smooth scroll for mobile
        document.documentElement.style.scrollBehavior = 'smooth';
        
        // Prevent double tap zoom
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(event) {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, { passive: false });
    }
}

// Utility: Convert RGB to HEX
function rgbToHex(rgb) {
    if (!rgb) return '#000000';
    
    // If already hex
    if (rgb.startsWith('#')) return rgb.toUpperCase();
    
    // Extract RGB values
    const result = rgb.match(/\d+/g);
    if (!result || result.length < 3) return '#000000';
    
    const r = parseInt(result[0]);
    const g = parseInt(result[1]);
    const b = parseInt(result[2]);
    
    // Convert to HEX
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

// Utility: Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
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
        'success': '#4CAF50',
        'error': '#f44336',
        'info': '#2196F3',
        'warning': '#FF9800'
    };
    return colors[type] || '#2196F3';
}

// Helper function for scroll handling (если используется)
function handleHeaderScroll() {
    const header = document.querySelector('.main-header');
    if (header && !document.body.classList.contains('brandbook-page')) {
        if (window.scrollY > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    // Apply immediate header positioning (только если не страница брендбука)
    const isBrandbookPage = document.body.classList.contains('brandbook-page') || 
                           window.location.pathname.includes('brandbook');
    
    if (!isBrandbookPage) {
        const header = document.querySelector('.main-header');
        if (header) {
            header.style.left = '50%';
            header.style.transform = 'translateX(-50%) translateY(0)';
        }
    }
    
    setTimeout(() => {
        initBrandbook();
    }, 300);
    
    // Fade in page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Initialize if page already loaded
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    const isBrandbookPage = document.body.classList.contains('brandbook-page') || 
                           window.location.pathname.includes('brandbook');
    
    if (!isBrandbookPage) {
        const header = document.querySelector('.main-header');
        if (header) {
            header.style.left = '50%';
            header.style.transform = 'translateX(-50%) translateY(0)';
        }
    }
    
    setTimeout(() => {
        initBrandbook();
    }, 100);
}

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (typeof initBrandbook === 'function') {
            initBrandbook();
        }
    }, 250);
});

// Export functions for global use
window.initBrandbook = initBrandbook;
window.showNotification = showNotification;
window.rgbToHex = rgbToHex;
window.updateLanguageSwitcherUI = updateLanguageSwitcherUI;

console.log('✅ Brandbook.js initialization functions ready');

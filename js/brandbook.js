// brandbook.js - Полный функционал страницы брендбука
console.log('🎨 Brandbook page loaded');

// Основная функция инициализации
function initBrandbook() {
    console.log('🚀 Initializing brandbook page...');
    
    // Инициализация всех модулей
    initCaseStudies();
    initBrandbookAnimations();
    initBrandbookFilter();
    setupColorPalettes();
    setupTypographySamples();
    setupCopyColorFunctionality();
    
    // Настройка взаимодействий
    setupMobileInteractions();
    setupScrollAnimations();
    setupNotifications();
    
    console.log('✅ Brandbook page initialized');
}

// ===== КЕЙСЫ БРЕНДБУКА =====
function initCaseStudies() {
    const caseStudies = document.querySelectorAll('.brand-case');
    
    caseStudies.forEach((caseStudy) => {
        // Анимация при наведении (только для десктопов)
        if (window.innerWidth > 768) {
            caseStudy.addEventListener('mouseenter', () => {
                caseStudy.style.transform = 'translateY(-10px)';
                caseStudy.style.boxShadow = '0 25px 50px rgba(0, 102, 255, 0.15)';
                caseStudy.style.transition = 'all 0.4s ease';
            });
            
            caseStudy.addEventListener('mouseleave', () => {
                caseStudy.style.transform = 'translateY(0)';
                caseStudy.style.boxShadow = 'none';
            });
        }
        
        // Клик для разворачивания контента на мобильных
        if (window.innerWidth <= 768) {
            const caseHeader = caseStudy.querySelector('.case-header');
            const caseContent = caseStudy.querySelector('.case-content');
            
            if (caseHeader && caseContent) {
                caseHeader.addEventListener('click', function(e) {
                    if (!e.target.closest('.case-number') && !e.target.closest('.case-category')) {
                        const isExpanded = caseContent.style.maxHeight && caseContent.style.maxHeight !== '0px';
                        
                        // Закрываем все другие кейсы
                        document.querySelectorAll('.case-content').forEach(content => {
                            if (content !== caseContent) {
                                content.style.maxHeight = '0px';
                                content.parentElement.querySelector('.case-header').classList.remove('expanded');
                            }
                        });
                        
                        // Переключаем текущий кейс
                        if (isExpanded) {
                            caseContent.style.maxHeight = '0px';
                            caseHeader.classList.remove('expanded');
                        } else {
                            caseContent.style.maxHeight = caseContent.scrollHeight + 'px';
                            caseHeader.classList.add('expanded');
                            
                            // Скроллим к открытому кейсу
                            setTimeout(() => {
                                caseStudy.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                            }, 300);
                        }
                    }
                });
                
                // Изначально скрываем контент на мобильных
                caseContent.style.maxHeight = '0px';
                caseContent.style.transition = 'max-height 0.3s ease';
            }
        }
    });
}

// ===== АНИМАЦИИ ПРИ СКРОЛЛЕ =====
function initBrandbookAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Задержка для каждого элемента
                if (entry.target.classList.contains('brand-case')) {
                    const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    // Наблюдаем за всеми элементами, которые должны анимироваться
    document.querySelectorAll('.brand-case, .section-header, .intro-text, .stat-item').forEach(el => {
        observer.observe(el);
    });
}

// ===== ФИЛЬТРАЦИЯ КЕЙСОВ =====
function initBrandbookFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const brandCases = document.querySelectorAll('.brand-case');
    
    if (filterBtns.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Обновление активной кнопки
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Фильтрация кейсов
            brandCases.forEach(caseEl => {
                if (filter === 'all' || caseEl.getAttribute('data-category') === filter) {
                    caseEl.style.display = 'block';
                    setTimeout(() => {
                        caseEl.style.opacity = '1';
                        caseEl.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    caseEl.style.opacity = '0';
                    caseEl.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        caseEl.style.display = 'none';
                    }, 300);
                }
            });
            
            // На мобильных скроллим к результатам
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    const firstVisible = document.querySelector('.brand-case:not([style*="display: none"])');
                    if (firstVisible) {
                        firstVisible.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 400);
            }
        });
    });
}

// ===== ЦВЕТОВЫЕ ПАЛИТРЫ =====
function setupColorPalettes() {
    const colorPalettes = document.querySelectorAll('.color-palette');
    
    colorPalettes.forEach(palette => {
        const colors = palette.querySelectorAll('.color-item');
        colors.forEach(colorItem => {
            // Добавляем атрибут для копирования
            const color = colorItem.style.backgroundColor || colorItem.getAttribute('title');
            colorItem.setAttribute('data-color', color);
            
            // Показываем код цвета при наведении на десктопах
            if (window.innerWidth > 768) {
                colorItem.addEventListener('mouseenter', function() {
                    this.setAttribute('title', this.getAttribute('data-color'));
                });
            }
        });
    });
}

// ===== ТИПОГРАФИЯ =====
function setupTypographySamples() {
    // Загружаем шрифты для демонстрации
    const fontLinks = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap',
        'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap',
        'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
        'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
        'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap'
    ];
    
    // Добавляем шрифты в head
    fontLinks.forEach(link => {
        const fontLink = document.createElement('link');
        fontLink.href = link;
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);
    });
}

// ===== КОПИРОВАНИЕ ЦВЕТОВ =====
function setupCopyColorFunctionality() {
    const colorItems = document.querySelectorAll('.color-item');
    
    colorItems.forEach(item => {
        item.addEventListener('click', async function() {
            const color = this.getAttribute('data-color') || this.style.backgroundColor;
            const hexColor = rgbToHex(color);
            
            try {
                // Копируем цвет в буфер обмена
                await navigator.clipboard.writeText(hexColor);
                showNotification(`Color ${hexColor} copied to clipboard!`, 'success');
                
                // Визуальная обратная связь
                const originalColor = this.style.backgroundColor;
                this.style.backgroundColor = '#4CAF50';
                this.innerHTML = '<i class="fas fa-check"></i>';
                
                setTimeout(() => {
                    this.style.backgroundColor = originalColor;
                    this.innerHTML = '';
                }, 1000);
            } catch (err) {
                console.error('Failed to copy color:', err);
                showNotification('Failed to copy color', 'error');
            }
        });
    });
}

// ===== МОБИЛЬНЫЕ ВЗАИМОДЕЙСТВИЯ =====
function setupMobileInteractions() {
    if (window.innerWidth <= 768) {
        // Touch feedback для элементов
        const interactiveElements = document.querySelectorAll('.brand-case, .color-item, .btn');
        
        interactiveElements.forEach(el => {
            el.addEventListener('touchstart', function() {
                this.style.opacity = '0.9';
            });
            
            el.addEventListener('touchend', function() {
                this.style.opacity = '1';
            });
        });
        
        // Улучшение скролла для мобильных
        document.documentElement.style.scrollBehavior = 'smooth';
    }
}

// ===== АНИМАЦИИ ПРИ СКРОЛЛЕ =====
function setupScrollAnimations() {
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const parallaxElements = document.querySelectorAll('.brandbook-hero');
                
                parallaxElements.forEach(el => {
                    const speed = 0.5;
                    el.style.transform = `translateY(${scrolled * speed}px)`;
                });
                
                ticking = false;
            });
            
            ticking = true;
        }
    }, { passive: true });
}

// ===== УВЕДОМЛЕНИЯ =====
function setupNotifications() {
    // Создаем контейнер для уведомлений
    const notificationContainer = document.createElement('div');
    notificationContainer.id = 'notification-container';
    notificationContainer.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        display: flex;
        flex-direction: column;
        gap: 10px;
    `;
    document.body.appendChild(notificationContainer);
}

function showNotification(message, type = 'info') {
    const container = document.getElementById('notification-container');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        background: ${getNotificationColor(type)};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    container.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Авто-удаление
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

// ===== УТИЛИТЫ =====
function rgbToHex(rgb) {
    if (!rgb) return '#000000';
    
    // Если уже hex
    if (rgb.startsWith('#')) return rgb.toUpperCase();
    
    // Извлекаем значения RGB из строки
    const result = rgb.match(/\d+/g);
    if (!result || result.length < 3) return '#000000';
    
    const r = parseInt(result[0]);
    const g = parseInt(result[1]);
    const b = parseInt(result[2]);
    
    // Конвертируем в HEX
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', function() {
    // Ждем загрузки всех ресурсов
    setTimeout(() => {
        if (typeof initBrandbook === 'function') {
            initBrandbook();
        }
        
        // Анимация появления страницы
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    }, 300);
});

// Инициализация при быстрой загрузке
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    setTimeout(() => {
        if (typeof initBrandbook === 'function') {
            initBrandbook();
        }
    }, 100);
}

// Глобальная функция для ручной инициализации
window.initBrandbook = initBrandbook;
window.showNotification = showNotification;

// Экспорт для модулей
export { initBrandbook, showNotification, rgbToHex };

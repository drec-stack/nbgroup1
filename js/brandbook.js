// brandbook.js - МОБИЛЬНАЯ ОПТИМИЗАЦИЯ
console.log('🎨 brandbook.js loaded - MOBILE OPTIMIZED');

function initBrandbook() {
    console.log('Initializing brandbook page with mobile optimizations...');
    
    initCaseStudies();
    initBrandbookAnimations();
    initBrandbookFilter();
    setupMobileInteractions();
    
    console.log('Brandbook page optimized for mobile');
}

// ОПТИМИЗИРОВАННЫЕ КЕЙСЫ ДЛЯ МОБИЛЬНЫХ
function initCaseStudies() {
    const caseStudies = document.querySelectorAll('.brand-case');
    const isMobile = window.innerWidth <= 768;
    
    caseStudies.forEach((caseStudy, index) => {
        // Упрощенные анимации для мобильных
        if (!isMobile) {
            caseStudy.addEventListener('mouseenter', () => {
                caseStudy.style.transform = 'translateY(-5px)';
                caseStudy.style.transition = 'transform 0.3s ease';
            });
            
            caseStudy.addEventListener('mouseleave', () => {
                caseStudy.style.transform = 'translateY(0)';
            });
        }
        
        // Клик для разворачивания контента
        caseStudy.addEventListener('click', function(e) {
            if (isMobile && !e.target.closest('.case-expand-btn')) {
                const content = this.querySelector('.case-content');
                const isExpanded = content.style.maxHeight && content.style.maxHeight !== '0px';
                
                // Закрываем все другие кейсы
                document.querySelectorAll('.case-content').forEach(item => {
                    if (item !== content) {
                        item.style.maxHeight = '0px';
                        item.previousElementSibling?.classList.remove('expanded');
                    }
                });
                
                // Переключаем текущий кейс
                if (isExpanded) {
                    content.style.maxHeight = '0px';
                    this.querySelector('.case-header').classList.remove('expanded');
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    this.querySelector('.case-header').classList.add('expanded');
                    
                    // Скроллим к открытому кейсу
                    setTimeout(() => {
                        this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 300);
                }
            }
        });
    });
}

// ОПТИМИЗИРОВАННЫЕ АНИМАЦИИ
function initBrandbookAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Stagger анимация для grid items
                if (entry.target.classList.contains('brand-case')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    entry.target.style.transition = `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`;
                }
            }
        });
    }, observerOptions);
    
    // Наблюдаем за бренд-кейсами
    document.querySelectorAll('.brand-case').forEach(caseEl => {
        caseEl.style.opacity = '0';
        caseEl.style.transform = 'translateY(20px)';
        observer.observe(caseEl);
    });
    
    // Наблюдаем за заголовками секций
    document.querySelectorAll('.section-header').forEach(header => {
        header.style.opacity = '0';
        header.style.transform = 'translateY(20px)';
        header.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(header);
    });
}

// ОПТИМИЗИРОВАННЫЙ ФИЛЬТР
function initBrandbookFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const brandCases = document.querySelectorAll('.brand-case');
    const isMobile = window.innerWidth <= 768;
    
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
            if (isMobile) {
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

// ДОПОЛНИТЕЛЬНЫЕ МОБИЛЬНЫЕ ВЗАИМОДЕЙСТВИЯ
function setupMobileInteractions() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Touch feedback для цветовых палитр
        const colorItems = document.querySelectorAll('.color-item');
        
        colorItems.forEach(item => {
            item.addEventListener('touchstart', function() {
                this.style.transform = 'scale(1.1)';
            });
            
            item.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
        
        // Улучшение скролла
        document.addEventListener('touchmove', function(e) {
            // Можно добавить дополнительную логику скролла
        }, { passive: true });
    }
}

// ГЕНЕРАЦИЯ ЦВЕТОВЫХ ПАЛИТР
function generateColorPalettes() {
    const colorPalettes = [
        ['#FF6B6B', '#4ECDC4', '#45B7D1'],
        ['#FFE66D', '#FF6B6B', '#4ECDC4'],
        ['#6B48FF', '#1AFFD5', '#FF9A3D'],
        ['#FF4081', '#7C4DFF', '#448AFF'],
        ['#00BCD4', '#4CAF50', '#FFC107'],
        ['#9C27B0', '#3F51B5', '#03A9F4']
    ];
    
    document.querySelectorAll('.color-palette').forEach((palette, index) => {
        const colors = colorPalettes[index % colorPalettes.length];
        palette.innerHTML = '';
        
        colors.forEach(color => {
            const colorItem = document.createElement('div');
            colorItem.className = 'color-item';
            colorItem.style.backgroundColor = color;
            colorItem.title = color;
            
            // Добавляем tooltip для мобильных
            colorItem.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    showColorTooltip(this, color);
                }
            });
            
            palette.appendChild(colorItem);
        });
    });
}

// TOOLTIP ДЛЯ ЦВЕТОВ НА МОБИЛЬНЫХ
function showColorTooltip(element, color) {
    // Удаляем существующие tooltip
    const existingTooltip = document.querySelector('.color-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }
    
    const tooltip = document.createElement('div');
    tooltip.className = 'color-tooltip';
    tooltip.textContent = color;
    tooltip.style.cssText = `
        position: fixed;
        background: var(--primary);
        color: var(--text);
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 600;
        border: 1px solid var(--border);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        pointer-events: none;
    `;
    
    document.body.appendChild(tooltip);
    
    // Позиционирование tooltip
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + 'px';
    tooltip.style.top = (rect.top - 40) + 'px';
    
    // Авто-удаление через 2 секунды
    setTimeout(() => {
        tooltip.remove();
    }, 2000);
}

// ИНИЦИАЛИЗАЦИЯ
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (typeof initBrandbook === 'function') {
            initBrandbook();
        }
        
        generateColorPalettes();
    }, 300);
});

if (document.readyState === 'interactive' || document.readyState === 'complete') {
    setTimeout(() => {
        if (typeof initBrandbook === 'function') {
            initBrandbook();
            generateColorPalettes();
        }
    }, 100);
}

window.initBrandbook = initBrandbook;

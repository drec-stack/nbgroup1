// parallax.js - ПАРАЛЛАКС КАК НА SPECKDESIGN.COM
console.log('🎯 parallax.js loaded - SPECKDESIGN.COM STYLE');

class SpeckDesignParallax {
    constructor() {
        this.layers = document.querySelectorAll('.parallax-layer');
        this.sections = document.querySelectorAll('[data-layer]');
        this.indicators = document.querySelectorAll('.parallax-indicator');
        this.progressBar = document.querySelector('.scroll-progress-bar');
        
        this.currentLayer = 1;
        this.totalLayers = this.layers.length;
        this.isAnimating = false;
        this.scrollDirection = 'down';
        this.lastScrollY = window.scrollY;
        this.scrollThreshold = 50;
        
        this.init();
    }
    
    init() {
        console.log(`🎯 Initializing speckdesign.com style parallax with ${this.totalLayers} layers`);
        
        if (this.layers.length === 0) {
            console.error('❌ No parallax layers found');
            return;
        }
        
        // Показываем только первый слой
        this.setLayer(1);
        
        // Настраиваем Intersection Observer для секций
        this.setupIntersectionObserver();
        
        // Настраиваем прогресс бар
        this.setupProgressBar();
        
        // Настраиваем индикаторы
        this.setupIndicators();
        
        // Настраиваем обработчик скролла
        this.setupScrollHandler();
        
        // Настраиваем адаптацию для мобильных
        this.setupMobileOptimization();
        
        console.log('✅ Speckdesign.com parallax initialized');
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const layerNumber = parseInt(entry.target.getAttribute('data-layer')) || 1;
                    
                    // Определяем направление скролла
                    const currentScrollY = window.scrollY;
                    this.scrollDirection = currentScrollY > this.lastScrollY ? 'down' : 'up';
                    this.lastScrollY = currentScrollY;
                    
                    // Меняем слой только если он отличается от текущего
                    if (layerNumber !== this.currentLayer) {
                        this.setLayer(layerNumber);
                    }
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '-50px 0px -50px 0px'
        });
        
        // Наблюдаем за всеми секциями с атрибутом data-layer
        this.sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    setupScrollHandler() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        // Также обновляем направление скролла при каждом скролле
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            this.scrollDirection = currentScrollY > this.lastScrollY ? 'down' : 'up';
            this.lastScrollY = currentScrollY;
        });
    }
    
    handleScroll() {
        // Определяем текущую позицию скролла
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        
        if (documentHeight === 0) return;
        
        const scrollPercentage = (scrollY / documentHeight) * 100;
        
        // На speckdesign.com смена слоев происходит на определенных процентах скролла
        let targetLayer = 1;
        
        if (scrollPercentage < 20) {
            targetLayer = 1;
        } else if (scrollPercentage < 40) {
            targetLayer = 2;
        } else if (scrollPercentage < 60) {
            targetLayer = 3;
        } else if (scrollPercentage < 80) {
            targetLayer = 4;
        } else {
            targetLayer = 4; // Последний слой остается до конца
        }
        
        // Ограничиваем слой количеством доступных слоев
        targetLayer = Math.min(targetLayer, this.totalLayers);
        
        // Меняем слой только если он изменился
        if (targetLayer !== this.currentLayer && !this.isAnimating) {
            this.setLayer(targetLayer);
        }
    }
    
    setLayer(layerNumber) {
        if (this.isAnimating || layerNumber === this.currentLayer) return;
        
        this.isAnimating = true;
        const previousLayer = this.currentLayer;
        this.currentLayer = layerNumber;
        
        console.log(`🔄 Changing layer: ${previousLayer} → ${layerNumber} (${this.scrollDirection})`);
        
        // Убираем active класс со всех слоев
        this.layers.forEach(layer => {
            layer.classList.remove('active');
        });
        
        // Убираем active класс со всех индикаторов
        this.indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Добавляем active класс к текущему слою
        const currentLayer = document.querySelector(`.layer-${layerNumber}`);
        if (currentLayer) {
            currentLayer.classList.add('active');
        }
        
        // Добавляем active класс к текущему индикатору
        const currentIndicator = document.querySelector(`.parallax-indicator[data-layer="${layerNumber}"]`);
        if (currentIndicator) {
            currentIndicator.classList.add('active');
        }
        
        // Сбрасываем флаг анимации
        setTimeout(() => {
            this.isAnimating = false;
        }, 1200);
    }
    
    setupProgressBar() {
        if (!this.progressBar) return;
        
        const updateProgress = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const progress = (scrollTop / documentHeight) * 100;
            
            this.progressBar.style.width = Math.min(progress, 100) + '%';
        };
        
        window.addEventListener('scroll', () => {
            window.requestAnimationFrame(updateProgress);
        });
    }
    
    setupIndicators() {
        this.indicators.forEach(indicator => {
            indicator.addEventListener('click', () => {
                const layerNumber = parseInt(indicator.getAttribute('data-layer')) || 1;
                this.scrollToLayer(layerNumber);
            });
        });
    }
    
    scrollToLayer(layerNumber) {
        const targetSection = document.querySelector(`[data-layer="${layerNumber}"]`);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
            this.setLayer(layerNumber);
        }
    }
    
    setupMobileOptimization() {
        if (window.innerWidth <= 768) {
            console.log('📱 Mobile device detected, optimizing...');
            
            // На мобильных убираем fixed attachment
            document.querySelectorAll('.parallax-bg').forEach(bg => {
                bg.style.backgroundAttachment = 'scroll';
            });
            
            // Упрощаем анимации
            this.layers.forEach(layer => {
                layer.style.transition = 'opacity 0.8s ease';
            });
        }
        
        // Обработчик изменения размера окна
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                document.querySelectorAll('.parallax-bg').forEach(bg => {
                    bg.style.backgroundAttachment = 'scroll';
                });
            } else {
                document.querySelectorAll('.parallax-bg').forEach(bg => {
                    bg.style.backgroundAttachment = 'fixed';
                });
            }
        });
    }
    
    // Очистка
    destroy() {
        this.layers.forEach(layer => {
            layer.classList.remove('active');
        });
        this.indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    
    if (parallaxLayers.length > 0) {
        try {
            window.speckParallax = new SpeckDesignParallax();
        } catch (error) {
            console.error('❌ Error initializing speckdesign parallax:', error);
            // Fallback: показываем только первый слой
            parallaxLayers.forEach((layer, index) => {
                if (index === 0) layer.classList.add('active');
                else layer.style.display = 'none';
            });
        }
    } else {
        console.warn('⚠️ No parallax layers found on the page');
    }
});

// Обработчик изменения размера окна
window.addEventListener('resize', function() {
    if (window.speckParallax) {
        window.speckParallax.setupMobileOptimization();
    }
});

// Экспорт для глобального доступа
window.SpeckDesignParallax = SpeckDesignParallax;

// ===== SIMPLE FALLBACK IMPLEMENTATION =====
// Простая реализация как на speckdesign.com
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        const layers = document.querySelectorAll('.parallax-layer');
        if (layers.length >= 4 && !window.speckParallax) {
            console.log('⚡ Using simple speckdesign.com fallback');
            
            let currentLayer = 1;
            let isAnimating = false;
            
            // Показываем только первый слой
            layers.forEach((layer, index) => {
                layer.style.opacity = index === 0 ? '1' : '0';
                layer.style.transition = 'opacity 1.2s ease-in-out';
                layer.style.zIndex = index === 0 ? '1' : '0';
            });
            
            function setLayer(newLayer) {
                if (isAnimating || newLayer === currentLayer || newLayer > layers.length) return;
                
                isAnimating = true;
                console.log(`🔄 Simple: Changing to layer ${newLayer}`);
                
                // Скрываем текущий слой
                const current = document.querySelector(`.layer-${currentLayer}`);
                if (current) {
                    current.style.opacity = '0';
                    current.style.zIndex = '0';
                }
                
                setTimeout(() => {
                    // Показываем новый слой
                    const next = document.querySelector(`.layer-${newLayer}`);
                    if (next) {
                        next.style.opacity = '1';
                        next.style.zIndex = '1';
                    }
                    
                    // Обновляем индикаторы
                    document.querySelectorAll('.parallax-indicator').forEach(indicator => {
                        indicator.classList.remove('active');
                    });
                    const indicator = document.querySelector(`.parallax-indicator[data-layer="${newLayer}"]`);
                    if (indicator) {
                        indicator.classList.add('active');
                    }
                    
                    currentLayer = newLayer;
                    
                    setTimeout(() => {
                        isAnimating = false;
                    }, 1200);
                }, 100);
            }
            
            // Смена слоев при скролле через секции
            const sections = document.querySelectorAll('[data-layer]');
            if (sections.length > 0) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const layerNumber = parseInt(entry.target.getAttribute('data-layer')) || 1;
                            setLayer(layerNumber);
                        }
                    });
                }, { threshold: 0.5 });
                
                sections.forEach(section => observer.observe(section));
            }
            
            // Навигация по индикаторам
            document.querySelectorAll('.parallax-indicator').forEach(indicator => {
                indicator.addEventListener('click', function() {
                    const layerNumber = parseInt(this.getAttribute('data-layer')) || 1;
                    const section = document.querySelector(`[data-layer="${layerNumber}"]`);
                    if (section) {
                        window.scrollTo({
                            top: section.offsetTop,
                            behavior: 'smooth'
                        });
                        setLayer(layerNumber);
                    }
                });
            });
            
            console.log(`✅ Simple speckdesign.com parallax initialized with ${layers.length} layers`);
        }
    }, 1500);
});

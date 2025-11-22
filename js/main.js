// Main JavaScript file - Common functionality across all pages

class NBGroupTech {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupSmoothScroll();
        this.setupHeaderScroll();
        this.setupCurrentPage();
        this.setupLanguageSupport();
        this.setupAnimations();
    }

    setupMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const mainNav = document.querySelector('.main-nav');
        const mobileOverlay = document.querySelector('.mobile-menu-overlay');
        const body = document.body;

        if (mobileToggle && mainNav) {
            const toggleMenu = () => {
                const isActive = mainNav.classList.contains('active');
                
                mobileToggle.classList.toggle('active');
                mainNav.classList.toggle('active');
                if (mobileOverlay) mobileOverlay.classList.toggle('active');
                body.style.overflow = isActive ? '' : 'hidden';
                
                // Блокируем скролл на мобильных
                if (!isActive) {
                    document.documentElement.style.overflow = 'hidden';
                } else {
                    document.documentElement.style.overflow = '';
                }
            };

            mobileToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleMenu();
            });

            // Закрытие при клике на ссылки
            const navLinks = mainNav.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    if (mobileOverlay) mobileOverlay.classList.remove('active');
                    body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                });
            });

            // Закрытие при клике на оверлей
            if (mobileOverlay) {
                mobileOverlay.addEventListener('click', () => {
                    mobileToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    mobileOverlay.classList.remove('active');
                    body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                });
            }

            // Закрытие при клике вне меню
            document.addEventListener('click', (e) => {
                if (!mainNav.contains(e.target) && !mobileToggle.contains(e.target) && mainNav.classList.contains('active')) {
                    mobileToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    if (mobileOverlay) mobileOverlay.classList.remove('active');
                    body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                }
            });

            // Закрытие при изменении ориентации
            window.addEventListener('orientationchange', () => {
                setTimeout(() => {
                    mobileToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    if (mobileOverlay) mobileOverlay.classList.remove('active');
                    body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                }, 300);
            });

            // Закрытие при ресайзе (на большие экраны)
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
                    mobileToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    if (mobileOverlay) mobileOverlay.classList.remove('active');
                    body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                }
            });
        }
    }

    setupSmoothScroll() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Обновляем URL без перезагрузки
                    history.pushState(null, null, targetId);
                }
            });
        });
    }

    setupHeaderScroll() {
        const header = document.querySelector('.main-header');
        
        if (header) {
            let lastScrollY = window.scrollY;
            let ticking = false;

            const updateHeader = () => {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                
                // Прячем/показываем header при скролле
                if (window.scrollY > lastScrollY && window.scrollY > 100) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
                
                lastScrollY = window.scrollY;
                ticking = false;
            };

            const requestTick = () => {
                if (!ticking) {
                    requestAnimationFrame(updateHeader);
                    ticking = true;
                }
            };

            window.addEventListener('scroll', requestTick, { passive: true });

            // Initialize scroll state
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            }
        }
    }

    setupCurrentPage() {
        // Highlight current page in navigation
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    setupLanguageSupport() {
        // Update when language changes
        window.addEventListener('languageChanged', (e) => {
            console.log('Language changed to:', e.detail.language);
            this.setupCurrentPage();
            this.updateLanguageSwitcher();
        });

        // Initialize language switcher
        this.setupLanguageSwitcher();
    }

    setupLanguageSwitcher() {
        const langButtons = document.querySelectorAll('.lang-btn');
        
        langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = btn.getAttribute('data-lang');
                if (window.i18n) {
                    window.i18n.changeLanguage(lang);
                    
                    // Dispatch custom event
                    window.dispatchEvent(new CustomEvent('languageChanged', {
                        detail: { language: lang }
                    }));
                }
            });
        });

        this.updateLanguageSwitcher();
    }

    updateLanguageSwitcher() {
        const langButtons = document.querySelectorAll('.lang-btn');
        const currentLang = window.i18n ? window.i18n.currentLang : 'ru';
        
        langButtons.forEach(btn => {
            const lang = btn.getAttribute('data-lang');
            if (lang === currentLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    setupAnimations() {
        // Initialize intersection observer for scroll animations
        this.setupScrollAnimations();
        
        // Initialize parallax effects
        this.setupParallax();
        
        // Initialize counter animations
        this.setupCounters();
    }

    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right');
        
        if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const delay = entry.target.getAttribute('data-delay') || 0;
                        
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0) translateX(0)';
                            entry.target.classList.add('animated');
                        }, parseInt(delay));
                        
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            animatedElements.forEach(el => {
                // Set initial state
                if (el.classList.contains('fade-in')) {
                    el.style.opacity = '0';
                } else if (el.classList.contains('slide-up')) {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(30px)';
                } else if (el.classList.contains('slide-left')) {
                    el.style.opacity = '0';
                    el.style.transform = 'translateX(-30px)';
                } else if (el.classList.contains('slide-right')) {
                    el.style.opacity = '0';
                    el.style.transform = 'translateX(30px)';
                }
                
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });
        }
    }

    setupParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length > 0) {
            const handleParallax = () => {
                const scrolled = window.pageYOffset;
                
                parallaxElements.forEach(el => {
                    const parallaxSpeed = parseFloat(el.getAttribute('data-parallax')) || 0.5;
                    const yPos = -(scrolled * parallaxSpeed);
                    el.style.transform = `translateY(${yPos}px)`;
                });
            };

            window.addEventListener('scroll', handleParallax, { passive: true });
        }
    }

    setupCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        if (counters.length > 0 && 'IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            counters.forEach(counter => observer.observe(counter));
        }
    }

    animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target') || counter.textContent);
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }

    // Utility function for loading components
    loadComponent(containerId, componentPath) {
        return fetch(componentPath)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.text();
            })
            .then(html => {
                document.getElementById(containerId).innerHTML = html;
                // Re-initialize functionality after loading components
                this.init();
            })
            .catch(error => {
                console.error('Error loading component:', error);
            });
    }

    // Form handling utility
    setupForm(formId, successCallback) {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                if (!this.validateForm(form)) {
                    return;
                }
                
                const formData = new FormData(form);
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                // Show loading state
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + (window.i18n ? window.i18n.t('contact.form.sending') : 'Sending...');
                submitBtn.disabled = true;
                
                try {
                    // Simulate form submission
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    
                    // Show success message
                    this.showNotification(
                        window.i18n ? window.i18n.t('contact.form.success') : 'Message sent successfully! We\'ll get back to you soon.', 
                        'success'
                    );
                    
                    // Reset form
                    form.reset();
                    
                    // Reset validation states
                    this.resetFormValidation(form);
                    
                    // Call success callback if provided
                    if (successCallback) successCallback();
                    
                } catch (error) {
                    this.showNotification(
                        window.i18n ? window.i18n.t('contact.form.error') : 'Error sending message. Please try again.', 
                        'error'
                    );
                } finally {
                    // Reset button state
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            });
            
            // Real-time validation
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => {
                    if (input.parentElement.classList.contains('invalid')) {
                        this.validateField(input);
                    }
                });
            });
        }
    }

    validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const formGroup = field.parentElement;
        
        // Clear previous validation states
        formGroup.classList.remove('valid', 'invalid');
        
        if (field.hasAttribute('required') && !value) {
            formGroup.classList.add('invalid');
            return false;
        }
        
        if (!value) return true;
        
        // Email validation
        if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(value)) {
                formGroup.classList.add('valid');
                return true;
            } else {
                formGroup.classList.add('invalid');
                return false;
            }
        }
        
        // Phone validation
        if (field.type === 'tel') {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;
            if (phoneRegex.test(value) && value.replace(/\D/g, '').length >= 10) {
                formGroup.classList.add('valid');
                return true;
            } else {
                formGroup.classList.add('invalid');
                return false;
            }
        }
        
        // Required field validation
        if (field.hasAttribute('required') && value) {
            formGroup.classList.add('valid');
            return true;
        }
        
        return true;
    }

    resetFormValidation(form) {
        const formGroups = form.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('valid', 'invalid', 'focused');
        });
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        });

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close" aria-label="Close notification">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 400px;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
    }

    // Utility for lazy loading images
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('img[data-src]');
            
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }

    // Handle page transitions
    setupPageTransitions() {
        // Add fade-in animation to main content
        const mainContent = document.querySelector('main') || document.body;
        mainContent.style.opacity = '0';
        mainContent.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            mainContent.style.opacity = '1';
        }, 100);
    }

    // Performance optimization
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.NBApp = new NBGroupTech();
    
    // Initialize page transitions
    window.NBApp.setupPageTransitions();
    
    // Initialize lazy loading
    window.NBApp.setupLazyLoading();
});

// Export for use in other files
window.initHeader = function() {
    if (window.NBApp) {
        window.NBApp.setupMobileMenu();
        window.NBApp.setupCurrentPage();
        window.NBApp.setupLanguageSupport();
    }
};

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && window.NBApp) {
        // Page became visible again
        window.NBApp.setupCurrentPage();
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

// Export the class for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NBGroupTech;
}

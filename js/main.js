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
    }

    setupMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const mainNav = document.querySelector('.main-nav');
        const body = document.body;

        if (mobileToggle && mainNav) {
            mobileToggle.addEventListener('click', () => {
                mobileToggle.classList.toggle('active');
                mainNav.classList.toggle('active');
                body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
            });

            // Close menu when clicking on nav links
            const navLinks = mainNav.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    body.style.overflow = '';
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mainNav.contains(e.target) && !mobileToggle.contains(e.target)) {
                    mobileToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    body.style.overflow = '';
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
                }
            });
        });
    }

    setupHeaderScroll() {
        const header = document.querySelector('.main-header');
        
        if (header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });

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
            if (linkHref === currentPage || (currentPage === 'index.html' && linkHref === 'index.html')) {
                link.classList.add('active');
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

    // Utility function for loading components
    loadComponent(containerId, componentPath) {
        return fetch(componentPath)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.text();
            })
            .then(html => {
                document.getElementById(containerId).innerHTML = html;
                // Re-initialize language support after loading components
                this.setupLanguageSupport();
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
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
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
            border-radius: 4px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 400px;
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
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.NBApp = new NBGroupTech();
});

// Export for use in other files
window.initHeader = function() {
    if (window.NBApp) {
        window.NBApp.setupMobileMenu();
        window.NBApp.setupCurrentPage();
        window.NBApp.setupLanguageSupport();
    }
};
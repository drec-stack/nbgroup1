// brandbook.js - Complete functionality for brandbook page
console.log('🎨 Brandbook page script loaded');

// Main initialization function
function initBrandbook() {
    console.log('🚀 Initializing brandbook functionality...');
    
    // Initialize all modules
    setupCaseStudies();
    setupFilterButtons();
    setupColorPalettes();
    setupAnimations();
    setupCopyFunctionality();
    
    // Setup mobile interactions
    setupMobileInteractions();
    
    console.log('✅ Brandbook functionality initialized');
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
                caseStudy.style.transform = 'translateY(-10px)';
                caseStudy.style.boxShadow = '0 25px 50px rgba(0, 102, 255, 0.15)';
            });
            
            caseStudy.addEventListener('mouseleave', () => {
                caseStudy.style.transform = 'translateY(0)';
                caseStudy.style.boxShadow = 'none';
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
        // Store original color
        const originalColor = item.style.backgroundColor;
        item.setAttribute('data-original-color', originalColor);
        
        // Add tooltip for desktop
        if (window.innerWidth > 768) {
            item.addEventListener('mouseenter', function() {
                const color = this.style.backgroundColor || this.getAttribute('title');
                this.setAttribute('title', rgbToHex(color));
            });
        }
    });
}

// Setup animations
function setupAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
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
        observer.observe(el);
    });
}

// Setup copy functionality
function setupCopyFunctionality() {
    const colorItems = document.querySelectorAll('.color-item');
    
    colorItems.forEach(item => {
        item.addEventListener('click', async function() {
            const color = this.style.backgroundColor || this.getAttribute('title');
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
            });
            
            el.addEventListener('touchend', function() {
                this.style.opacity = '1';
            });
        });
        
        // Smooth scroll for mobile
        document.documentElement.style.scrollBehavior = 'smooth';
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

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
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
    setTimeout(() => {
        initBrandbook();
    }, 100);
}

// Export functions for global use - УДАЛЕНА СТРОКА С export
window.initBrandbook = initBrandbook;
window.showNotification = showNotification;
window.rgbToHex = rgbToHex;

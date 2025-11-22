// Brandbook page specific JavaScript
console.log('Brandbook JS loaded');

function initBrandbook() {
    console.log('Initializing brandbook...');
    try {
        setupBrandCases();
        setupBrandAnimations();
        setupColorInteractions();
        console.log('Brandbook initialized successfully');
    } catch (error) {
        console.error('Error in initBrandbook:', error);
    }
}

function setupBrandCases() {
    const brandCases = document.querySelectorAll('.brand-case');
    console.log(`Found ${brandCases.length} brand cases`);
    
    brandCases.forEach((brandCase, index) => {
        // Add staggered animation delay
        brandCase.style.animationDelay = `${index * 0.1}s`;
        
        // Add hover effects
        brandCase.addEventListener('mouseenter', () => {
            const caseNumber = brandCase.querySelector('.case-number');
            if (caseNumber) {
                caseNumber.style.transform = 'scale(1.1)';
                caseNumber.style.background = 'var(--accent)';
                caseNumber.style.color = 'white';
            }
        });
        
        brandCase.addEventListener('mouseleave', () => {
            const caseNumber = brandCase.querySelector('.case-number');
            if (caseNumber) {
                caseNumber.style.transform = 'scale(1)';
                caseNumber.style.background = 'rgba(0, 102, 255, 0.1)';
                caseNumber.style.color = 'var(--accent)';
            }
        });
    });
}

function setupBrandAnimations() {
    // Animate brand cases on scroll
    const brandCases = document.querySelectorAll('.brand-case');
    if (brandCases.length > 0) {
        if (window.NBAnimations) {
            window.NBAnimations.staggerAnimation(brandCases, 200);
        } else {
            // Fallback animation
            brandCases.forEach((caseEl, index) => {
                caseEl.style.opacity = '0';
                caseEl.style.transform = 'translateY(30px)';
                setTimeout(() => {
                    caseEl.style.transition = 'all 0.6s ease-out';
                    caseEl.style.opacity = '1';
                    caseEl.style.transform = 'translateY(0)';
                }, index * 150);
            });
        }
    }
}

function setupColorInteractions() {
    const colorItems = document.querySelectorAll('.color-item');
    console.log(`Found ${colorItems.length} color items`);
    
    colorItems.forEach(colorItem => {
        colorItem.addEventListener('click', () => {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            const rect = colorItem.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = '0';
            ripple.style.top = '0';
            
            colorItem.style.position = 'relative';
            colorItem.style.overflow = 'hidden';
            colorItem.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                if (colorItem.contains(ripple)) {
                    colorItem.removeChild(ripple);
                }
            }, 600);
        });
    });
}

// Add custom animations to styles
function addBrandbookAnimations() {
    if (!document.querySelector('#brandbook-animations')) {
        const style = document.createElement('style');
        style.id = 'brandbook-animations';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2.5);
                    opacity: 0;
                }
            }
            
            @keyframes brandCaseAppear {
                from {
                    opacity: 0;
                    transform: translateY(30px) scale(0.95);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            
            .brand-case {
                animation: brandCaseAppear 0.8s ease-out forwards;
                opacity: 0;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, setting up brandbook...');
    addBrandbookAnimations();
    
    // Wait a bit for other scripts to load
    setTimeout(() => {
        if (typeof initBrandbook === 'function') {
            initBrandbook();
        }
    }, 100);
});

// Export for global access
window.initBrandbook = initBrandbook;

// Auto-initialize if script loads after DOM is ready
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    setTimeout(initBrandbook, 100);
}

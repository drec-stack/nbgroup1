// Brandbook page specific JavaScript
function initBrandbook() {
    setupBrandCases();
    setupBrandAnimations();
    setupColorInteractions();
    setupProcessInteractions();
}

function setupBrandCases() {
    const brandCases = document.querySelectorAll('.brand-case');
    
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
    if (brandCases.length > 0 && window.NBAnimations) {
        window.NBAnimations.staggerAnimation(brandCases, 200);
    }
    
    // Animate process steps
    const processSteps = document.querySelectorAll('.process-step');
    if (processSteps.length > 0 && window.NBAnimations) {
        window.NBAnimations.staggerAnimation(processSteps, 150);
    }
    
    // Animate benefit cards
    const benefitCards = document.querySelectorAll('.benefit-card');
    if (benefitCards.length > 0 && window.NBAnimations) {
        window.NBAnimations.staggerAnimation(benefitCards, 100);
    }
    
    // Animate intro stats
    const introStats = document.querySelectorAll('.intro-stat');
    if (introStats.length > 0 && window.NBAnimations) {
        window.NBAnimations.staggerAnimation(introStats, 120);
    }
}

function setupColorInteractions() {
    const colorItems = document.querySelectorAll('.color-item');
    
    colorItems.forEach(colorItem => {
        // Get color from class name
        const getColorFromClass = (element) => {
            const classes = Array.from(element.classList);
            const colorClass = classes.find(cls => 
                !cls.includes('color-item') && 
                !cls.includes('brand-element') &&
                cls !== 'case-elements'
            );
            
            if (colorClass) {
                // Convert class name to readable format
                return colorClass.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            }
            return 'Color';
        };

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
            
            // Show color value tooltip
            const colorName = getColorFromClass(colorItem);
            showColorTooltip(colorItem, colorName);
            
            // Remove ripple after animation
            setTimeout(() => {
                if (colorItem.contains(ripple)) {
                    colorItem.removeChild(ripple);
                }
            }, 600);
        });
        
        // Show color on hover
        colorItem.addEventListener('mouseenter', () => {
            const colorName = getColorFromClass(colorItem);
            showColorTooltip(colorItem, colorName);
        });
        
        colorItem.addEventListener('mouseleave', () => {
            hideColorTooltip();
        });
    });
}

function showColorTooltip(element, colorName) {
    hideColorTooltip(); // Remove existing tooltip
    
    const tooltip = document.createElement('div');
    tooltip.className = 'color-tooltip';
    tooltip.textContent = colorName;
    tooltip.style.position = 'absolute';
    tooltip.style.background = 'var(--primary)';
    tooltip.style.color = 'var(--text)';
    tooltip.style.padding = '8px 12px';
    tooltip.style.borderRadius = '6px';
    tooltip.style.fontSize = '12px';
    tooltip.style.fontWeight = '600';
    tooltip.style.border = '1px solid var(--border)';
    tooltip.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    tooltip.style.zIndex = '1000';
    tooltip.style.whiteSpace = 'nowrap';
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + 'px';
    tooltip.style.top = (rect.top - 40) + 'px';
    
    document.body.appendChild(tooltip);
    
    // Store reference for removal
    element._colorTooltip = tooltip;
}

function hideColorTooltip() {
    const existingTooltip = document.querySelector('.color-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }
}

function setupProcessInteractions() {
    const processSteps = document.querySelectorAll('.process-step');
    
    processSteps.forEach(step => {
        step.addEventListener('mouseenter', () => {
            const number = step.querySelector('.step-number');
            if (number) {
                number.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });
        
        step.addEventListener('mouseleave', () => {
            const number = step.querySelector('.step-number');
            if (number) {
                number.style.transform = 'scale(1) rotate(0deg)';
            }
        });
        
        // Click to highlight
        step.addEventListener('click', () => {
            processSteps.forEach(s => s.classList.remove('active'));
            step.classList.add('active');
            
            // Add pulse animation
            step.style.animation = 'pulse 0.6s ease';
            setTimeout(() => {
                step.style.animation = '';
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
            
            .process-step.active {
                border-color: var(--accent);
                background: rgba(0, 102, 255, 0.05);
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    addBrandbookAnimations();
    initBrandbook();
});

// Handle page transitions
function handlePageLoad() {
    const brandCases = document.querySelectorAll('.brand-case');
    brandCases.forEach((caseEl, index) => {
        caseEl.style.animationDelay = `${index * 0.15}s`;
    });
}

// Export for global access
window.initBrandbook = initBrandbook;
window.handleBrandbookLoad = handlePageLoad;

// Initialize on window load
window.addEventListener('load', handlePageLoad);
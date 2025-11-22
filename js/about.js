// About page specific JavaScript
function initAbout() {
    setupTeamInteractions();
    setupValueAnimations();
    setupStoryScroll();
}

function setupTeamInteractions() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', () => {
            const photo = member.querySelector('.member-photo');
            const bio = member.querySelector('.member-bio');
            
            if (photo) {
                photo.style.transform = 'scale(1.1)';
                photo.style.transition = 'transform 0.3s ease';
            }
            
            if (bio) {
                bio.style.opacity = '1';
                bio.style.transform = 'translateY(0)';
            }
        });
        
        member.addEventListener('mouseleave', () => {
            const photo = member.querySelector('.member-photo');
            const bio = member.querySelector('.member-bio');
            
            if (photo) {
                photo.style.transform = 'scale(1)';
            }
            
            if (bio) {
                bio.style.opacity = '0.9';
                bio.style.transform = 'translateY(10px)';
            }
        });
    });
}

function setupValueAnimations() {
    const valueCards = document.querySelectorAll('.value-card');
    
    valueCards.forEach((card, index) => {
        // Staggered entrance animation
        setTimeout(() => {
            card.classList.add('revealed');
        }, index * 200);
        
        // Hover effects
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.value-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.value-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
        });
    });
}

function setupStoryScroll() {
    const storySection = document.querySelector('.our-story');
    const storyStats = document.querySelectorAll('.story-stat');
    
    if (storySection && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate stats when story section comes into view
                    storyStats.forEach((stat, index) => {
                        setTimeout(() => {
                            stat.classList.add('animated');
                        }, index * 300);
                    });
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(storySection);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initAbout();
});

// Export for global access
window.initAbout = initAbout;



document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initAOS();
    initSmoothScroll();
    initParallax();
    initChatBubbleAnimations();
});

/**
 * Custom AOS (Animate On Scroll) Implementation
 */
function initAOS() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.aosDelay || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, parseInt(delay));
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
        el.style.transitionDuration = '0.6s';
        el.style.transitionTimingFunction = 'cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
}

/**
 * Smooth Scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Parallax effect for hero section
 */
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        
        if (scrolled < window.innerHeight) {
            hero.style.backgroundPositionY = `${rate}px`;
        }
    }, { passive: true });
}

/**
 * Staggered animation for chat bubbles
 */
function initChatBubbleAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bubbles = entry.target.querySelectorAll('.chat-bubble');
                bubbles.forEach((bubble, index) => {
                    bubble.style.opacity = '0';
                    bubble.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        bubble.style.transition = 'all 0.4s ease';
                        bubble.style.opacity = '1';
                        bubble.style.transform = 'translateY(0)';
                    }, 200 + (index * 150));
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.phone-chat').forEach(chat => {
        observer.observe(chat);
    });
}

/**
 * Modal Functions
 */
function openModal(type) {
    const modalId = type + 'Modal';
    const modal = document.getElementById(modalId);
    
    if (modal) {
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Show modal with animation
        modal.style.display = 'flex';
        requestAnimationFrame(() => {
            modal.classList.add('active');
        });
        
        // Close on backdrop click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(type);
            }
        });
        
        // Close on ESC key
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closeModal(type);
                document.removeEventListener('keydown', escHandler);
            }
        });
    }
}

function closeModal(type) {
    const modalId = type + 'Modal';
    const modal = document.getElementById(modalId);
    
    if (modal) {
        modal.classList.remove('active');
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }
}

// Make modal functions globally available
window.openModal = openModal;
window.closeModal = closeModal;

/**
 * Counter Animation for Statistics (if needed in future)
 */
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
}

/**
 * Lazy Loading Images
 */
function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

/**
 * Debounce utility function
 */
function debounce(func, wait) {
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

/**
 * Add hover effects to cards with mouse tracking
 */
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.problem-card, .curriculum-card, .target-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// Initialize hover effects after DOM load
document.addEventListener('DOMContentLoaded', initCardHoverEffects);

/**
 * Track scroll position and toggle fixed CTA visibility
 * (Currently always visible as per requirement, but keeping for future use)
 */
function initScrollTracker() {
    const fixedCTA = document.querySelector('.fixed-cta');
    if (!fixedCTA) return;
    
    // Always visible - no scroll-based toggling needed
    fixedCTA.style.opacity = '1';
    fixedCTA.style.visibility = 'visible';
}

// Initialize scroll tracker
document.addEventListener('DOMContentLoaded', initScrollTracker);

/**
 * Add ripple effect to buttons
 */
function initRippleEffect() {
    const buttons = document.querySelectorAll('.hero-cta, .secondary-cta, .final-cta-btn, .fixed-cta-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = button.getBoundingClientRect();
            const ripple = document.createElement('span');
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple keyframes if not exists
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize ripple effect
document.addEventListener('DOMContentLoaded', initRippleEffect);

/**
 * Console Easter Egg
 */
console.log('%c제1원리 투자 입문', 'font-size: 24px; font-weight: bold; color: #0A3D3A;');
console.log('%c투자의 순서를 바로잡을 시간입니다.', 'font-size: 14px; color: #B08B59;');

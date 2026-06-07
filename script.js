// Detect Mobile Device
const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           window.innerWidth <= 768;
};

// Page Loader
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.classList.add('fade-out');
    }, 1500);
});

// Custom Cursor (Desktop only)
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

// Only enable cursor on non-touch devices
if (!isMobile() && cursor && follower) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        }, 100);
    });

    document.querySelectorAll('a, button, .glass-card, .btn').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            follower.style.width = '50px';
            follower.style.height = '50px';
            follower.style.borderColor = 'var(--accent-color)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            follower.style.width = '30px';
            follower.style.height = '30px';
            follower.style.borderColor = 'rgba(0, 240, 255, 0.5)';
        });
    });
}

// Typing Animation
const texts = [
    "Hafiz-ul-Quran",
    "Future Software Engineer",
    "AI Technology Learner",
    "Creative Web Developer",
    "Digital Entrepreneur",
    "Modern Tech Student"
];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";
const typingElement = document.querySelector('.typing-text');

function type() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++index);
    
    typingElement.textContent = letter;
    
    if (letter.length === currentText.length) {
        setTimeout(() => {
            index = 0;
            count++;
            type();
        }, 2000);
    } else {
        setTimeout(type, 100);
    }
}
setTimeout(type, 2000);

// Scroll Progress
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollPx = document.documentElement.scrollTop;
    const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = `${scrollPx / winHeightPx * 100}%`;
    scrollProgress.style.width = scrolled;
    
    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (scrollPx > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

document.querySelector('.back-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Mobile Navigation with Touch Support
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li a');

// Hamburger click handler
if(hamburger) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    // Touch support
    hamburger.addEventListener('touchend', (e) => {
        e.preventDefault();
        toggleMobileMenu();
    });
}

function toggleMobileMenu() {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if(navLinks.classList.contains('active')){
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        document.body.style.overflow = 'auto';
    }
}

// Close menu when clicking on a link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if(hamburger.querySelector('i')) {
            hamburger.querySelector('i').classList.remove('fa-times');
            hamburger.querySelector('i').classList.add('fa-bars');
        }
        document.body.style.overflow = 'auto';
    });
    
    // Touch support for links
    item.addEventListener('touchend', () => {
        navLinks.classList.remove('active');
        if(hamburger.querySelector('i')) {
            hamburger.querySelector('i').classList.remove('fa-times');
            hamburger.querySelector('i').classList.add('fa-bars');
        }
        document.body.style.overflow = 'auto';
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if(navLinks.classList.contains('active') && 
       !navLinks.contains(e.target) && 
       e.target !== hamburger && 
       !hamburger.contains(e.target)) {
        navLinks.classList.remove('active');
        if(hamburger.querySelector('i')) {
            hamburger.querySelector('i').classList.remove('fa-times');
            hamburger.querySelector('i').classList.add('fa-bars');
        }
        document.body.style.overflow = 'auto';
    }
});

// Reveal Animation on Scroll
const reveals = document.querySelectorAll('.reveal');
function reveal() {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;
    
    reveals.forEach(revealEl => {
        const elementTop = revealEl.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            revealEl.classList.add('active');
            
            // Animate progress bars if inside skill card
            if(revealEl.classList.contains('skill-card')) {
                const progress = revealEl.querySelector('.progress');
                if(progress) {
                    progress.style.width = progress.getAttribute('data-width');
                }
            }
        }
    });
}
window.addEventListener('scroll', reveal);
reveal(); // Trigger on load

// Progress bar animation: animate each .progress when it scrolls into view
const progressBars = document.querySelectorAll('.progress');
if (progressBars.length) {
    const progressObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width') || bar.dataset.width || '0%';
                // apply width to show the colored bar
                requestAnimationFrame(() => {
                    bar.style.width = width;
                });
                bar.classList.add('animated');
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.25 });

    progressBars.forEach(bar => progressObserver.observe(bar));
}

// Handle window resize for responsive adjustments
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && navLinks) {
            navLinks.classList.remove('active');
            if(hamburger && hamburger.querySelector('i')) {
                hamburger.querySelector('i').classList.remove('fa-times');
                hamburger.querySelector('i').classList.add('fa-bars');
            }
            document.body.style.overflow = 'auto';
        }
        
        // Adjust for orientation change on mobile
        if (isMobile()) {
            // Re-calculate mobile-specific layouts if needed
            const mobileMenu = document.querySelector('.nav-links.active');
            if(mobileMenu) {
                mobileMenu.style.height = window.innerHeight + 'px';
            }
        }
    }, 250);
});

// Prevent zoom on double tap
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Optimize for touch devices
if (isMobile()) {
    // Reduce animation complexity on mobile
    document.documentElement.style.setProperty('--transition', 'all 0.3s ease');
    
    // Improve touch targets
    const buttons = document.querySelectorAll('a, button, .btn');
    buttons.forEach(btn => {
        if (btn.offsetHeight < 44) {
            btn.style.minHeight = '44px';
            btn.style.display = 'flex';
            btn.style.alignItems = 'center';
            btn.style.justifyContent = 'center';
        }
    });
}

// Particles.js Config
particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 80,
            "density": { "enable": true, "value_area": 800 }
        },
        "color": { "value": ["#00f0ff", "#7000ff", "#ffffff"] },
        "shape": {
            "type": "circle",
            "stroke": { "width": 0, "color": "#000000" },
            "polygon": { "nb_sides": 5 }
        },
        "opacity": {
            "value": 0.5,
            "random": true,
            "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": { "enable": true, "speed": 2, "size_min": 0.1, "sync": false }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#00f0ff",
            "opacity": 0.2,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": { "enable": true, "mode": "grab" },
            "onclick": { "enable": true, "mode": "push" },
            "resize": true
        },
        "modes": {
            "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } },
            "push": { "particles_nb": 4 }
        }
    },
    "retina_detect": true
});

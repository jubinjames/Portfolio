document.addEventListener('DOMContentLoaded', () => {
    // Scroll Indicator & Sticky Navigation
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Intersection Observer for scroll animations (Fade-ins)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Triggers when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // Stop observing once it has appeared
            }
        });
    }, observerOptions);

    // Apply fade-in class to major sections and observe them
    const sectionsToAnimate = document.querySelectorAll('.glass-card, .section-title, .skills-category, .timeline-item');
    
    sectionsToAnimate.forEach(el => {
        el.classList.add('fade-in'); // Add base class for animation
        observer.observe(el);
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('.nav-links a[href^="#"], .hero-buttons a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Adjust for fixed nav height
                const navHeight = nav.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mouse movement interaction on background blobs (Subtle parallax)
    const bgAnimation = document.querySelector('.bg-animation');
    
    if (bgAnimation) {
         document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            // Move background slightly in opposite direction
            bgAnimation.style.transform = `translate(-${x * 20}px, -${y * 20}px)`;
        });
    }
});

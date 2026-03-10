document.addEventListener('DOMContentLoaded', () => {
    // Scroll Indicator & Sticky Navigation & Progress Bar
    const nav = document.querySelector('nav');
    const progressBar = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
        // Sticky Nav
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Scroll Progress Bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
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
    const sectionsToAnimate = document.querySelectorAll('.glass-card, .section-title, .skills-category, .timeline-item, .project-item, .cert-item');

    sectionsToAnimate.forEach((el, index) => {
        el.classList.add('fade-in');
        // Add subtle stagger to items that are likely grouped
        if (el.classList.contains('project-item') || el.classList.contains('cert-item') || el.classList.contains('timeline-item')) {
            el.style.transitionDelay = `${(index % 4) * 0.15}s`;
        }
        observer.observe(el);
    });

    // Animate skill tags and tool cards with a pop-in effect
    const popInElements = document.querySelectorAll('.skill-tag, .tool-card');
    popInElements.forEach((el, index) => {
        el.classList.add('pop-in');
        el.style.transitionDelay = `${(index % 10) * 0.05}s`;
        observer.observe(el);
    });


    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('.nav-links a[href^="#"], .hero-buttons a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Typing Effect Animation
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");

    const textArray = ["Security Analyst.", "Linux Administrator.", "Penetration Tester.", "Tech Enthusiast."];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (!typedTextSpan) return;
        if (charIndex < textArray[textArrayIndex].length) {
            if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (!typedTextSpan) return;
        if (charIndex > 0) {
            if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    // Start the typing effect
    if (textArray.length) {
        setTimeout(type, 1500); // Wait a bit before starting the typing effect (after hero fade-up)
    }

    // Initialize 3D Tilt Effect on major cards
    // The library must be loaded via CDN in index.html first.
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".glass-card, .tool-card, .project-item"), {
            max: 90,           // max tilt rotation (deg)
            speed: 400,        // Speed of the enter/exit transition
            glare: true,       // if it should have a "glare" effect
            "max-glare": 0.2,  // the maximum "glare" opacity
            scale: 1.02,       // scale up slightly on hover
            perspective: 1000  // Transform perspective, lower = more extreme
        });
    }

});

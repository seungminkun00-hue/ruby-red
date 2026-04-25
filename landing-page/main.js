document.addEventListener('DOMContentLoaded', () => {
    // 1. Reveal on Scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active-reveal');
            }
        });
    }, observerOptions);

    const elementsToReveal = document.querySelectorAll('.reveal-text, .reveal-up, .bento-item');
    elementsToReveal.forEach(el => revealObserver.observe(el));

    // 2. Initial Hero Animation
    setTimeout(() => {
        document.querySelectorAll('.hero-section .reveal-text').forEach(el => {
            el.classList.add('active-reveal');
        });
    }, 100);

    // 3. Scroll Interactions (Parallax & Zoom)
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        // Hero Image Subtle Tilt
        const heroImg = document.querySelector('.main-device-img');
        if (heroImg) {
            heroImg.style.transform = `rotateX(${10 - scrolled * 0.02}deg) translateY(${scrolled * 0.1}px)`;
        }

        // Vision Section Image Zoom
        const zoomImg = document.querySelector('.zoom-img');
        if (zoomImg) {
            const rect = zoomImg.parentElement.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const fraction = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                const scale = 1.1 + (fraction * 0.2);
                zoomImg.style.transform = `scale(${scale})`;
            }
        }

        // Parallax Section
        const parallaxImg = document.querySelector('.parallax-img');
        if (parallaxImg) {
            const rect = parallaxImg.parentElement.getBoundingClientRect();
            const offset = (window.innerHeight / 2 - rect.top) * 0.1;
            parallaxImg.style.transform = `translateY(${offset}px) rotate(${offset * 0.2}deg)`;
        }

        // Navbar Background change
        const navbar = document.getElementById('navbar');
        if (scrolled > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        } else {
            navbar.style.background = 'rgba(22, 22, 23, 0.8)';
        }
    });

    // 4. Smooth Scrolling for Nav Links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.hash !== "") {
                e.preventDefault();
                const target = document.querySelector(this.hash);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 52,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // ==== Navbar Scroll Effect ====
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ==== Intersection Observer for Fade-In Animations ====
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the animation class
                entry.target.classList.add('animate-in');
                // Unobserve the element so it doesn't run again backwards
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Grab all elements with hidden-element class
    const hiddenElements = document.querySelectorAll('.hidden-element');
    hiddenElements.forEach(el => observer.observe(el));

    // ==== Mockup Interactions ====
    const mockupInput = document.querySelector('.mockup-search input');
    const mockupBtn = document.querySelector('.mockup-btn');
    const typeWriterText = "https://youtube.com/watch?v=grabber_rocks";

    // Simulate typing in the mockup when it comes into view
    const mockupObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.typed) {
                entry.target.dataset.typed = "true";
                typeWriterEffect(mockupInput, typeWriterText, 0);
            }
        });
    }, { threshold: 0.5 });
    
    const mockupContainer = document.querySelector('.app-mockup');
    if (mockupContainer) {
        mockupObserver.observe(mockupContainer);
    }

    function typeWriterEffect(element, text, i) {
        if (i < text.length) {
            element.value += text.charAt(i);
            setTimeout(() => typeWriterEffect(element, text, i + 1), 50);
        } else {
            // Once typing is done, simulate click
            setTimeout(() => {
                mockupBtn.style.color = "var(--app-success)";
                setTimeout(() => mockupBtn.style.color = "", 300);
            }, 500);
        }
    }
});

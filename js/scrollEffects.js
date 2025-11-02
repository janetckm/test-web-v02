document.addEventListener('DOMContentLoaded', () => {
    // Initialize Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    // Store scroll position
    let scrollY = window.scrollY;
    
    // Scroll handler for X-axis movement
    function handleScroll() {
        const newScrollY = window.scrollY;
        const scrollDelta = (newScrollY - scrollY) * 0.5; // Reduce sensitivity
        scrollY = newScrollY;
        
        // Move shapes based on scroll direction
        document.querySelectorAll('.dynamic-shape').forEach((shape, index) => {
            // Get current transform values
            const style = window.getComputedStyle(shape);
            const matrix = new DOMMatrix(style.transform);
            const currentX = parseFloat(shape.getAttribute('data-x') || '0');
            
            // Calculate new X position with easing
            const targetX = currentX + (scrollDelta * (0.1 + (index % 3) * 0.1));
            const boundedX = Math.max(-40, Math.min(40, targetX)); // Keep within bounds
            
            // Apply smooth movement using transform
            const currentTransform = style.transform;
            const baseTransform = currentTransform.includes('matrix') 
                ? currentTransform.replace(/matrix\([^)]+\)/, '') 
                : currentTransform;
                
            shape.style.transform = `translateX(${boundedX}px) ${baseTransform}`;
            shape.setAttribute('data-x', boundedX);
        });
        
        requestAnimationFrame(handleScroll);
    }
    
    // Start the scroll animation loop
    requestAnimationFrame(handleScroll);

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    // Observe all class cards
    document.querySelectorAll('.class-card').forEach(card => {
        observer.observe(card);
    });

    // Parallax effect on mouse move
    document.querySelectorAll('.class-card').forEach(card => {
        const imageContainer = card.querySelector('.class-image');
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate percentage position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const moveX = (x - centerX) / 20;
            const moveY = (y - centerY) / 20;
            
            // Apply transform to shapes if they exist
            const shapes = card.querySelectorAll('.shape');
            if (shapes.length > 0) {
                if (shapes[0]) shapes[0].style.transform = `translate(${-40 + moveX * 0.5}px, ${-40 + moveY * 0.5}px) scale(1.1) translateZ(-30px)`;
                if (shapes[1]) shapes[1].style.transform = `translate(${30 + moveX * 0.3}px, ${-30 + moveY * 0.3}px) scale(0.9) translateZ(-10px)`;
                if (shapes[2]) shapes[2].style.transform = `rotate(45deg) translate(${moveX * 0.2}px, ${moveY * 0.2}px) translateZ(-20px)`;
            }
            
            // Slight movement for the main image if it exists
            const img = card.querySelector('.class-img');
            if (img) {
                img.style.transform = `translate(${moveX * 0.2}px, ${moveY * 0.2}px) scale(1.05) translateZ(20px)`;
            }
        });
        
        // Reset on mouse leave
        card.addEventListener('mouseleave', () => {
            const shapes = card.querySelectorAll('.shape');
            if (shapes.length > 0) {
                if (shapes[0]) shapes[0].style.transform = 'translate(-40px, -40px) scale(1.1) translateZ(-30px)';
                if (shapes[1]) shapes[1].style.transform = 'translate(30px, -30px) scale(0.9) translateZ(-10px)';
                if (shapes[2]) shapes[2].style.transform = 'rotate(45deg) translateZ(-20px)';
            }
            
            const img = card.querySelector('.class-img');
            if (img) {
                img.style.transform = 'scale(1.05) translateY(-5px) translateZ(20px)';
            }
        });
    });
});

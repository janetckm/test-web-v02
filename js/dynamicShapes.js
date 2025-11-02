// Configuration
const SHAPES_PER_CARD = 5; // Number of shapes per card
const SHAPE_TYPES = ['circle', 'blob', 'triangle', 'square', 'diamond'];

// Vibrant color palette with higher opacity
const COLOR_PALETTE = [
    'rgba(70, 150, 247, 0.3)',    // Bright Blue
    'rgba(100, 220, 255, 0.3)',   // Sky Blue
    'rgba(0, 200, 255, 0.3)',     // Cyan
    'rgba(0, 255, 200, 0.3)',     // Turquoise
    'rgba(0, 255, 100, 0.3)',     // Mint
    'rgba(150, 255, 0, 0.3)',     // Lime
    'rgba(255, 230, 0, 0.3)',     // Yellow
    'rgba(255, 150, 0, 0.3)',     // Orange
    'rgba(255, 80, 80, 0.3)',     // Coral
    'rgba(255, 0, 150, 0.3)',     // Pink
    'rgba(200, 0, 255, 0.3)',     // Purple
    'rgba(100, 0, 255, 0.3)'      // Violet
];

// Function to get a random color with higher opacity for better visibility
function getRandomColor() {
    // Base color from the palette
    const baseColor = COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
    
    // Extract RGB values and increase opacity
    const colorMatch = baseColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (!colorMatch) return baseColor;
    
    const r = parseInt(colorMatch[1]);
    const g = parseInt(colorMatch[2]);
    const b = parseInt(colorMatch[3]);
    const opacity = Math.min(0.5, Math.max(0.2, Math.random() * 0.5)); // Keep opacity between 0.2 and 0.5
    
    // Slightly adjust the color for more variation
    const adjust = (value, amount) => Math.max(0, Math.min(255, value + (Math.random() * amount * 2 - amount)));
    const r2 = Math.round(adjust(r, 40));
    const g2 = Math.round(adjust(g, 40));
    const b2 = Math.round(adjust(b, 40));
    
    return `rgba(${r2}, ${g2}, ${b2}, ${opacity})`;
}

// Generate random number within range
function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

// Create a blob shape using border-radius
function createBlobShape(size) {
    const shape = document.createElement('div');
    shape.className = 'dynamic-shape';
    const borderRadius = [
        `${randomInRange(30, 70)}% ${randomInRange(30, 70)}%`,
        `${randomInRange(30, 70)}% ${randomInRange(30, 70)}%`,
        `${randomInRange(30, 70)}% ${randomInRange(30, 70)}%`,
        `${randomInRange(30, 70)}% ${randomInRange(30, 70)}%`
    ].join(' / ');  
    
    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;
    shape.style.borderRadius = borderRadius;
    // Apply gradient background for more visual interest
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    shape.style.background = `linear-gradient(135deg, ${color1}, ${color2})`;
    shape.style.mixBlendMode = 'overlay';
    
    return shape;
}

// Create a triangle shape using borders
function createTriangleShape(size) {
    const shape = document.createElement('div');
    shape.className = 'dynamic-shape';
    shape.style.width = '0';
    shape.style.height = '0';
    shape.style.background = 'transparent';
    shape.style.borderLeft = `${size/2}px solid transparent`;
    shape.style.borderRight = `${size/2}px solid transparent`;
    shape.style.borderBottom = `${size}px solid ${getRandomColor()}`;
    
    // Random rotation
    shape.style.transform = `rotate(${randomInRange(0, 360)}deg)`;
    
    return shape;
}

// Create a square shape
function createSquareShape(size) {
    const shape = document.createElement('div');
    shape.className = 'dynamic-shape';
    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;
    // Apply gradient background for more visual interest
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    shape.style.background = `linear-gradient(135deg, ${color1}, ${color2})`;
    shape.style.mixBlendMode = 'overlay';
    shape.style.transform = `rotate(${randomInRange(0, 45)}deg)`;
    return shape;
}

// Create a diamond shape
function createDiamondShape(size) {
    const shape = document.createElement('div');
    shape.className = 'dynamic-shape';
    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;
    // Apply gradient background for more visual interest
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    shape.style.background = `linear-gradient(135deg, ${color1}, ${color2})`;
    shape.style.mixBlendMode = 'overlay';
    shape.style.transform = 'rotate(45deg)';
    return shape;
}

// Create a circle shape
function createCircleShape(size) {
    const shape = document.createElement('div');
    shape.className = 'dynamic-shape';
    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;
    shape.style.borderRadius = '50%';
    // Apply gradient background for more visual interest
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    shape.style.background = `linear-gradient(135deg, ${color1}, ${color2})`;
    shape.style.mixBlendMode = 'overlay';
    return shape;
}

// Create a random shape
function createRandomShape() {
    const size = randomInRange(50, 200);
    const type = SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)];
    
    switch(type) {
        case 'blob':
            return createBlobShape(size);
        case 'triangle':
            return createTriangleShape(size);
        case 'square':
            return createSquareShape(size);
        case 'diamond':
            return createDiamondShape(size);
        case 'circle':
        default:
            return createCircleShape(size);
    }
}

// Position and animate shapes
function setupShape(shape, container) {
    const containerRect = container.getBoundingClientRect();
    const size = randomInRange(40, 150);
    
    // Random position within container
    const posX = randomInRange(-30, containerRect.width - size + 30);
    const posY = randomInRange(-30, containerRect.height - size + 30);
    
    // Random rotation and scale
    const rotation = randomInRange(0, 360);
    const scale = randomInRange(0.8, 1.2);
    
    // Animation properties
    const floatDistance = randomInRange(10, 30);
    const floatDuration = randomInRange(8, 15);
    const floatDelay = randomInRange(0, 5);
    
    // Set initial position and styles
    shape.style.position = 'absolute';
    shape.style.left = `${posX}px`;
    shape.style.top = `${posY}px`;
    shape.style.opacity = '0';
    shape.style.willChange = 'transform, opacity';
    shape.style.transition = 'opacity 0.5s ease-out, transform 0.3s ease-out';
    
    // Add to container
    container.appendChild(shape);
    
    // Trigger reflow to enable animation
    void shape.offsetWidth;
    
    // Fade in
    shape.style.opacity = '0.6';
    
    // Apply initial transform
    shape.style.transform = `translateX(0) translateY(0) rotate(${rotation}deg) scale(${scale})`;
    
    // Add floating animation
    const animationName = `float-${Math.floor(Math.random() * 1000)}`;
    const floatAnimation = `
        @keyframes ${animationName} {
            0%, 100% { 
                transform: translateX(0) translateY(0) rotate(${rotation}deg) scale(${scale});
                opacity: 0.6;
            }
            50% { 
                transform: translateX(${floatDistance * 0.5}px) translateY(-${floatDistance}px) rotate(${rotation + 10}deg) scale(${scale * 1.1});
                opacity: 0.8;
            }
        }
    `;
    
    // Add keyframes to the document
    const style = document.createElement('style');
    style.innerHTML = floatAnimation;
    document.head.appendChild(style);
    
    // Apply animation
    shape.style.animation = `${animationName} ${floatDuration}s ease-in-out ${floatDelay}s infinite`;
    
    return shape;
}

// Initialize shapes for each class card
function initShapes() {
    const classCards = document.querySelectorAll('.class-card');
    
    classCards.forEach(card => {
        const container = card.querySelector('.class-image');
        if (!container) return;
        
        // Remove any existing shapes
        const existingShapes = container.querySelectorAll('.dynamic-shape');
        existingShapes.forEach(shape => shape.remove());
        
        // Create new shapes
        for (let i = 0; i < SHAPES_PER_CARD; i++) {
            const shape = createRandomShape();
            setupShape(shape, container);
        }
    });
}

// Reinitialize shapes on window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        initShapes();
    }, 250);
});

// Initialize shapes when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initShapes();
});

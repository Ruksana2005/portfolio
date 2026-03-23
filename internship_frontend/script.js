// Mock Products Data
const products = [
    {
        id: 1,
        name: "Minimalist Watch X",
        price: 199.00,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Lumina Wireless Earbuds",
        price: 129.00,
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Classic Sunglasses",
        price: 89.00,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "Leather Wallet Pro",
        price: 59.00,
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        name: "Everyday Backpack",
        price: 149.00,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        name: "Premium Desk Mat",
        price: 39.00,
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 7,
        name: "Noise-Cancelling Headphones",
        price: 299.00,
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
    
];

// State
let cart = [];

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const cartSidebar = document.getElementById('cart-sidebar');
const overlay = document.getElementById('overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartBadge = document.getElementById('cart-badge');
const cartTotalPrice = document.getElementById('cart-total-price');
const navbar = document.getElementById('navbar');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupCartToggle();
    setupNavbarScroll();
});

// Render Products
function renderProducts() {
    productsGrid.innerHTML = '';
    products.forEach((product, index) => {
        const delay = index * 0.1;
        
        const card = document.createElement('div');
        card.className = 'product-card fade-up';
        card.style.animationDelay = `${delay}s`;
        
        card.innerHTML = `
            <div class="product-image-wrapper">
                <img src="${product.image}" loading="lazy" alt="${product.name}">
                <div class="product-actions">
                    <button class="btn btn-primary btn-full add-to-cart-btn" data-id="${product.id}">
                        <i class="ph ph-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="icon-btn btn-secondary"><i class="ph ph-heart"></i></button>
                </div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-rating">
                    <span class="rating-badge">4.5 <i class="ph-fill ph-star"></i></span>
                    <span class="rating-count">(2,345)</span>
                    <span style="color: #2874f0; font-weight: 700; font-style: italic; font-size: 0.8rem; margin-left: 5px;">Assured</span>
                </div>
                <div class="price-container">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <span class="original-price">$${(product.price * 1.5).toFixed(2)}</span>
                    <span class="discount-percent">33% off</span>
                </div>
            </div>
        `;
        
        productsGrid.appendChild(card);
    });

    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.getAttribute('data-id'));
            addToCart(id);
            // Visual feedback loop
            const icon = e.currentTarget.querySelector('i');
            icon.className = 'ph ph-check';
            setTimeout(() => { icon.className = 'ph ph-shopping-cart'; }, 1000);
        });
    });
}

// Navbar Scroll Effect
function setupNavbarScroll() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Cart Sidebar Toggle
function setupCartToggle() {
    cartBtn.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);
    overlay.addEventListener('click', toggleCart);
}

function toggleCart() {
    cartSidebar.classList.toggle('open');
    overlay.classList.toggle('active');
    
    // Disable body scroll when sidebar is open
    if (cartSidebar.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Add Item to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
    
    // Add pop animation to badge
    cartBadge.style.transform = 'scale(1.5)';
    setTimeout(() => { cartBadge.style.transform = 'scale(1)'; }, 200);
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Update Cart User Interface
function updateCartUI() {
    // Update Badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;
    
    // Update Items List
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Your cart is empty.</div>';
    } else {
        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
            const el = document.createElement('div');
            el.className = 'cart-item';
            el.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <span class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</span>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(el);
        });
    }
    
    // Update Total Price
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
}

// ==========================================
// Theme Toggling Logic
// ==========================================
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
        themeIcon.className = 'ph ph-sun';
    } else {
        themeIcon.className = 'ph ph-moon';
    }
}

// Add Theme Event Listeners dynamically if button exists
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
}

// Initialize on execution
initTheme();

// ==========================================
// Hero Slider Logic
// ==========================================
const sliderContainer = document.getElementById('slider-container');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prev-slide');
const nextBtn = document.getElementById('next-slide');
const dotsContainer = document.getElementById('slider-dots');

let currentSlide = 0;
let slideInterval;

function initSlider() {
    if (!sliderContainer || slides.length === 0) return;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetInterval();
        });
        dotsContainer.appendChild(dot);
    });

    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });
    }

    startInterval();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

function updateSlider() {
    if (!sliderContainer) return;
    // Since width is 200% for 2 slides, we translate by chunks of 50% relative to container size
    sliderContainer.style.transform = `translateX(-${currentSlide * 50}%)`;
    
    // Update dots
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
}

function startInterval() {
    slideInterval = setInterval(nextSlide, 5000);
}

function resetInterval() {
    clearInterval(slideInterval);
    startInterval();
}

document.addEventListener('DOMContentLoaded', initSlider);

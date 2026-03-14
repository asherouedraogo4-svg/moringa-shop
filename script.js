// Product data
const products = [
    {
        id: 1,
        name: 'Baume Moringa',
        price: 750,
        image: 'image1.jpeg',
        description: 'Baume naturel apaisant pour les douleurs'
    },
    {
        id: 2,
        name: 'Savon Moringa',
        price: 1000,
        image: 'image3.jpeg',
        description: 'Savon hydratant contre les imperfections cutanes'
    },
    {
        id: 3,
        name: 'Poudre Moringa 1kg',
        price: 10000,
        image: 'image5.jpg',
        description: 'Poudre pure 100% naturelle (1kg)'
    },
    {
        id: 4,
        name: 'Pommade Corps Moringa',
        price: 1000,
        image: 'image2.jpeg',
        description: 'Pommade nourrissante pour tout le corps'
    }
];

let cart = [];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    updateCartIcon();
    
    // Modal functionality
    const cartModal = document.getElementById('cartModal');
    const cartIcon = document.getElementById('cartIcon');
    const closeModal = document.querySelector('.close');
    const checkoutBtn = document.getElementById('checkoutBtn');

    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'block';
        renderCart();
    });

    closeModal.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Votre panier est vide !');
            return;
        }
        alert('Merci pour votre commande ! (Simulation - Paiement à implémenter)');
        cart = [];
        renderCart();
        updateCartIcon();
        cartModal.style.display = 'none';
    });
});

function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="price">${product.price.toLocaleString()} FCFA</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Ajouter au panier
                </button>
            </div>
        </div>
    `).join('');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartIcon();
    showNotification(`${product.name} ajouté au panier !`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    renderCart();
    updateCartIcon();
}

function updateCartIcon() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Votre panier est vide.</p>';
        cartTotal.textContent = '0 FCFA';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <strong>${item.name}</strong> - ${item.quantity}x
            </div>
            <div>
                ${(item.price * item.quantity).toLocaleString()} FCFA
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    Supprimer
                </button>
            </div>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `${total.toLocaleString()} FCFA`;
}

function showNotification(message) {
    // Simple notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}


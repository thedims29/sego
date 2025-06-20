document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    function updateCartCount() {
        const cart = localStorage.getItem('cart');
        const cartItems = cart ? JSON.parse(cart) : [];
        const cartCountElements = document.querySelectorAll('#cart-count');
        cartCountElements.forEach(el => {
            el.textContent = `(${cartItems.reduce((acc, item) => acc + item.quantity, 0)})`;
        });
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = button.getAttribute('data-price');
            const image = button.getAttribute('data-image');

            // Get existing cart from localStorage or initialize empty array
            let cart = localStorage.getItem('cart');
            cart = cart ? JSON.parse(cart) : [];

            // Check if item already exists in cart
            const existingItemIndex = cart.findIndex(item => item.name === name);
            if (existingItemIndex !== -1) {
                // Increase quantity if item exists
                cart[existingItemIndex].quantity += 1;
            } else {
                // Add new item with quantity 1
                cart.push({ name, price, image, quantity: 1 });
            }

            // Save updated cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Update cart count in header
            updateCartCount();

            // Show notification instead of navigating
            alert(`Pesanan "${name}" telah ditambahkan ke keranjang.`);
        });
    });

    // Initial update of cart count on page load
    updateCartCount();
});

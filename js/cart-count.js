// Cart count update script
document.addEventListener('DOMContentLoaded', () => {
    function updateCartCount() {
        const cart = localStorage.getItem('cart');
        const cartItems = cart ? JSON.parse(cart) : [];
        const cartCountElements = document.querySelectorAll('#cart-count');
        cartCountElements.forEach(el => {
            el.textContent = `(${cartItems.length})`;
        });
    }
    updateCartCount();
});

document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');
    const clearCartButton = document.getElementById('clear-cart');
    const orderNowButton = document.getElementById('order-now');

    function renderCart() {
        let cart = localStorage.getItem('cart');
        cart = cart ? JSON.parse(cart) : [];

        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Keranjang kosong.</p>';
            cartTotalContainer.textContent = '';
            return;
        }

        cart.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            
            // Create image element
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.name;
            img.style.width = '100px';
            img.style.height = 'auto';
            img.style.marginRight = '10px';
            img.style.verticalAlign = 'middle';

            // Create text span
            const textSpan = document.createElement('span');
            textSpan.textContent = `${item.name} - Rp ${item.price}`;

            // Create quantity controls
            const quantityDiv = document.createElement('div');
            quantityDiv.style.display = 'inline-block';
            quantityDiv.style.marginLeft = '20px';

            const minusButton = document.createElement('button');
            minusButton.textContent = '-';
            minusButton.style.marginRight = '5px';

            const quantitySpan = document.createElement('span');
            quantitySpan.textContent = item.quantity;

            const plusButton = document.createElement('button');
            plusButton.textContent = '+';
            plusButton.style.marginLeft = '5px';

            quantityDiv.appendChild(minusButton);
            quantityDiv.appendChild(quantitySpan);
            quantityDiv.appendChild(plusButton);

            // Append image, text, and quantity controls to itemDiv
            itemDiv.appendChild(img);
            itemDiv.appendChild(textSpan);
            itemDiv.appendChild(quantityDiv);

            cartItemsContainer.appendChild(itemDiv);

            total += parseInt(item.price, 10) * item.quantity;

            // Event listeners for quantity buttons
            minusButton.addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    quantitySpan.textContent = item.quantity;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCart();
                }
            });

            plusButton.addEventListener('click', () => {
                item.quantity += 1;
                quantitySpan.textContent = item.quantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            });
        });

        cartTotalContainer.textContent = `Total: Rp ${total}`;
    }

    clearCartButton.addEventListener('click', () => {
        localStorage.removeItem('cart');
        renderCart();
    });

    orderNowButton.addEventListener('click', () => {
        let cart = localStorage.getItem('cart');
        cart = cart ? JSON.parse(cart) : [];

        if (cart.length === 0) {
            alert('Keranjang kosong. Tambahkan menu terlebih dahulu.');
            return;
        }

        let message = 'Halo, saya mau pesan Sego Gampil Patitik:%0A';
        cart.forEach(item => {
            message += `- ${item.name} (x${item.quantity}) - Rp ${item.price * item.quantity}%0A`;
        });

        const whatsappUrl = `https://wa.me/6281234567890?text=${message}`;
        window.open(whatsappUrl, '_blank');
    });

    renderCart();
});

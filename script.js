// Tambahkan event listener ke setiap tombol "Tambah ke Keranjang"
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', function() {
    const product = this.closest('.product');
    const productName = product.querySelector('h3').innerText;

    // Ambil item yang sudah ada di localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Periksa apakah produk sudah ada di keranjang
    const productExists = cart.some(item => item.name === productName);

    if (productExists) {
      alert(`${productName} sudah ada di keranjang.`);
    } else {
      // Tambahkan produk ke keranjang
      cart.push({ name: productName });
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${productName} telah ditambahkan ke keranjang.`);
    }
  });
});

// Muat item ke halaman keranjang
window.addEventListener('load', function() {
  const cartItemsList = document.querySelector('.cart-items');
  if (cartItemsList) { 
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.forEach(item => { // item diambil dari cart list
      const li = document.createElement('li');
      li.textContent = `${item.name}`;
      cartItemsList.appendChild(li);
    });
  }

  // Tombol untuk mengosongkan keranjang
  const clearCartButton = document.querySelector('.clear-cart');
  if (clearCartButton) {
    clearCartButton.addEventListener('click', function() { // jika tombol "kosongkan keranjang" ditekan, fungsi akan berjalan
      localStorage.removeItem('cart'); 
      alert('Keranjang telah dikosongkan.');
      window.location.reload();
    });
  }
});

// Tombol Pesan Sekarang mengarahkan ke WhatsApp
document.querySelector('.order-now').addEventListener('click', function() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  // justifikasi kalau keranjang harus terisi jika ingin memesan barang
  if (cart.length === 0) {
    alert('Keranjang Anda kosong. Tambahkan beberapa produk sebelum memesan.');
    return;
  }

  // pesan untuk dikirim ke WhatsApp
  let message = 'Halo, saya ingin memesan produk berikut:\n';
  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.name}\n`;
  });

  // Nomor WhatsApp tujuan 
  const phoneNumber = '6281380040356'; 

  // URL WhatsApp
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  window.location.href = whatsappURL;
});

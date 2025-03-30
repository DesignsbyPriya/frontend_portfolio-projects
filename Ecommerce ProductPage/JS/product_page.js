function addToCart(){
    // Get selected size and color 
    const size = document.getElementById("size");
    const color = document.getElementById("color");

    // Display COnfirmation message
    const message = `Added to cart: Women's Floral Maxi Dress - Size: ${size}, Color: ${color}`;
    document.getElementById('cart-message').innerText = message;

    // Clear message after 3 seconds
    setTimeout(() => {
      document.getElementById('cart-message').innerText = '';
    }, 3000);
}
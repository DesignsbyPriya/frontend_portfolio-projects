// Add to cart function
function addToCart(){
  // Get selected size and color
  const size = document.getElementById('size').value;
  const color = document.getElementById('color').value;
  
  // check if size and color are selected
  if(size === "" || color === ""){
     document.getElementById('cart-message').innerText = "Please select size and color before adding to cart.";
     document.getElementById('cart-message').style.color = "#e74c3c";
     return;
  }

  // Display confirmation message
  const message = `Added to cart: Elegant Velvet Evening Gown - Size: ${size}, Color: ${color}`;
  document.getElementById('cart-message').innerText = message;
  document.getElementById('cart-message').style.color = "#27ae60";

  // Clear message after 3 seconds
  setTimeout(() => {
     document.getElementById('cart-message').innerText = '';
  }, 3000);
}
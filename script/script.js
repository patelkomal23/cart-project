let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartTable = document.getElementById("cartTable");
let cartSidebar = document.getElementById("cartSidebar");
let cartIcon = document.getElementById("cartIcon");
let closeCart = document.getElementById("closeCart");

// Function to display cart items
let displayCart = () => {
    cartTable.innerHTML = "";
    cart.forEach((item, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td><button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">❌</button></td>
        `;
        cartTable.appendChild(row);
    });
};

// Add to Cart Function
let addToCart = (name, price) => {
    let items = cart.find(item => item.name === name);
    if (items) {
        items.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
};

// Remove Item from Cart
let removeFromCart = (index) => {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
};

// Toggle Sidebar
cartIcon.addEventListener("click", () => {
    cartSidebar.style.transform = "translateX(0)";
    displayCart();
});
closeCart.addEventListener("click", () => {
    cartSidebar.style.transform = "translateX(100%)";
});

// Attach Event Listeners to Add to Cart Buttons
document.querySelectorAll(".btn-outline-warning").forEach(button => {
    button.addEventListener("click", function () {
        let card = this.closest(".card");
        let name = card.querySelector(".card-title").innerText;
        let price = card.querySelector("span").innerText;
        addToCart(name, price);
    });
});

// Initialize Cart Display
displayCart();

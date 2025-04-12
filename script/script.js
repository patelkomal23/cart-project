let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.querySelectorAll(".add-card").forEach(btn => {
    btn.addEventListener("click", () => {
        const card = btn.closest(".card");
        const name = card.querySelector(".card-title").innerText;
        const price = card.querySelector("span").innerText;
        const img = card.querySelector("img").src;

        const item = cart.find(i => i.name === name);

        if (item) {
            item.qty += 1;
        } else {
            cart.push({ name, price, img, qty: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        showCart(); 
    });
});


function showCart() {
    const cartTable = document.getElementById("cartTable");
    cartTable.innerHTML = "";

    cart.forEach((item, index) => {
        cartTable.innerHTML += `
            <tr>
                <td><img src="${item.img}" width="40"><br>${item.name}</td>
                <td>${item.qty}</td>
                <td>${item.price}</td>
                <td><button onclick="removeItem(${index})" class="btn btn-sm btn-danger">x</button></td>
            </tr>
        `;
    });
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    showCart();
}

showCart();

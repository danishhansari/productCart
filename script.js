const addToCartBtns = document.querySelectorAll(".add-to-cart");
const productCart = document.querySelector(".product-cart");
const totalDiv = document.querySelector(".total span");
const clearCart = document.querySelector('.clear-cart')
let total = 0;

window.addEventListener("load", load);
function load() {
  addToCartBtns.forEach((item) => {
    item.addEventListener("click", addToCart);
  });
  const quantities = document.querySelectorAll(".cart-quantity input");
  quantities.forEach((item) => {
    item.addEventListener("change", quantityChange);
  });
}

function removeItem(event) {
  let elem = event.target;
  elem = elem.parentElement.parentElement.parentElement;
  console.log(elem.querySelector('.cart-price').textContent);
  let price = elem.querySelector('.cart-price').textContent;
  price = Number(price.replace('$', ''))
  total -= price;
  elem = elem.remove();
  // console.log(elem);
  totalScore()
}
function quantityChange(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
}

function addToCart(event) {
  let btn = event.target;
  let parentDiv = btn.parentElement.parentElement;
  let productName = parentDiv.querySelector(".product-name").textContent;
  let productImage = parentDiv.querySelector("img").src;
  let productPrice = parentDiv.querySelector(".price ").textContent;
  productPrice = productPrice.replace("$", "");
  productPrice = parseFloat(productPrice);
  total += productPrice;
  totalScore()
  displayCart(productName, productImage, productPrice);
  let cartInput = document.querySelectorAll(".cart-quantity input");
  cartInput.forEach((item) => {
    item.addEventListener("input", quantityChange);
  });
  const removeBtns = document.querySelectorAll(".remove-cart");
  removeBtns.forEach((item) => {
    item.addEventListener("click", removeItem);
  });
}

function displayCart(productName, productImage, productPrice) {
  let elem = document.createElement("div");
  elem.innerHTML = `
    <div class="item w-full md:w-[70%] mx-auto flex justify-between items-center flex-wrap">
        <div class="img-title flex justify-between items-center gap-6 flex-col md:flex-row">
            <img src="${productImage}"
                class="w-[100px]" alt="">
            <p class="cart-name text-2xl">${productName}</p>
        </div>
        <div class="cart-price text-2xl">$${productPrice.toFixed(2)}</div>
        <div class="cart-quantity text-2xl flex flex-row gap-2">
            <input type="number" placeholder="Quantity" value="1" class="w-full focus:outline-none border-2 border-black/50 py-1 px-2 rounded-lg quantity">
            <button class="bg-red-500 text-md px-2 py-1 text-white rounded-lg hover:bg-red-600 remove-cart">Remove</button>

        </div>
  </div>
    `;
  elem.classList.add(
    "product-item",
    "w-full",
    "my-4",
    "border-b-2",
    "border-black/50",
    "pb-4"
  );
  productCart.appendChild(elem);
}
function totalScore() {
  totalDiv.textContent = `$${total}`;
}

clearCart.addEventListener('click', () => {
  const productItems = document.querySelectorAll('.product-item')
  productItems.forEach((item) => {
    item.remove();
  })
  total = 0;
  totalScore()
})
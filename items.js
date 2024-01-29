let data;

async function productData () {
  try
  {
    const response = await fetch("data.json");
    if (!response.ok) {
      throw new Error('Мы не можем считать данные!');
    }
    data = await response.json();
    console.log(data);

    const container = document.querySelector('.products_cards');
    for (const [id] of Object.keys(data)) {
      const productCard = 
      `
        <div class="product_card">
          <img src="${data[id].img}" class="product-image" alt="product1">
          <a href="./product.html"><h3>${data[id].name}</h3></a>
          <div class="card_description">
            <p class="description">${data[id].desc}</p>
          </div>
          <p class="price">${data[id].price}</p>
          <p>${id}</p>
        </div>       
      `
      container.insertAdjacentHTML("beforeend", productCard);

      const button = document.createElement("button");
      button.textContent = "Добавить в корзину";
      button.addEventListener("click", function () {
        addProductToCart(id);
      })
      container.lastElementChild.appendChild(button);
      
      
    };
        
  }
  catch (error) {
    console.error(error);
  }

}


productData();

function addProductToCart(productId) {
  
  // Получить корзину.
  const cart = document.querySelector(".cart");
  
  const card =
  `
    <div class="product_card">
        <img src="${data[productId].img}" class="product-image" alt="product1">
        <a href="./product.html"><h3>${data[productId].name}</h3></a>
        <p class="price">${data[productId].price}</p>
        <p>${productId}</p>
    </div>
  `;
  // Добавить карточку товара в корзину.
  cart.insertAdjacentHTML("beforeend", card);

  const button = document.createElement("button");
      button.textContent = "Удалить";
      button.addEventListener("click", function () {
        // removeProductFromCart(productId);
        button.parentElement.remove();
      })
      cart.lastElementChild.appendChild(button);
}

if (cart.children.length === 0) {
  cart.style.display = "none";
}

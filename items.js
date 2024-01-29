async function productData () {
    try
    {
        const response = await fetch("data.json");
        if (!response.ok) {
            throw new Error('Мы не можем считать данные!');
        }
        const data = await response.json();
        // console.log(data);

        const container = document.querySelector('.products_cards');
        data.forEach(({img, name, desc, price}) => {
            const productCard = 
            `
                    <div class="product_card">
                        <img src="${img}" class="product-image" alt="product1">
                        <a href="./product.html"><h3>${name}</h3></a>
                        <div class="card_description">
                            <p class="description">${desc}</p>
                        </div>
                        <p class="price">${price}</p>
                        
                    </div>
                    
            `
            container.insertAdjacentHTML("beforeend", productCard);
            const AddToCartBtn = document.createElement("button");
            AddToCartBtn.classList.add("add_to_cart");
            container.insertAdjacentHTML("beforeend", AddToCartBtn);

            AddToCartBtn.addEventListener("click", function(event) {
              addProductToCart(event, {name, price,img});
            });

        })}
        catch (error) {
        console.error(error);
    }
}

productData();


function addProductToCart(product) {
  // Получаем данные о товаре
  const name = product.name;
  const price = product.price;
  const img = product.img;

  // Добавляем товар в корзину
  const cart = document.querySelector(".cart");
  const productItem = `
    <div class="product_item">
      <img src="${img}" class="product-image" alt="product1">
      <h3>${name}</h3>
      <p class="price">${price}</p>
      <button class="remove_from_cart">Удалить</button>
    </div>
  `;
  // cart.insertAdjacentHTML("beforeend", productItem);
  cart.appendChild(productItem);
}

// Добавляем событие click к кнопке "Добавить в корзину"
document.querySelectorAll(".product_card").forEach((card) => {
  card.querySelector(".add_to_cart").addEventListener("click", () => {
    const product = {
      name: card.querySelector(".product_name").textContent,
      price: card.querySelector(".product_price").textContent,
      img: card.querySelector(".product_image").src,
    };
    addProductToCart(product);
  });
});

function removeProductFromCart(product) {
  // Получаем элемент с классом ".product_item"
  const productItem = document.querySelector(`.product_item[data-product-id="${product.id}"]`);

  // Удаляем элемент из корзины
  productItem.remove();
}

// Добавляем событие click к кнопке "Удалить"
document.querySelectorAll(".cart").forEach((cart) => {
  cart.querySelectorAll(".remove_from_cart").forEach((button) => {
    button.addEventListener("click", () => {
      const product = {
        id: button.dataset.productId,
      };
      removeProductFromCart(product);
    });
  });
});

if (cart.children.length === 0) {
  cart.style.display = "none";
}

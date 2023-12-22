async function productData () {
    try
    {
        const response = await fetch("data.json");
        if (!response.ok) {
            throw new Error('Мы не можем считать данные!');
        }
        const data = await response.json();
        console.log(data);

        const container = document.querySelector('.products_cards');
        data.forEach(({img, name, desc, price}) => {
            const productCard = 
            `
                    <div class="product_card">
                        <img src="${img}" alt="product1">
                        <a href="./product.html"><h3>${name}</h3></a>
                        <div class="card_description">
                            <p class="description">${desc}</p>
                        </div>
                        <p class="price">${price}</p>
                    </div>
            `
            container.insertAdjacentHTML("beforeend", productCard);
        });

    } catch (error) {
        console.error(error);
    }
}

productData();
const menu = () => {

    const sectionHeading = document.querySelector('.section-heading');
    const cardsMenu = document.querySelector('.cards-menu');
    let cartArr = []; // массив с данными заказа


    // ============== FUNCTIONS ==============================================

    const getCartItems = () => {
        cartArr = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    };

    const addToCart = (obj) => {
        getCartItems();
            
        if (cartArr.some(item => item.id === obj.id)) {
            //count add 1
            cartArr.map((item => {
                if (item.id === obj.id) { item.count ++; }
                return item;
            }));
        } else { cartArr.push(obj); }

        localStorage.setItem('cart', JSON.stringify(cartArr));
    };

    function renderItems(data, heading) {
        // Рендер заголовка
        const {name, stars, price, kitchen} = heading;

        const cardHeading = document.createElement('div');
        cardHeading.classList.add('section-heading');
        cardHeading.innerHTML = `
            <h2 class="section-title restaurant-title">${name}</h2>
            <div class="card-info">
                <div class="rating">
                    ${stars}
                </div>
                <div class="price">От ${price} ₽</div>
                <div class="category">${kitchen}</div>
            </div>
        `;
        // Добавляем разметку на страницу
        sectionHeading.append(cardHeading);
        
        // Рендер карточек меню
        data.forEach((item) => {
            const {id, name, description, price, image} = item;
            const card = document.createElement('div');
            card.classList.add("card");
            card.dataset.id = id;
            card.innerHTML = `
                <img src=${image} alt=${name} class="card-image" />
                <div class="card-text">
                    <div class="card-heading">
                        <h3 class="card-title card-title-reg">${name}</h3>
                    </div>
                    <div class="card-info">
                        <div class="ingredients">${description}
                        </div>
                    </div>
                    <div class="card-buttons">
                        <button class="button button-primary button-add-cart">
                            <span class="button-card-text">В корзину</span>
                            <span class="button-cart-svg"></span>
                        </button>
                        <strong class="card-price-bold">${price} ₽</strong>
                    </div>
                </div>
            `;
            cardsMenu.append(card);

            card.querySelector('.button-add-cart').addEventListener('click', () => {
                addToCart({id, name, price, count: 1});
            });

        });
    }


    // ============== ON LOAD ================================================

    if (localStorage.getItem('restaraunt')) {
        // если есть данные по ресторану
        const restaurant = JSON.parse(localStorage.getItem('restaraunt'));

        fetch(`./db/${restaurant.products}`)
        .then(response => response.json())
        .then(data => renderItems(data, restaurant))
        .catch(error => console.log(error));
    } else {
        // иначе возвращаем на главную страницу
        window.location.href = '/';
    }

    


};
menu();
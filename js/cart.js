const cart = () => {

  // ============== VARIABLES =================================
  const modalCart = document.querySelector('.modal-cart'); // окно корзины
  const modalBody = document.querySelector('.modal-body'); // блок с заказами
  const sendBtn = document.getElementById('button-send');
  const openModalBtn = document.getElementById("cart-button");
  const closeModalBtn = document.querySelector('.close');
  const clearCartBtn = document.querySelector('.clear-cart');
  const priceTag = document.querySelector('.modal-pricetag');
  
  // ============== FUNCTIONS =================================

  const openModalCart = () => {
    modalCart.classList.add('is-open');
    renderCart();
  };

  const closeModalCart = () => {
    modalCart.classList.remove('is-open');
  };

  const clearCart = () => {
    localStorage.removeItem('cart');
    closeModalCart();
  };

  const changeCounter = (e) => {
        
    const classListName = e.target.classList[1];
    const id = e.target.dataset.id;

    const cartArr = getCartItems();

    cartArr.map((item => {
        if (item.id === id) { 
          if (classListName === 'btn-inc') {item.count ++;}
          else { item.count > 0 ? -- item.count: item.count = 0;}
          return item;
        }
    }));

    localStorage.setItem('cart', JSON.stringify(cartArr));
    renderCart();
  };

  // Получаем массив с данными корзины
  const getCartItems = () => localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

  // Рисуем товары в корзине
  const renderCart = () => {
    // Получаем массив заказов
    const cartArr = getCartItems();
    
    const footerBtns = document.querySelector('.modal-footer');

    if (cartArr.length === 0) {
      modalBody.innerHTML = 'Отсутствует список товаров';
      footerBtns.classList.add("hide"); } 
    else {
      footerBtns.classList.remove("hide");
      let orderPrice = 0;
      // чистим старую верстку
      modalBody.innerHTML = '';
      // рисуем новую верстку
      cartArr.forEach(item => {

        const {id, name, price, count} = item;
        
        const foodRow = document.createElement('div');
        foodRow.classList.add('food-row');
        foodRow.innerHTML = `
          <span class="food-name">${name}</span>
          <strong class="food-price">${price} ₽</strong>
          <div class="food-counter">
            <button class="counter-button btn-dec" data-id = ${id}>-</button>
            <span class="counter">${count}</span>
            <button class="counter-button btn-inc" data-id = ${id}>+</button>
          </div>
        `;
        modalBody.append(foodRow);
        // расчет суммы заказа
        orderPrice += Number(price * count);
      });

      // отслеживаем нажатие кнопок изменения количества единиц товара
      const foodCounters = document.querySelectorAll('.food-counter');
      foodCounters.forEach(counter => counter.addEventListener('click', (e) => changeCounter(e)));
      // отрисовываем сумму заказа
      priceTag.textContent = `${orderPrice} ₽`;
    }
   
  };

//   Отправляем данные заказа на сервер
  const sendOrder = () => {
      const cartArr = getCartItems();
      fetch('https://jsonplaceholder.typicode.com/posts', {
            method: "POST",
            body: cartArr
        })
        .then(responce => {
            if (responce.ok) {
                alert("Данные успено отправлены");
                clearCart();
            } 
        })
        .catch (e => {
            closeModalCart();
            alert(`Возникла ошибка при отправке данных. ${e}`);
        });
  };
  // ============== ON LOAD ==================================

  renderCart();

  // ============== LISTENERS =================================

  openModalBtn.addEventListener('click', openModalCart);
  closeModalBtn.addEventListener('click', closeModalCart);
  clearCartBtn.addEventListener('click', clearCart);
  sendBtn.addEventListener('click', sendOrder);

  // закрываем окно корзины при клике в области кроме окна
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) { closeModalCart(); }
  });





};
cart();


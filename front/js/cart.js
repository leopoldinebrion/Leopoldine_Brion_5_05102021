basket = JSON.parse(localStorage.getItem('basket')) || [];

//fonction qui va parcourir chaque elt du localstorage et injecter ds le DOM ses elts

basket.forEach(element => { 

    const parent = document.getElementById('cart__items');
    
         const totalPrice = element.price * element.quantity;

        parent.innerHTML += `<article class="cart__item" data-id="${element.id}">
        <div class="cart__item__img">
        <img src="${element.imgSrc}" alt="${element.imgAlt}">
        </div>
        <div class="cart__item__content">
        <div class="cart__item__content__titlePrice">
        <h2>${element.name}</h2>
        <p >${element.color}</p>
        <p>${totalPrice}€</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${element.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
    </article>` 
        
    //quantité totale articles
    const reducer = (previousValue, currentValue) => previousValue.quantity + currentValue.quantity;
    const getTotalQuantity = basket.reduce(reducer)
    document.getElementById("totalQuantity").innerHTML = getTotalQuantity;

    //prix total articles
    const reducerPrice = (previousValue, currentValue) => (previousValue.price * previousValue.quantity) + (currentValue.price * currentValue.quantity);
    const getTotalPrice = basket.reduce(reducerPrice)
    document.getElementById('totalPrice').innerHTML = getTotalPrice;


});

function modififyQuantity(basket) {
 const id = document.getElementsByClassName('itemQuantity');

};

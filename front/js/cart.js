basket = JSON.parse(localStorage.getItem('basket'));

//fonction qui va parcourir chaque elt du localstorage et injecter ds le DOM ses elts

basket.forEach(element => { 

    const parent = document.getElementById('cart__items');
    
    //si le panier/localstorage est vide
    if(basket === null){
        const emptyCart = document.createElement('p');
        emptyCart.innerHTML = "Votre panier est vide";
        parent.appendChild(emptyCart);
    }
    else {

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
           
    /**
            const article = document.createElement('article');
            parent.appendChild(article);
            article.className = 'cart_item';
            article.setAttribute("data-id", element.id);

            
            const divImg = document.createElement('div');
            article.appendChild(divImg);
            divImg.className = "cart__item__img";
            
            const img = document.createElement('img');
            divImg.appendChild(img);
            

            const divCartItemContent = document.createElement('div');
            divCartItemContent.className = 'cart__item__content';
            article.appendChild(divCartItemContent);

            debugger
            const divCartItemTitlePrice = document.createElement('div');
            divCartItemTitlePrice.className = 'cart__item__content__titlePrice';
            divCartItemContent.appendChild(divCartItemTitlePrice);

            const name = document.createElement('h2');
            name.innerHTML = element.name;
            divCartItemTitlePrice.appendChild(name);

            const price = document.createElement('p');
            const totalPrice = element.price * element.quantity;
            price.innerHTML = totalPrice + "€";
            divCartItemTitlePrice.appendChild(price);

            const color = document.createElement('p');
            color.innerHTML = element.color;
            divCartItemTitlePrice.appendChild(color);

            const divCartItemSettings = document.createElement('div');
            divCartItemTitlePrice.className = 'cart__item__content__settings';
            divCartItemContent.appendChild(divCartItemSettings);

            const divQuantity = document.createElement('div');
            divQuantity.className = "cart__item__content__settings__quantity";
            divCartItemSettings.appendChild(divQuantity);

            const quantity = document.createElement('p');
            quantity.innerHTML = "Qté";
            divQuantity.appendChild(quantity);

            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.className = "itemQuantity";
            quantityInput.name = "itemQuantity";
            quantityInput.min = 1;
            quantityInput.max = 100;
            quantityInput.value = element.quantity;
            divQuantity.appendChild(quantityInput);

             */

}
});
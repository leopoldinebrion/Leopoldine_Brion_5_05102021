basket = JSON.parse(localStorage.getItem('basket')) || [];

//fonction qui va parcourir chaque elt du localstorage et injecter ds le DOM ses elts
function displayElt() {

    if(basket < 1) {
        document.querySelector('h1').innerHTML = "Votre panier est vide."
    }
    else {
    basket.forEach(element => { 

    const parent = document.getElementById('cart__items');
    
    const totalPrice = element.price * element.quantity;

    parent.innerHTML += `<article class="cart__item" data-id="${element.id}" data-color="${element.color}">
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
    });
   
}
}

displayElt();

//////////////supprimer un article////////s////////
function deleteItem() {
    document.querySelectorAll('.deleteItem').forEach(element => {
      element.addEventListener('click', (event) => {
        event.preventDefault();
        const newLocalStorage = basket;
        newLocalStorage.splice(element, 1);
        localStorage.setItem('basket',JSON.stringify(newLocalStorage));
        location.reload();
      });
    });
  }
  deleteItem();


/////////////modifier la quantité//////////////////
function modifyQuantity() {
    document.querySelectorAll('.itemQuantity').forEach(element => {
        const id = element.closest('article').dataset.id;
        const color = element.closest('article').dataset.color;
        
        basket.forEach(product => { 
        element.addEventListener('change', (e) => {
            e.preventDefault();
            let newQuantity = e.target.value;

            if(id === product.id && color === product.color) {
                product.quantity = newQuantity;
                localStorage.setItem('basket', JSON.stringify(basket));
                location.reload;
            }
        });
    });
});
}
modifyQuantity();



////////////////quantité totale articles//////////////////////
function totalQuantity() {
    basket.forEach(elt => { 
    const getTotalQuantity = basket.reduce((accu, val) => {
        return accu + val.quantity;
        }, 0);
        document.getElementById("totalQuantity").innerHTML = getTotalQuantity;
})
}

totalQuantity();

///////////////prix total articles/////////////////////
function totalPrice() {
    basket.forEach(elt => {
    const getTotalPrice = basket.reduce((accu, val) => {
        return accu + (val.price * val.quantity)
    }, 0)   
    document.getElementById('totalPrice').innerHTML = getTotalPrice; 
})
}
 totalPrice();



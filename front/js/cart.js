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


///////////////FORMULAIRE/////////////////////
/* créer fonction qui, à l'evnt click, envoi un requete post*/

const form = document.querySelector('.cart__order__form');

//On écoute les modifications des champs du form au changement et on appelle une fonction qui a pr paramètre ce que l'utilisateur est en train de saisir (==> this) 
////////NOM/PRENOM///////////
form.firstName.addEventListener('change', function() {
  validName(this);
});

form.lastName.addEventListener('change', function() {
  validName(this);
});

/*fonction qui vérifie si les regex st ok, si false ==> message d'erreur */
const validName = (inputName) => {
  const nameRegex = /^[-'a-zA-ZÀ-ÖØ-öø-ÿ\s]{2,}$/;
  let testName = nameRegex.test(inputName.value);

  if(testName) {
    inputName.nextElementSibling.innerHTML = '';
    return true;
    }
  else {
    inputName.nextElementSibling.innerHTML = 'Veuillez saisir une entrée valide';
    return false;
  }
}

////////EMAIL///////
form.email.addEventListener('change', function() {
  validEmail(this);
});

validEmail = (inputEmail) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  let testEmail = emailRegex.test(inputEmail.value);
  if(testEmail) {
    inputEmail.nextElementSibling.innerHTML = '';
    inputEmail.style.color = '#008000'
    return true;
  }
  else {
    inputEmail.nextElementSibling.innerHTML = "Veuillez saisir une adresse mail valide."
    inputEmail.style.color = '#8B0000';
    return false;
  }
}

////////VILLE////////
form.city.addEventListener('change', function() {
  validCity(this);
});

validCity = (inputCity) => {
  const cityRegex = /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/;
  let testCity = cityRegex.test(inputCity.value);
  if(testCity) {
    inputCity.nextElementSibling.innerHTML = '';
    return true;
  }
  else {
    inputCity.nextElementSibling.innerHTML = "Veuillez saisir une entrée valide."
    inputCity.style.color = '#8B0000';
    return false;
  }
}


const btnForm = document.getElementById('order');

btnForm.addEventListener('click', (e) => {
  e.preventDefault();

  if(
    validName(form.lastName) &&
    validName(form.firstName) &&
    validCity(form.city) &&
    validEmail(form.email)
  ) {
    console.log("niquel");
  }
  else {
    console.log("champ manquant");
  }
})













/*
//recup des données du formulaire

class Form {
    constructor() {
      this.firstName = document.getElementById('firstName').value;
      this.lastName = document.getElementById('lastName').value;
      this.address = document.getElementById('address').value;
      this.city = document.getElementById('city').value;
      this.email = document.getElementById('email').value;
    }
  }

const emailRegex = /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
const cityRegex = /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/;
const nameRegex = /^[a-z ,.'-]+$/i;

const emailErrorMsg = document.getElementById('emailErrorMsg');

//on vérifie si les données inscrites sont bonnes
const checkValidation = () => {
    if(emailRegex.test(email) === false){
        emailErrorMsg.innerHTML = "Veuillez entrer une adresse e-mail valide."
    }
    else {
        return true;
    }
}

*/
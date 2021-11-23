basket = JSON.parse(localStorage.getItem('basket')) || [];

//fonction qui va parcourir chaque elt du localstorage et injecter ds le DOM ses elts
function displayElt() {

    if(basket == 0) {
        document.querySelector('h1').innerHTML = "Votre panier est vide."
    }
    else {
    basket.forEach(element => { 

    const parent = document.getElementById('cart__items');
    

    parent.innerHTML += `<article class="cart__item" id="${element.id}-${element.color}" data-id="${element.id}" data-color="${element.color}">
        <div class="cart__item__img">
        <img src="${element.imgSrc}" alt="${element.imgAlt}">
        </div>
        <div class="cart__item__content">
        <div class="cart__item__content__titlePrice">
        <h2>${element.name}</h2>
        <p >${element.color}</p>
        <p>${element.price}€</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" oninput="modifyQuantity(event, '${element.id}', '${element.color}')" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${element.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
        <p class="deleteItem" onclick="deleteItem('${element.id}', '${element.color}')">Supprimer</p>
        </div>
      </div>
    </div>
    </article>`
    });
   
}
}
displayElt();

//////////////supprimer un article////////////////
const deleteItem = (productId, productColor) => {

  basket = basket.filter(product => {
    return !(product.id === productId && product.color === productColor)
  });
  
  localStorage.setItem('basket', JSON.stringify(basket));
  location.reload();

  if(basket == 0) {
    document.querySelector('h1').innerHTML = "Votre panier est vide."
}

totalPrice()
totalQuantity();
}

/////////////modifier la quantité//////////////////
const modifyQuantity = (event, productId, productColor) => {
 const bufferIndex = basket.findIndex(product =>
  product.id === productId && product.color === productColor);

  basket[bufferIndex].quantity = event.target.value;

  localStorage.setItem('basket', JSON.stringify(basket));

  
  totalQuantity();
  totalPrice();
}

////////////////quantité totale articles//////////////////////
function totalQuantity() {
    const getTotalQuantity = basket.reduce((accu, val) => {
        return accu + parseInt(val.quantity);
        }, 0);
        document.getElementById("totalQuantity").innerHTML = getTotalQuantity;
}

totalQuantity();

///////////////prix total articles/////////////////////
function totalPrice() {
    const getTotalPrice = basket.reduce((accu, val) => {
        return accu + (val.price * val.quantity)
    }, 0)   
    document.getElementById('totalPrice').innerHTML = getTotalPrice; 
}
 totalPrice();


///////////////FORMULAIRE/////////////////////
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

//////ADRESSE///////////
form.address.addEventListener('change', function() {
  validAddress(this);
})

validAddress = (inputAdress) => {
  const addressRegex = /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/;
  let testAdress = addressRegex.test(inputAdress.value);
  if (testAdress) {
    inputAdress.nextElementSibling.innerHTML = "";
    return true;
  } else {
    inputAdress.nextElementSibling.innerHTML = "Veuillez saisir une entrée valide";
    return false;
  }
};

////////VILLE///////
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
    inputCity.nextElementSibling.innerHTML = "Veuillez saisir une entrée valide.";
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
    sendForm(basket);
  }
  else {
    alert('Champ(s) manquant(s)/invalide(s)');
  }
});

//fonction sendForm : fonction qui va permettre de récupérer les données du formulaire etun tableau de produits en constituant un objet contact
//effectuer une requête POST sur l’API et récupérer l’identifiant de commande dans la réponse de celle-ci
function sendForm() {
  const products = [];

  const contact = {
    lastName: form.lastName.value,
    firstName: form.firstName.value,
    address: form.address.value,
    city: form.city.value,
    email: form.email.value,
  }
  
  basket.forEach(canap => {
    const productId = canap.id;
    products.push(productId);
    console.log(products);
  })

  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      'Accept': 'application/json', 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({contact:contact, products:products})
  })
  .then((res) => res.json())
  .then((data) => {
    console.log("data", data);
    document.location.href = `confirmation.html?id=${data.orderId}`;
  })
  .catch(err => {
    console.log("erreur de type" + err)
  })
}













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
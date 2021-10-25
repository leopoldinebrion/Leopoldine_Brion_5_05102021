const str = window.location.href;
const url = new URL(str);
const id = url.searchParams.get('id');//je récupère l'id du produit sur lequel j'ai cliqué

const productFetch = () => {
    fetch(`http://localhost:3000/api/products/${id}`)
    .then(res => res.json())
    .then((data) => {
        addProductElement(data);
        })
        .catch(err => {
            alert("Cette page n'existe plus.")
        })
}

function addProductElement(dataProduct) {
    const itemImg = document.querySelector(".item__img");
    
    const imgKanap = document.createElement("img");
    imgKanap.src = dataProduct.imageUrl;
    imgKanap.alt = dataProduct.altTxt;
    itemImg.appendChild(imgKanap);

    document.getElementById('title').innerHTML = dataProduct.name;

    document.getElementById('price').innerHTML = dataProduct.price;

    document.getElementById('description').innerHTML = dataProduct.description;
    
    const colorsOption = document.getElementById('colors'); //je séléctionne le parent
    dataProduct.colors.forEach(color => { // je parcours les couleurs du tab dans dataproduct
        const option = document.createElement('option'); 
        option.value = color; //
        option.innerHTML = color;
        colorsOption.appendChild(option);  
});
}

productFetch();

//LOCAL STORAGE/EVNT AU CLIC
const addToCart = document.getElementById('addToCart');
addToCart.addEventListener('click', function(e) {
    e.preventDefault(); //empeche de changer de page

    //je crée mes 2 variables pr la couleur et la quantité choisie
    const colorChoose = document.getElementById('colors');
    const quantityChoose = document.getElementById('quantity');
    const price = document.getElementById('price').innerHTML;
    const name = document.getElementById('title').innerHTML;
    const imgSrc = document.querySelector('.item__img img').src;
    const imgAlt = document.querySelector('.item__img img').alt;

    //array contenant les détails du produit à envoyer ds le localstorage
    const choiceArray = {
        id: id,
        color: colorChoose.value,
        quantity: parseInt(quantityChoose.value),
        name: name,
        price: price,
        imgSrc: imgSrc,
        imgAlt: imgAlt,

    };
    
    let productAlreadyInStorage = JSON.parse(localStorage.getItem("basket")) || [];
    
    //si déjà un/des articles ds le storage
    if(productAlreadyInStorage) {
        const productSameColor = productAlreadyInStorage.find(product =>
            product.id === choiceArray.id && product.color === choiceArray.color);
          if(!productSameColor) {
            productAlreadyInStorage.push(choiceArray);
            localStorage.setItem("basket", JSON.stringify(productAlreadyInStorage));
          }
          else {
                productSameColor.quantity = productSameColor.quantity + choiceArray.quantity;
                localStorage.setItem("basket", JSON.stringify(productAlreadyInStorage));
          }
    }

    //si le storage est vide
    else {
        productAlreadyInStorage.push(choiceArray);
        localStorage.setItem("basket", JSON.stringify(productAlreadyInStorage));
    }
});
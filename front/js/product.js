const str = window.location.href;
const url = new URL(str);
const id = url.searchParams.get('id');//je récupère l'id du produit sur lequel j'ai cliqué

const productFetch = () => {
    fetch(`http://localhost:3000/api/products/${id}`)
    .then(res => res.json())
    .then((data) => {
        console.log(data)
        addProductElement(data);
        })
        .catch(err => {
            alert("Cette page n'existe plus.")
        })
}

function addProductElement(dataProduct) {
    const itemImg = document.querySelector(".item__img");
    const img = document.createElement("img");
    img.src = dataProduct.imageUrl;
    img.alt = dataProduct.altTxt;
    itemImg.appendChild(img);

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

//LOCAL STORAGE
const addToCart = document.getElementById('addToCart');
addToCart.addEventListener('click', function(e) {
    e.preventDefault(); //empeche de changer de page

    //je crée mes 2 variables pr la couleur et la quantité choisie
    const colorChoose = document.getElementById('colors');
    const quantityChoose = document.getElementById('quantity');
    
    //variable contenant les détails du produit à envoyer ds le localstorage
    const choiceArray = {
        id: id,
        color: colorChoose.value,
        quantity: quantityChoose.value
    };
    
    let productAlreadyInStorage = JSON.parse(localStorage.getItem("basket")) || [];
    
    //si déjà un/des articles ds le storage
    if(productAlreadyInStorage) {
        productAlreadyInStorage.push(choiceArray);
        localStorage.setItem("basket", JSON.stringify(productAlreadyInStorage));
    }

    // if(productAlreadyInStorage.id === choiceArray.id && productAlreadyInStorage.color === choiceArray.color) {}
   
    //si le storage est vide
    else {
        productAlreadyInStorage.push(choiceArray);
        localStorage.setItem("basket", JSON.stringify(productAlreadyInStorage));
    }
});
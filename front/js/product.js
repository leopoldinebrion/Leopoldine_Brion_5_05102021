
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

/** 
const addToCart = document.getElementById('addToCart');
addToCart.addEventListener('click', function(e) {
    e.preventDefault(); //empeche de changer de page

    const colorChoose = document.getElementById('colors');
    const quantityChoose = document.getElementById('quantity');
    const choice = {
        id: dataProduct_.id,
        color: colorChoose.value,
        quantity: quantityChoose.value
    };

});

productFetch();
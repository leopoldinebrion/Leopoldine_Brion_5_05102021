
let allProducts = undefined;

const productsFetch = () => {
    fetch("http://localhost:3000/api/products")
        .then(res => res.json())
        .then((data) => {
            allProducts = data; 
            generateHTML(data)
            console.log(allProducts);
        })
        .catch(err => {
            console.log(err);
        })
}

const generateHTML = (products) => { 
    if(products) {
        const parent = document.getElementById('items'); //je sélectionne l'élément parent 'items'

        products.forEach((product) => { //boucle pour chaque élement/produit du tableau dans ma console
            const a = document.createElement('a'); //je crée un élément HTML
            a.href =  `./product.html?id=${product._id}`; 
            parent.appendChild(a); //je l'insère dans le DOM

            const article = document.createElement('article');
                a.appendChild(article);

            const img = document.createElement('img');
                img.src = product.imageUrl;
                img.alt = product.altTxt;
                article.appendChild(img); 

            const h3 = document.createElement('h3');
                h3.innerHTML = product.name;
                h3.class = "productName";
                article.appendChild(h3);

                const p = document.createElement('p');
                p.innerHTML = product.description;
                p.class = "productDescription";
                article.appendChild(p);
        });
    }
}

const init = () => {
    productsFetch();
}

init()



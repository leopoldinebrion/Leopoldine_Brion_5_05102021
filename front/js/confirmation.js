//récupérer l'orderID avec URLsearchparams
const url = new URL(window.location.href);

const orderId = url.searchParams.get("id");

 //récupère la clé orderId et l'insère dans le span
const orderIdSpan = document.getElementById('orderId');
orderIdSpan.innerHTML = orderId;

 //vider le localStorage pour ne pas que les données soient conservés
localStorage.clear();
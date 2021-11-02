//récupérer l'orderID avec URLsearchparams
const url = new URL(window.location.href);

const orderId = url.searchParams.get("id");

const orderIdSpan = document.getElementById('orderId');
orderIdSpan.innerHTML = orderId;
const colorMap = {
	"blanco": "#ffffff",
	"negro": "#000000",
	"mostaza": "#ffdb58",
	"gris": "#808080",
	"azul_marino": "#1a237e"
};

function showItems(){
	const itemsSection = document.getElementById("cart-items-container");
	itemsSection.innerHTML = "";

	const cart = JSON.parse(localStorage.getItem("cart"));
	cart.forEach((product) => {
		itemsSection.innerHTML += `
			<article class="cart-item-card">
				<div class="item-img-box">
					<img src="placeholder.jpg" alt="Camiseta">
				</div>
				
				<div class="item-info">
					<h2>${product.nombre}</h2>
					
					<div class="item-specs">
						<p><span class="options-label">Talla:</span> <span class="spec-value">${product.talla}</span></p>
						<p>
							<span class="options-label">Color:</span> 
							<span class="color-circle small-circle" style="background-color: ${colorMap[product.color]};"></span>
						</p>
					</div>

					<div class="quantity-controls">
						<button class="qty-mod">-</button>
						<span class="qty-val">${product.cantidad}</span>
						<button class="qty-mod">+</button>
						<button id="remove_${product.camisetaId}" class="remove-link">Eliminar</button>
					</div>
				</div>

				<div class="item-price-tag">
					<span>${product.precio}€</span>
					<span>${subtotalProducto(product)}€</span>
				</div>
			</article>`;
		
		let removeP = document.getElementById("remove_"+product.camisetaId);
		removeP.onclick = () => { removeProduct(product) };
	});
}

function subtotalProducto(product){
	return product.cantidad * product.precio;
}

function resumenPedido(){
	const subtotalElem = document.getElementById("subtotal-val");
	const totalElem    = document.getElementById("total-val");

	let total = 0;
	const cart = JSON.parse(localStorage.getItem("cart"));
	cart.forEach((product) => {
		total += subtotalProducto(product);
	});

	subtotalElem.textContent = total+"€";
	totalElem.textContent = total+"€";
}

function removeProduct(p){
	let cart = JSON.parse(localStorage.getItem("cart"));
	cart = cart.filter(x => {
		return x.camisetaId != p.camisetaId;
	});

	localStorage.removeItem("cart");
	localStorage.setItem("cart", JSON.stringify(cart));

	initCart();
}

async function finalizarCompra(){
	const compra = {
		cliente: { nombre: "Joan", email: "joan.frago.7e9@itb.cat" },
		direccion: { calle: "Carrer Major 1", cp: "08400", ciudad: "Granollers" },
		items: []
	};

	let cart = JSON.parse(localStorage.getItem("cart"));
	cart.forEach((p) => {
		compra.items.push({
			camisetaId: p.camisetaId,
			talla:      p.talla,
			color:      p.color,
			cantidad:   p.cantidad
		});
	});

	const res = await fetch("http://127.0.0.1:8888/api/comandas", {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(compra)
	});

	if(!res.ok) throw new Error("Error: "+res.status);

	const tiquet = await res.json();
	saveTiquet(tiquet);
	localStorage.removeItem("cart");
	mostrarTiquet(tiquet);
}

function saveTiquet(tiquet){
	localStorage.setItem("tiquet", JSON.stringify(tiquet));
}

function mostrarTiquet(t){
	window.open("./tiquet.html");
	console.log(t);
}

function initCart(){
	showItems();
	resumenPedido();
}

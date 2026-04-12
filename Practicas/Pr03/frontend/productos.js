const colorMap = {
	"blanco": "#ffffff",
	"negro": "#000000",
	"mostaza": "#ffdb58",
	"gris": "#808080",
	"azul_marino": "#1a237e"
};

function mostrarProductos(products) {
	products.forEach(product => {
		const article = document.createElement('article');
		article.classList.add('product-card');

		const primerColor = product.colores[0];
		const imagenInicial = product.imagenes[primerColor];
		const tagTexto = product.tags.length > 0 ? product.tags[0] : '';

		article.innerHTML = `
			<div class="img-container">
				<img src="${imagenInicial}" alt="${product.nombre}">
			</div>
			
			${tagTexto ? `<div class="tag">${tagTexto}</div>` : ''}
			
			<h2>${product.nombre}</h2>
			<p class="description">${product.descripcion}</p>
			<div class="price">${product.precioBase.toFixed(2)}€</div>
			
			<div>
				<span class="options-label">Talla:</span>
				<div id=\"${product.id}_sizes\" class="sizes-container"></div>
				<p id=\"${product.id}_sizes_error\"></p>
			</div>

			<div>
				<span class="options-label">Color:</span>
				<div id=\"${product.id}_colors\" class="colors-container"></div>
				<p id=\"${product.id}_colors_error\"></p>
			</div>

			<button id=\"${product.id}_add_to_cart\" class="add-btn">AÑADIR AL CARRITO</button>
		`;

		let tallas = article.querySelector(".sizes-container");
		product.tallas.forEach((talla) => {
		let tallaHTML = nuevaTalla(talla);
		tallas.appendChild(tallaHTML);
	});

	let colores = article.querySelector(".colors-container");
	product.colores.forEach((color) => {
		let colorHTML = nuevoColor(color);
		colores.appendChild(colorHTML);
	});

	let productList = document.getElementById("product-list");
	productList.appendChild(article);

	let add2CartButton = document.getElementById(product.id+"_add_to_cart");
	add2CartButton.onclick = () => {addToCart(product)};
});
}

function nuevaTalla(talla) {
	let tallaHTML = document.createElement("div");
	tallaHTML.innerHTML = talla;
	tallaHTML.classList.add("size-box");

	tallaHTML.addEventListener("click", (event) => {
		let parent = event.currentTarget.parentElement;
		parent.querySelectorAll(".size-box").forEach((element) => {
			element.classList.remove("active");
		});

		event.currentTarget.classList.add("active");
	});

	return tallaHTML;
}

function nuevoColor(color) {
	let colorHTML = document.createElement("div");

	let cssColor = colorMap[color];
	colorHTML.classList.add("color-circle");
	colorHTML.style.backgroundColor = cssColor;
	colorHTML.title = color;

	colorHTML.addEventListener("click", (event) => {
		let parent = event.currentTarget.parentElement;
		parent.querySelectorAll(".color-circle").forEach((element) => {
			element.classList.remove("active");
		});

		event.currentTarget.classList.add("active");
	});

	return colorHTML;
}

async function obtenerProductos(){
	try {
		const res = await fetch("http://127.0.0.1:8888/api/camisetas");
		if (!res.ok) {
			throw new Error(`Error HTTP ${res.status}`);
		}
		const productos = await res.json();
		mostrarProductos(productos);
	} catch (error) {
		console.error("Error:", error);
	}
}

function addToCart(product){
	if(productOnCart(product)){
		// Just sum one to cantidad
		cartAddCantidad(product.id);
		return;
	}

	const size = document.querySelector("#"+product.id+"_sizes .active");
	if(size == null){
		const err = "Please pick a size";
		const size_error = document.getElementById(product.id+"_sizes_error");
		size_error.textContent = err;
		return;
	}
	else{
		const size_error = document.getElementById(product.id+"_sizes_error");
		size_error.textContent = "";
	}

	const color = document.querySelector("#"+product.id+"_colors .active");
	if(color == null){
		const err = "Please pick a color";
		const color_error = document.getElementById(product.id+"_colors_error");
		color_error.textContent = err;
		return;
	}
	else{
		const color_error = document.getElementById(product.id+"_colors_error");
		color_error.textContent = "";
	}

	let cart = JSON.parse(localStorage.getItem("cart"));
	cart.push({
		camisetaId: product.id,
		nombre: product.nombre,
		talla: size.textContent,  // get the one selected on DOM
		color: color.title,       // get the one selected on DOM
 		cantidad: 1,              // if product didn't exist on cart, it's the first one
		precio: product.precioBase
	});

	localStorage.removeItem("cart");
	localStorage.setItem("cart", JSON.stringify(cart));
	updateCartCount();
}

function productOnCart(aProduct){
	let stg = JSON.parse(localStorage.getItem("cart"));

	if(stg == []) return false;

	return stg.some((iProduct) => iProduct.camisetaId == aProduct.id);
}

function cartAddCantidad(productId){
	let stg = JSON.parse(localStorage.getItem("cart"));
	stg.forEach((product) => {
		if(product.camisetaId == productId){
			product.cantidad += 1;
		}
	});
	
	localStorage.removeItem("cart");
	localStorage.setItem("cart", JSON.stringify(stg));
	updateCartCount();
}

function loadCart(){
	let cart = JSON.parse(localStorage.getItem("cart"));
	if(cart == null){
		// initialize cart to an empty array
		localStorage.setItem("cart", "[]");
	}
}

function updateCartCount(){
	const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, product) => sum + product.cantidad, 0);
    const cartCount = document.getElementById("cart-count");
    
    if (totalItems > 0) {
        cartCount.textContent = totalItems;
        cartCount.classList.add("show");
    } else {
        cartCount.classList.remove("show");
    }
}

// TODO: 2.1 - Filtros

function init() {
	loadCart();
	updateCartCount();
	obtenerProductos();
}

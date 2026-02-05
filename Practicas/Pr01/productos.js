const productosJSON = `[
  {
    "id": "TSH01",
    "nombre": "MACACARENA",
    "descripcion": "Quan balles sense vergonya i el ritme et domina.",
    "precioBase": 19.95,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["blanco", "negro", "mostaza"],
    "imagenes": {
      "blanco": "img/MACACARENA.png",
      "negro": "img/MACACARENA_BLACK.png",
      "mostaza": "img/MACACARENA.png"
    },
    "tags": ["nuevo"]
  },
  {
    "id": "TSH02",
    "nombre": "NINETIES MODE",
    "descripcion": "Un homenatge pixelat als anys 90.",
    "precioBase": 21.50,
    "tallas": ["S", "M", "L", "XL", "XXL"],
    "colores": ["gris", "negro"],
    "imagenes": {
      "gris": "img/NINETIES.png",
      "negro": "img/NINETIES_BLACK.png"
    },
    "tags": ["retro"]
  },
  {
    "id": "TSH03",
    "nombre": "RESERVOIR INVADERS",
    "descripcion": "Quan Tarantino coneix els videojocs clàssics.",
    "precioBase": 22.90,
    "tallas": ["M", "L", "XL"],
    "colores": ["azul", "negro"],
    "imagenes": {
      "azul": "img/RESERVOIR.png",
      "negro": "img/RESERVOIR_BLACK.png"
    },
    "tags": ["edicion-especial"]
  },
  {
    "id": "TSH04",
    "nombre": "VITRUVIAN CODE",
    "descripcion": "Art, codi i proporció perfecta.",
    "precioBase": 24.00,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["blanco", "negro"],
    "imagenes": {
      "blanco": "img/VITRUVIAN.png",
      "negro": "img/VITRUVIAN_BLACK.png"
    },
    "tags": ["premium"]
  }
]
`;

const colorMap = {
	"blanco": "#ffffff",
	"negro": "#000000",
	"mostaza": "#ffdb58",
	"gris": "#808080",
	"azul_marino": "#1a237e"
};

function muestraProductos(products) {
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
				<div class="sizes-container"></div>
			</div>

			<div>
				<span class="options-label">Color:</span>
				<div class="colors-container"></div>
			</div>

			<button class="add-btn">AÑADIR AL CARRITO</button>
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


function init() {
	let productos = JSON.parse(productosJSON);
	muestraProductos(productos);
}

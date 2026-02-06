class FiguraGeometrica {
	nombre;

	constructor(nombre) {
		this.nombre = nombre;
	}

	calcularArea() {
		throw new Error("Error:: calcularArea: This method must be implemented by subclass.");
	}
}

class Rectangulo extends FiguraGeometrica {
	base;
	altura;

	constructor(nombre, base, altura) {
		super(nombre);
		this.base = base;
		this.altura = altura;
	}

	calcularArea() {
		return this.base * this.altura;
	}
}

class Triangulo extends FiguraGeometrica {
	base;
	altura;

	constructor(nombre, base, altura) {
		super(nombre);
		this.base = base;
		this.altura = altura;
	}

	calcularArea() {
		return (this.base * this.altura) / 2
	}
}

class Circulo extends FiguraGeometrica {
	radio;

	constructor(nombre, radio) {
		super(nombre);
		this.radio = radio;
	}

	calcularArea() {
		return Math.PI * (this.radio * this.radio);
	}
}

function init() {
	let rect = new Rectangulo("rectangulo 1", 3, 10);
	console.log(rect.calcularArea());

	let triangulo = new Triangulo("triangulo 1", 4, 6);
	console.log(triangulo.calcularArea());

	let circulo = new Circulo("circulo 1", 8);
	console.log(circulo.calcularArea());

	// Error:
	let figura = new FiguraGeometrica("fig 1");
	figura.calcularArea();
}

init();

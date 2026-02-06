class Personaje {
	nombre;
	nivel;
	puntosVida;
	arma;

	constructor(nombre, nivel, puntosVida, arma) {
		this.nombre = nombre;
		this.nivel = nivel;
		this.puntosVida = puntosVida;
		this.arma = arma;
	}

	atacar() {
		throw new Error("atacar: This method must be implemented by subclass.");
	}

	equiparArma(arma) { this.arma = arma; }

	toString() {
		return `Personaje:\n\tNombre -> ${this.nombre}\n\tNivel -> ${this.nivel}\n\tPuntos de Vida -> ${this.puntosVida}`;
	}
}

class Guerrero extends Personaje {
	fuerza;

	constructor(nombre, nivel, puntosVida, arma, fuerza) {
		super(nombre, nivel, puntosVida, arma);
		this.fuerza = fuerza;
	}

	golpeEspada(other) {
		return "Golpe de espada de " + this.nombre + " con fuerza " + this.fuerza + " a " + other.nombre;
	}

	atacar(other) {
		console.log(this.golpeEspada(other));
		other.puntosVida -= this.arma.atacar() * this.fuerza;
	}
}

class Mago extends Personaje {
	hechizos;
	fuerza;

	constructor(nombre, nivel, puntosVida, arma, hechizos, fuerza) {
		super(nombre, nivel, puntosVida, arma);
		this.hechizos = hechizos;
		this.fuerza = fuerza;
	}

	lanzarHechizo(other) {
		let i = getRandomInt(this.hechizos.length);
		return this.nombre + " lanza el hechizo " + this.hechizos[i] + " con fuerza " + this.fuerza + " a " + other.nombre;
	}

	atacar(other) {
		console.log(this.lanzarHechizo(other));
		other.puntosVida -= this.arma.atacar() * this.fuerza;
	}
}

class Espada {
	nombre;
	dano;

	constructor(nombre) {
		this.nombre = nombre;
		this.dano = 3;
	}

	atacar() { return this.dano; }
}

class Hacha {
	nombre;
	dano;

	constructor(nombre) {
		this.nombre = nombre;
		this.dano = 5;
	}

	atacar() { return this.dano; }
}

class BastonMagico {
	nombre;
	dano;

	constructor(nombre) {
		this.nombre = nombre;
		this.dano = 2;
	}

	atacar() { return this.dano; }
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function init() {
	let a1 = new BastonMagico("BastonMagico");
	let m1 = new Mago("Mago", 8, 14, a1, ["h1", "h2", "h3", "h4"], 0.2);

	let a2 = new Hacha("Hacha");
	let g1 = new Guerrero("Guerrero", 5, 10, a2, 0.4);

	console.log("Vida de " + g1.nombre + " -> " + g1.puntosVida);
	console.log("Vida de " + m1.nombre + " -> " + m1.puntosVida);

	let a3 = new Espada("Espada");
	g1.equiparArma(a3);

	g1.atacar(m1);
	console.log("Vida de " + m1.nombre + " -> " + m1.puntosVida);

	m1.atacar(g1);
	console.log("Vida de " + g1.nombre + " -> " + g1.puntosVida);

	let personajes = [g1, m1];
	personajes.sort((a, b) => a.nivel - b.nivel);

	personajes.forEach((personaje) => {
		console.log(`${personaje}`);
	});
}

//init();

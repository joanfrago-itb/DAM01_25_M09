class Personaje {
	nombre;
	nivel;
	puntosVida;

	constructor(nombre, nivel, puntosVida) {
		this.nombre = nombre;
		this.nivel = nivel;
		this.puntosVida = puntosVida;
	}

	atacar() {
		throw new Error("atacar: This method must be implemented by subclass.");
	}

	toString() {
		return `Personaje:\n\tNombre -> ${this.nombre}\n\tNivel -> ${this.nivel}\n\tPuntos de Vida -> ${this.puntosVida}`;
	}
}

class Guerrero extends Personaje {
	fuerza;

	constructor(nombre, nivel, puntosVida, fuerza) {
		super(nombre, nivel, puntosVida);
		this.fuerza = fuerza;
	}

	golpeEspada(other) {
		return "Golpe de espada de " + this.nombre + " con fuerza " + this.fuerza + " a " + other.nombre;
	}

	atacar(other) {
		console.log(this.golpeEspada(other));
		other.puntosVida -= this.fuerza;
	}
}

class Mago extends Personaje {
	hechizos;
	fuerza;

	constructor(nombre, nivel, puntosVida, hechizos, fuerza) {
		super(nombre, nivel, puntosVida);
		this.hechizos = hechizos;
		this.fuerza = fuerza;
	}

	lanzarHechizo(other) {
		let i = getRandomInt(this.hechizos.length);
		return this.nombre + " lanza el hechizo " + this.hechizos[i] + " con fuerza " + this.fuerza + " a " + other.nombre;
	}

	atacar(other) {
		console.log(this.lanzarHechizo(other));
		other.puntosVida -= this.fuerza;
	}
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function init() {
	let m1 = new Mago("Mago", 8, 14, ["h1", "h2", "h3", "h4"], 4);
	let g1 = new Guerrero("Guerrero", 5, 10, 2);

	console.log("Vida de " + g1.nombre + " -> " + g1.puntosVida);
	console.log("Vida de " + m1.nombre + " -> " + m1.puntosVida);

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

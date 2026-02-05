class TargetaCredito {
	activa = false;

	#_fechaCaducidad;
	#_cvv;
	#_pin;
	#_saldo;

	constructor(titular, banco, id, fechaCaducidad, cvv, pin, saldo) {
		this.titular = titular;
		this.banco = banco;
		this.id = id;
		this.#_fechaCaducidad = fechaCaducidad;
		this.#_cvv = cvv;
		this.#_pin = pin;
		this.#_saldo = saldo;
	}

	get estado() { return this.activa; }
	get fechaCaducidad() { return this.#_fechaCaducidad; }
	get saldo() { return this.#_saldo; }

	activar() { this.activa = true; }
	anular() { this.activa = false; }

	cobrar(cantidad) {
		if (this.activa) {
			this.#_saldo += cantidad;
		}
	}
	pagar(cantidad) {
		if (this.activa && this.#_saldo - cantidad >= 0) {
			this.#_saldo -= cantidad;
		}
	}

	cambiarPin(pinAnterior, pinNuevo) {
		if (pinAnterior == this.#_pin) {
			this.#_pin = pinNuevo;
		}
	}
}

function init() {
	let t1 = new TargetaCredito("Joan Frago", "banco1", "123456789", "2030-02-05", "444", "1234", 400)
	console.log("Targeta 1 -> Titular: " + t1.titular + " -> Banco: " + t1.banco);
	console.log(t1.estado);
	t1.activar();
	t1.cobrar(200);
	console.log(t1.saldo);

	let t2 = new TargetaCredito("Joan Frago", "banco2", "987654321", "2028-09-10", "222", "4321", 340)
	console.log("Targeta 2 -> Titular: " + t2.titular + " -> Banco: " + t2.banco);
	console.log(t2.estado);
	t2.pagar(200); // No puede pagar porque esta desactivada
	console.log(t2.saldo);

	let t3 = new TargetaCredito("Joan Frago", "banco3", "123498765", "2036-12-21", "424", "1423", 900)
	console.log("Targeta 3 -> Titular: " + t3.titular + " -> Banco: " + t3.banco);
	t3.activar();
	console.log(t3.estado);
	t3.cambiarPin("1423", "0090");
	console.log(t3.fechaCaducidad);

	t1.anular();
	t2.anular();
	t3.anular();
}

init();

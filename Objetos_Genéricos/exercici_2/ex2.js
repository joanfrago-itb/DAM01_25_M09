let tvSamsung = {
	nombre: "TV Samsung 42\"",
	categoria: "Televisores",
	unidades: 4,
	precio: 345.95,
	getImporte: () => { return this.unidades * this.precio; }
}

console.log(tvSamsung.getImporte());

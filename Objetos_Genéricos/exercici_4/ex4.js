let cotxe = {
	marca: "Toyota",
	model: "Corolla",
	any: 2020,
	ences: false,
	kilometratge: 0,
	encendre: function() {
		this.ences = true;
		console.log("Cotxe encès.");
	},
	apagar: function() {
		this.ences = false;
		console.log("Cotxe apagat.");
	},
	recorrer: function(km) {
		this.kilometratge += km;
		console.log("Kilometratge: " + this.kilometratge);
	}
};

cotxe.encendre();
cotxe.apagar();
cotxe.recorrer(25);

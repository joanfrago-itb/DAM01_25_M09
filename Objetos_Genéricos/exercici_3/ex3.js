let tvSamsung = {
	nombre: "TV Samsung 42\"",
	categoria: "Televisores",
	unidades: 4,
	precio: 345.95,
	getImporte: function() { return this.unidades * this.precio; }
}

function getTvSamsungProps() {
	for (prop of Object.keys(tvSamsung)) {
		if (prop != "getImporte") {
			tvSamsung[prop] = prompt(prop + ": ")
			console.log(tvSamsung[prop]);
		}
	}
}

function addTvSamsungProps() {
	let newProps = ["nombre", "categoria", "unidades", "precio", "tamany", "resolucio", "tipusPanell", "frequencia"]
	for (newProp of newProps) {
		tvSamsung[newProp] ?? "default value";
	}
}

function showTvSamsung() {
	let tvSamsungsssss = document.getElementById("tv-samsung-ul");

	for (prop of Object.keys(tvSamsung)) {
		tvSamsungsssss.innerHTML += `<li>${prop} = ${tvSamsung[prop]}</li>`;
	}
}

getTvSamsungProps();
addTvSamsungProps();
showTvSamsung();
console.log(tvSamsung.getImporte());

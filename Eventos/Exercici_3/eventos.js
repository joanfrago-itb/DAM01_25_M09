let quadrat = document.getElementById("quadrat");

document.addEventListener("mousemove", (event) => {
	quadrat.style.left = event.clientX + 'px';
});

document.addEventListener("keypress", (event) => {
	let bala = document.createElement("div");
	bala.className = "bala";

	bala.style.left = quadrat.style.left;
	bala.style.bottom = "105px";

	document.body.appendChild(bala);

	let balaBottom = 105;
	let intervalId = setInterval(() => {
		bala.style.bottom = balaBottom + "px";
		balaBottom += 2;

		if (balaBottom > window.innerHeight) {
			clearInterval(intervalId);
			bala.remove();
		}
	}, 5);


});


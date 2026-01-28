document.addEventListener("mousemove", (event) => {
	console.log("Mouse position: " + event.clientX + "," + event.screenY);

	let quadrat = document.getElementById("quadrat");
	quadrat.style.left = event.clientX + 'px';
});


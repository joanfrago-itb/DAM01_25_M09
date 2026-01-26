document.addEventListener("mousemove", (event) => {
	console.log("Mouse position: " + event.screenX + "," + event.screenY);

	let quadrat = document.getElementById("quadrat");
	quadrat.style.right = event.screenX;
});


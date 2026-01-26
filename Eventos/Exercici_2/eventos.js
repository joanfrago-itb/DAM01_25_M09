let button = document.getElementById("lslslsls");

// Al hacer click en el botón se lance un mensaje al usuario
button.addEventListener("click", (event) =>
	alert("Un click: lkdsfkdsjfjdslajf")
);

// Al hacer doble click salte otra alerta
document.addEventListener("dblclick", (event) =>
	alert("Doble click: lkdsfkdsjfjdslajf")
);

// Al detectar que el ratón pasa por encima del botón se vaya escribiendo
// en la consola su posición X, Y
button.addEventListener("mousemove", (event) =>
	console.log("Mouse position: " + event.screenX + "," + event.screenY)
);

// Al presionar Enter salte una alerta
document.addEventListener("keypress", (event) =>
	event.key == "Enter" ? alert("Enter key pressed") : false
);

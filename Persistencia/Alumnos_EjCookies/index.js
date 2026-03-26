// Función para obtener el valor de una cookie
function getCookie(name) {
	return document.cookie
		.split("; ")
		.find(c => c.startsWith(name+"="))
		?.split("=")[1]
		?? null;
}

function changeConfig() {
	const bgColor = getCookie("bgColor");
	const fontColor = getCookie("fontColor");

	if(bgColor) document.body.style.backgroundColor = bgColor;
	if(fontColor) document.body.style.color = fontColor;
}

// Escuchamos el mensaje de la ventana hija
window.addEventListener("message", function (event) {
    if (event.data === "config_actualizada") {
        changeConfig();
    }
});

function init() {
    const visited = getCookie("visited");
    if (!visited) {
        // Abrimos el popup
        window.open('popUP.html', 'Config', 'width=600,height=400');
    }
	else {
		// Aplicamos lo que ya haya (si existe)
		changeConfig();
	}
}

// Ejecutamos al cargar
init();

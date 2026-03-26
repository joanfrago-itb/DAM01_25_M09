function setCookie(name, value, days) {
	const expires = new Date(Date.now() + days * 864e5).toUTCString();
	document.cookie = `${name}=${/*encodeURIComponent*/(value)}; expires=${expires}; path=/`;
}

function saveConfig() {
	const bgColor = document.getElementById("background-color");
	const fontColor = document.getElementById("font-color");

	setCookie("bgColor", bgColor.value, 90);
	setCookie("fontColor", fontColor.value, 90);
	setCookie("visited", "true", 90);

    // Avisamos a la ventana padre ANTES de cerrar
    if (window.opener) {
        window.opener.postMessage("config_actualizada", "*");
    }
    
    window.close();
}

document.getElementById("config-form").addEventListener("submit", function (event) {
    event.preventDefault();
    saveConfig();
});

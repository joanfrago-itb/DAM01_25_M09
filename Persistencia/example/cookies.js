function creaCookies() {
    document.cookie = "nombre=Alicia; path=/";
    document.cookie = "comidaPreferida=Risotto; path=/";
}

function visualizaCookies() {
    const misCookies = document.cookie;
    if (!misCookies) return alert("No hay cookies guardadas");

    const arrayCookies = misCookies.split(";");
    let comida = "";
    let nombre = "";

    arrayCookies.forEach((cookie) => {
        // .trim() es vital para quitar espacios en blanco extra
        const [key, value] = cookie.trim().split("=");
        
        if (key === "comidaPreferida") {
            comida = value;
        }
        if (key === "nombre") {
            nombre = value;
        }
    });

    alert("A " + nombre + " le encanta el " + comida);
}

function eliminarCookies() {
    document.cookie.split(";").forEach(function (c) {
        // Para borrar una cookie hay que asegurarse de que el path coincida
        document.cookie = c.trim().split("=")[0] + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
    });
    alert("Cookies eliminadas");
}

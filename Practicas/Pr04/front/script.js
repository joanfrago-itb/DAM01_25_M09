//Body para el pagos, con datos de ejemplo para facilitar las pruebas desde el front-end. 
// Puedes modificarlo según tus necesidades o incluso generar datos aleatorios para simular diferentes escenarios.
const defaultPagoBody = {
    cliente: { nombre: "Ada Lovelace", email: "ada@teelab.dev" },
    direccion: "Calle Debug 42",
    items: [
        { camisetaId: "TSH001", nombre: "Camiseta artística 1", precio: 20, cantidad: 2 },
        { camisetaId: "TSH002", nombre: "Camiseta artística 2", precio: 18, cantidad: 1 }
    ]
};

let runCounter = 0;

function getBaseUrl() {
    return document.getElementById("baseUrl").value.trim().replace(/\/$/, "");
}

// Función para actualizar los indicadores de la sección "Métricas en tiempo real"
function updateMetrics({ endpoint, time, sizeKB, status }) {
    document.getElementById("m-endpoint").textContent = endpoint || "-";
    document.getElementById("m-time").textContent = time !== undefined ? `${time} ms` : "-";
    document.getElementById("m-size").textContent = sizeKB !== undefined ? `${sizeKB} KB` : "-";

    const statusEl = document.getElementById("m-status");
    statusEl.textContent = status || "-";
    statusEl.className = "metric-value";
    if (String(status).startsWith("2")) statusEl.classList.add("status-ok");
    else if (String(status).startsWith("4") || String(status).startsWith("5") || status === "ERROR") statusEl.classList.add("status-error");
    else statusEl.classList.add("status-warn");
}

// Función para añadir una fila a la tabla de resultados
function appendRow({ endpoint, method, status, time, sizeKB, type }) {
    const tbody = document.getElementById("resultsTableBody");
    runCounter += 1;

    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${runCounter}</td>
        <td>${endpoint}</td>
        <td>${method}</td>
        <td>${status}</td>
        <td>${time}</td>
        <td>${sizeKB}</td>
        <td>${type}</td>
      `;
    tbody.prepend(tr);
}

// Función para mostrar mensajes detallados en el área de log
function log(message) {
    const out = document.getElementById("logOutput");
    out.textContent = `[${new Date().toLocaleTimeString()}] ${message}\n\n` + out.textContent;
}

// Función para medir el tiempo y tamaño de una petición a la API
function estimateSizeKB(text) {
    return (new Blob([text]).size / 1024).toFixed(2);
}

// Función principal para hacer las peticiones a la API y medir su rendimiento
async function measureRequest(endpoint, method = "GET", body = null) {
    const url = `${getBaseUrl()}${endpoint}`;
    const options = { method, headers: {} };

    if (body) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(body);
    }

    const start = performance.now();

    try {
        const res = await fetch(url, options);
        const text = await res.text();
        const end = performance.now();

        const time = (end - start).toFixed(2);
        const sizeKB = estimateSizeKB(text);

        let preview = text;
        if (preview.length > 900) preview = preview.slice(0, 900) + "\n\n...[respuesta truncada]";

        updateMetrics({
            endpoint,
            time,
            sizeKB,
            status: String(res.status)
        });

        appendRow({
            endpoint,
            method,
            status: res.status,
            time,
            sizeKB,
            type: "individual"
        });

        log(`${method} ${endpoint}
Estado: ${res.status}
Tiempo: ${time} ms
Tamaño: ${sizeKB} KB
Respuesta:
${preview}`);

        return {
            ok: res.ok,
            status: res.status,
            time: Number(time),
            sizeKB: Number(sizeKB),
            body: text
        };
    } catch (error) {
        updateMetrics({
            endpoint,
            status: "ERROR"
        });

        appendRow({
            endpoint,
            method,
            status: "ERROR",
            time: "-",
            sizeKB: "-",
            type: "individual"
        });

        log(`${method} ${endpoint}
Estado: ERROR
Detalle: ${error.message}`);

        return {
            ok: false,
            status: "ERROR",
            error: error.message
        };
    }
}

//*****************************************************************************************************************************
// METODOS PARA HACER LAS LLAMADAS A LOS DISTINTOS ENDPOINTS DE LA API Y MOSTRAR LOS RESULTADOS EN EL FRONT-END
//*****************************************************************************************************************************

async function runHealth() {
    await measureRequest("/health");
}

async function runCamisetas() {
    await measureRequest("/api/catalogo/camisetas");
}

async function runCatalogoCompleto() {
    await measureRequest("/api/catalogo/catalogo-completo");
}

async function runPago() {
    await measureRequest(
        '/api/pagos/finalizar',
        'POST',
        defaultPagoBody
    );
}

async function runPagoWorker() {
    await measureRequest(
        '/api/pagos/finalizar?modo=worker',
        'POST',
        defaultPagoBody
    );
}

async function runTicketPdf() {
    await measureRequest("/api/tickets/TEST-001/pdf");
}

async function runRecomendaciones() {
    await measureRequest("/api/recomendaciones");
}

async function runParallelTest() {
    const endpoint = document.getElementById("selectedEndpoint").value;
    const count = Number(document.getElementById("parallelCount").value);

    if (!count || count < 1) {
        alert("Introduce un número válido de peticiones en paralelo.");
        return;
    }

    log(`Iniciando prueba en paralelo: ${count} peticiones sobre ${endpoint}`);

    const requests = [];
    for (let i = 0; i < count; i++) {
        if (endpoint === "/api/pagos/finalizar") {
            requests.push(measureRequest(endpoint, "POST", defaultPagoBody));
        } else {
            requests.push(measureRequest(endpoint));
        }
    }

    const results = await Promise.all(requests);

    const validTimes = results
        .filter(r => typeof r.time === "number" && !Number.isNaN(r.time))
        .map(r => r.time);

    const validSizes = results
        .filter(r => typeof r.sizeKB === "number" && !Number.isNaN(r.sizeKB))
        .map(r => r.sizeKB);

    const okCount = results.filter(r => r.ok).length;
    const errorCount = results.length - okCount;

    const avgTime = validTimes.length
        ? (validTimes.reduce((a, b) => a + b, 0) / validTimes.length).toFixed(2)
        : "-";

    const minTime = validTimes.length ? Math.min(...validTimes).toFixed(2) : "-";
    const maxTime = validTimes.length ? Math.max(...validTimes).toFixed(2) : "-";

    const avgSize = validSizes.length
        ? (validSizes.reduce((a, b) => a + b, 0) / validSizes.length).toFixed(2)
        : "-";

    appendRow({
        endpoint,
        method: endpoint === "/api/pagos/finalizar" ? "POST" : "GET",
        status: `${okCount} OK / ${errorCount} ERROR`,
        time: `avg ${avgTime} | min ${minTime} | max ${maxTime}`,
        sizeKB: avgSize === "-" ? "-" : `avg ${avgSize}`,
        type: `paralelo x${count}`
    });

    log(`Resultado prueba en paralelo sobre ${endpoint}
Peticiones: ${count}
Correctas: ${okCount}
Errores: ${errorCount}
Tiempo medio: ${avgTime} ms
Tiempo mínimo: ${minTime} ms
Tiempo máximo: ${maxTime} ms
Tamaño medio: ${avgSize} KB`);
}

function clearResults() {
    document.getElementById("resultsTableBody").innerHTML = "";
    document.getElementById("logOutput").textContent = "Aquí aparecerán los resultados detallados de cada prueba...";
    runCounter = 0;
    updateMetrics({ endpoint: "-", time: "-", sizeKB: "-", status: "-" });
}

function init() {
    log("Panel de diagnóstico TeeLab listo. Comienza probando /health y /api/camisetas.");
}

init();

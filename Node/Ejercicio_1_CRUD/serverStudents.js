const { createServer } = require('node:http');

const hostname = '127.0.0.1';
const port = 3001;

// Datos simulados --> como si fuera lo que nos devuelve la BDD
let students = [
	{ id: "A001", nombre: "Abril", curso: "1º DAW" },
	{ id: "A002", nombre: "Marc", curso: "1º DAM" }
];

// Devuelve JSON
function sendJson(res, statusCode, data) {
	res.statusCode = statusCode;
	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.end(JSON.stringify(data));
}



const server = createServer((req, res) => {

	console.log(req.method, req.url);

	// GET /students
	if (req.method === "GET" && req.url === "/students") {
		return sendJson(res, 200, students);
	}

	// TODO 1: GET /students/:id
	//Buscamos la info de un alumno completo.
	if (req.method === "GET" && req.url.startsWith("/students/")) {
		// 1. Extraer id de la URL
		let id = getStudentId(req.url);

		// 2. Buscar alumno en el array
		let student = getStudent(id);

		if(student == null){
			// 4. Si no existe → 404
			return sendJson(res, 404, { message: "Not Found" });
		}
		else{
			// 3. Si existe → devolver 200 + alumno
			return sendJson(res, 200, student);
		}
	}

	// TODO 2: DELETE /students/:id
	if (req.method === "DELETE" && req.url.startsWith("/students/")) {

		// 1. Extraer id
		let id = getStudentId(req.url);
		// 2. Comprobar si existe
		let student = getStudent(id);
		if(student == null){
			// 4. Si no existe → 404
			return sendJson(res, 404, { message: "Not Found" });
		}
		else{
			// 3. Eliminarlo del array
			students.splice(students.indexOf(student), 1);
			// 5. Si se elimina → 204 (sin body)
			return sendJson(res, 204, {});
		}
	}

	// TODO 3: POST /students
	if (req.method === "POST" && req.url === "/students") {

		// 1. Leer el body con readBody() --> Es donde esta toda la info del nuevo alumno.
		readBody(req, (res, student) => {
			// 2. Validar que tenga id, nombre y curso
			if(student.hasOwnProperty("id") && student.hasOwnProperty("nombre") && student.hasOwnProperty("curso")){
				// 3. Comprobar que el id no esté repetido
				if(getStudent(student.id) != null){
					// 4. Añadir al array students
					students.push(student);
					// 5. Devolver 201 + alumno creado
					return sendJson(res, 201, {message: "Student created"});
				}
				else{
					return sendJson(res, 409, {message: "Student already exists"});
				}
			}
			else{
				return sendJson(res, 409, {message: "Student doesn't have id, nombre or curso"});
			}

		});
	}

	// TODO 4: PUT /students/:id
	if (req.method === "PUT" && req.url.startsWith("/students/")) {

		// 1. Extraer id
		// 2. Buscar alumno
		// 3. Si no existe → 404
		// 4. Leer body con readBody() --> Ahora será otra callback!!!
		// 5. Actualizar campos enviados
		// 6. Devolver 200 + alumno actualizado

	}

	// Si no coincide ningún endpoint
	sendJson(res, 404, { message: "Not Found" });
});

function getStudentId(url){
	return url.substring(url.length - 4, url.length);
}

function getStudent(id){
	let s = null;

	students.forEach((student) => {
		if(student.id == id){
			s = student;
		}
	});

	return s;
}

/* 
 *  TODO: Crear función que lea el body y devuelva el JSON parseado
 *        En Node puro, el body no viene empaquetado.
 *        Llega en trozos.
 *        Tenemos que montarlo nosotros.
*/
function readBody(req, callback) {
	let body = "";

	req.on("data", chunk => {
		//Vamos obteniendo los trozos
		body += chunk;
	});

	req.on("end", () => {
		try {
			const data = JSON.parse(body);
			callback(null, data);
		} catch (err) {
			callback(err);
		}
	});
}

//TODO las funciones callback necesarias.

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

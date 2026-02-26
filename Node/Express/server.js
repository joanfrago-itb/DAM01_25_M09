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


//asincrono
const server = createServer(async (req, res) => {

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

		try {
			// 1. Leer el body con readBody() --> await
			const student = await readBody(req);
			// 2. Validar que tenga id, nombre y curso
			if(!validStudent(student)){
				return sendJson(res, 409, {message: "Student doesn't have id, nombre or curso"});
			}

			// 3. Comprobar que el id no esté repetido
			if(getStudent(student.id) != null){
				return sendJson(res, 409, {message: "Student already exists"});
			}

			// 4. Añadir al array students
			students.push(student);
			// 5. Devolver 201 + alumno creado
			return sendJson(res, 201, {message: "Student created"});

		} catch {
			//Si hay algún error.
			return sendJson(res, 400, { message: "JSON inválido" });
		}
	}

	// TODO 4: PUT /students/:id
	if (req.method === "PUT" && req.url.startsWith("/students/")) {

		// 1. Extraer id
		let id = getStudentId(req.url);
		// 2. Buscar alumno
		let student = getStudent(id);
		// 3. Si no existe → 404
		if(student == null){
			return sendJson(res, 404, { message: "Student does not exist." });
		}

		//TRY
		try{
			// 4. Leer body con readBody() --> await
			const newStudent = await readBody(req);
			// 5. Actualizar campos enviados
			if(newStudent.hasOwnProperty("nombre")){
				student.nombre = newStudent.nombre;
			}
			if(newStudent.hasOwnProperty("curso")){
				student.curso = newStudent.curso;
			}
			// 6. Devolver 200 + alumno actualizado
			return sendJson(res, 200, {message: "Student updated."});

		}
		catch{
			//Si hay algún error.
			return sendJson(res, 400, { message: "Request error." });
		}
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

function validStudent(student){
	if(student.hasOwnProperty("id") && student.hasOwnProperty("nombre") && student.hasOwnProperty("curso")){
		return true;
	}
	return false;
}

/*  TODO: Crear función que lea el body y devuelva el JSON parseado
		  En Node puro, el body no viene empaquetado.
		  Llega en trozos.
		  Tenemos que montarlo nosotros.*/

/*
function readBody(req, callback) {
  let body = "";

  req.on("data", chunk => {
	//Vamos obteniendo los trozos
	body += chunk;
  });

  req.on("end", () => {
	try {
	  const alumnoNew = JSON.parse(body);
	  //Aquí ya tenemos al alumno.
	  callback(null, alumnoNew);
	} catch (err) {
	  callback(err);
	}
  });
}
*/

//MEJOR usando PROMESAS
// Lee el body y devuelve el JSON parseado como Promise (en lugar de callbacks)
function readBody(req) {
	return new Promise((resolve, reject) => {
		let body = "";
		req.on("data", chunk => body += chunk);
		req.on("end", () => {
			try {
				resolve(JSON.parse(body));
			} catch (err) {
				reject(err);
			}
		});
	});
}

//TODO las funciones callback necesarias.

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

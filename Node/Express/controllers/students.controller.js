export function getAll(req, res){
	res.status(200);
	res.json(students);
}

export function getById(req, res){
	// 1. Extraer id de la URL
	let id = getStudentId(req);

	// 2. Buscar alumno en el array
	let student = getStudent(id);

	if(student == null){
		// 4. Si no existe → 404
		res.status(404);
		res.json({ message: "Not Found" });
	}
	else{
		// 3. Si existe → devolver 200 + alumno
		res.status(200);
		res.json(student);
	}
}

export function deleteById(req, res){
	// 1. Extraer id
	let id = getStudentId(req);
	// 2. Comprobar si existe
	let student = getStudent(id);
	if(student == null){
		// 4. Si no existe → 404
		res.status(404);
		res.json({ message: "Not Found" });
	}
	else{
		// 3. Eliminarlo del array
		students.splice(students.indexOf(student), 1);
		// 5. Si se elimina → 204 (sin body)
		res.status(204);
		res.json({});
	}
}

export function add(req, res){
	const student = req.body;
	// 2. Validar que tenga id, nombre y curso
	if(!validStudent(student)){
		res.status(409);
		res.json({message: "Student doesn't have id, nombre or curso"});
	}

	// 3. Comprobar que el id no esté repetido
	if(getStudent(student.id) != null){
		res.status(409);
		res.json({message: "Student already exists"});
	}

	// 4. Añadir al array students
	students.push(student);
	// 5. Devolver 201 + alumno creado
	res.status(201);
	res.json({message: "Student created"});
}

export function modifyById(req, res){
	// 1. Extraer id
	let id = getStudentId(req);
	// 2. Buscar alumno
	let student = getStudent(id);
	// 3. Si no existe → 404
	if(student == null){
		res.status(404);
		res.json({ message: "Student does not exist." });
	}

	// 4. Leer body con readBody() --> await
	const newStudent = req.body;
	// 5. Actualizar campos enviados
	if(newStudent.hasOwnProperty("nombre")){
		student.nombre = newStudent.nombre;
	}
	if(newStudent.hasOwnProperty("curso")){
		student.curso = newStudent.curso;
	}
	// 6. Devolver 200 + alumno actualizado
	res.status(200);
	res.json({message: "Student updated."});
}

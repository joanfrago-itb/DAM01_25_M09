async function getRes(uri){
	const res = await fetch(uri);
	if(!res.ok){
		console.error("Error: "+ res.status);
		return null;
	}
	const data = await res.json();
	return data;
}

async function loadAlumnos(){
	const alumnos = await getRes("http://127.0.0.1:3001/students");
	return alumnos;
}

async function loadNota(idAlumno){
	const nota = await getRes("http://127.0.0.1:3001/notas/"+idAlumno);
	return nota;
}

async function showAlumnos(){
	const alumnos = await loadAlumnos();

	const table = document.getElementById("table-alumnos");
	alumnos.forEach(async (a) => {
		const nota = await loadNota(a.id);
		let row = "<tr>";
		row +=	  "    <td>"+a.id+"</td>";
		row +=	  "    <td>"+a.nombre+"</td>";
		row +=	  "    <td>"+a.curso+"</td>";
		if(nota){
		row +=	  "    <td>"+nota.modulo+"</td>";
		row +=	  "    <td>"+nota.nota+"</td>";
		}
		row += 	  "</tr>";

		table.innerHTML += row;
	});
}

async function addAlumno(){
	const idAlum = document.getElementById("idAlumno");
	const nombreAlum = document.getElementById("nombre");
	const cursoAlum = document.getElementById("curso");

	const newAlumno = { id: idAlum.value, nombre: nombreAlum.value, curso: cursoAlum.value };
	
	const res = await fetch("http://127.0.0.1:3001/students", {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(newAlumno)
	});

	if(!res.ok) throw new Error("Error: "+res.status);
	showAlumnos();
}

function init(){
	const addAlumnoForm = document.getElementById("alumnos-form");
	addAlumnoForm.addEventListener("submit", addAlumno)

	showAlumnos();
}

init();

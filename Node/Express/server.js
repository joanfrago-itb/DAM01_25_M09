import express from "express";
import studentsRouter from "./routes/students.routes.js";

const app = express();
const PORT = 3001;

// FUNCTIONS

function getStudentId(req){
	return req.params.id;
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

// MIDDLEWARE
app.use(express.json());

app.use((err, req, res, next) => {
	console.error(err.message);
	res.status(500).json({message: "Error interno"});
});

app.listen(PORT, () => {
	console.log(`Server running on http://127.0.0.1:${PORT}`);
});

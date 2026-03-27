import express from "express";
import cors from "cors";
import studentsRouter from "./routes/students.routes.js";
import notasRouter from "./routes/notas.routes.js";

const app = express();
const PORT = 3001;

// FUNCTIONS

// function getStudentId(req){
    // return req.params.id;
// }

// function getStudent(id){
    // let s = null;
// 
    // students.forEach((student) => {
	// if(student.id == id){
	    // s = student;
	// }
    // });
// 
    // return s;
// }

// function validStudent(student){
    // if(student.hasOwnProperty("id") && student.hasOwnProperty("nombre") && student.hasOwnProperty("curso")){
	// return true;
    // }
    // return false;
// }

// MIDDLEWARE

app.use(cors({
	origin: "http://127.0.0.1"
}));

app.use(express.json());

app.use((req,res,next) => {
    console.log(req.method, req.url);
    next();
});

app.use("/students", studentsRouter);
app.use("/notas", notasRouter);

app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({message: "Error interno"});
});

app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
});

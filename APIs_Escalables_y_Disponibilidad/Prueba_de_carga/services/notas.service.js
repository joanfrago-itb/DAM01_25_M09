import { notas } from "../data/notas.js";
import * as studentsService from "./students.service.js";

export function getById(id){
	if(studentsService.getById(id)){
    	return notas.find(n => n.studentId === id);
	}
}

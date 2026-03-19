import { students } from "../data/students.js";

function validateStudent(obj){
    if(!obj || typeof obj !== "object")
	return "Invalid body";
    if(!obj.id || !obj.nombre || !obj.curso)
	return "Some params are missing";

    return null;
}

function existsId(id){
    return students.some(s => s.id === id);
}

export function getAll(){
    return students;
}

export function getById(id){
    return students.find(s => s.id === id);
}

export function create(s){
    const validationMsg = validateStudent(s);
    if(validationMsg)
	return {error: validationMsg};

    if(existsId(s.id))
	return { error: "id already exists", status: 409 };

    students.push({ id: s.id, nombre: s.nombre, curso: s.curso });
    return { data: s };
}

export function update(id, payload){
    const idx = students.findIndex(s => s.id === id);
    if(idx === -1)
	return null;

    if(payload && typeof payload === "object"){
	if(payload.nombre !== undefined)
	    students[idx].nombre = payload.nombre;
	if(payload.curso !== undefined)
	    students[idx].curso = payload.curso;
    }

    return students[idx];
}

export function remove(id){
    const before = students.length;
    const filtered = students.filter(s => s.id !== id);

    if(filtered.length === before)
	return false;
    
    students.length = 0;
    students.push(...filtered);
    return true;
}


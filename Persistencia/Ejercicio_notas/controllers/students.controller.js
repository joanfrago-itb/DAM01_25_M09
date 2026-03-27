import * as studentsService from "../services/students.service.js";

export function getAll(req, res){
    res.status(200);
    res.json(studentsService.getAll());
}

export function getById(req, res){
    const student = studentsService.getById(req.params.id);
    
    if(!student){
	res.status(404);
	return res.json({message: "Not found"});
    }
    res.json(student);
}

export function add(req, res){
    const result = studentsService.create(req.body);

    if(result.error){
	const status = result.status || 400;
	res.status(status);
	return res.json({message: result.error});
    }

    res.status(201);
    res.json({message: "Created", student: result.data});
}

export function modifyById(req, res){
    const updated = studentsService.update(req.params.id, req.body);

    if(!updated){
	res.status(404);
	res.json({message: "Not Found"});
    }
    
    res.json(updated);
}

export function deleteById(req, res){
    const deleted = studentsService.remove(req.params.id);
    if(!deleted){
	res.status(404);
	return res.json({message: "Not Found"});
    }

    res.sendStatus(204);
}

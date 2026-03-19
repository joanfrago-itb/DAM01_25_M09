import * as notasService from "../services/notas.service.js";

export function getById(req, res){
    const nota = notasService.getById(req.params.id);
    
    if(!nota){
	res.status(404);
	return res.json({message: "Not found"});
    }
    res.json(nota);
}

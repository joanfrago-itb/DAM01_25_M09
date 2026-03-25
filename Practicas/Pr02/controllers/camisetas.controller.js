import * as camisetasService from "../services/camisetas.service.js";

export function getAll(req, res){
    res.status(200);
    res.json(camisetasService.getAll());
}

export function getById(req, res){
    const camiseta = camisetasService.getById(req.params.id);
    
    if(!camiseta){
		res.status(404);
		return res.json({message: "Camiseta no encontrada"});
    }
    res.json(camiseta);
}


import * as comandasService from "../services/comandas.service.js";

export function getAll(req, res){
	res.status(200);
	res.json(comandasService.getAll());
}

export function getById(req, res){
	const comanda = comandasService.getById(req.params.id);
     
	if(!comanda){
		res.status(404);
		return res.json({message: "Comanda no encontrada"});
	}
	res.json(comanda);
}

export function add(req, res){
    const result = comandasService.create(req.body);

    if(result.error){
		const status = result.status || 400;
		res.status(status);
		return res.json({message: result.error});
    }

    res.status(result.status);
    res.json(result.data);
}


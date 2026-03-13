import * as notasService from "../services/notas.service.js";

export function getAll(req, res){
    res.status(200);
    res.json(notasService.getAll());
}

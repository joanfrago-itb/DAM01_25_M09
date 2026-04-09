import { comandas } from "../data/comandas.js";
import * as camisetasService from "../services/camisetas.service.js";

function validateComanda(obj){
    if(!obj || typeof obj !== "object")
		return "Invalid body";

    if(!obj.cliente.nombre){
		return "El objeto cliente no tiene atributo nombre";
	}
	if(!obj.cliente.email){
		return "El objeto cliente no tiene atributo email";
	}
    if(!obj.items || obj.items.length < 1){
		return "La comanda no tiene items";
	}
	obj.items.forEach((item) => {
		if(!Number.isInteger(item.cantidad) || item.cantidad < 1){
			return "La cantidad del item "+item.camisetaId+" no es un numero entero o es menor que 1";
		}
		if(!camisetasService.camisetaExists(item.camisetaId)){
			return "La camiseta con id "+item.camisetaId+" no existe";
		}
		if(!camisetasService.camisetaHasTalla(item.camisetaId, item.talla)){
			return "La camiseta con id "+item.camisetaId+" no tiene la talla "+item.talla;
		}
		if(!camisetasService.camisetaHasColor(item.camisetaId, item.color)){
			return "La camiseta con id "+item.camisetaId+" no tiene el color "+item.color;
		}
	});
    
    return null;
}

export function getAll(){
	return comandas;
}

export function getById(id){
	return comandas.find(c => c.id === id);
}

export function create(c){
    const validationMsg = validateComanda(c);
    if(validationMsg){
		return { error: validationMsg, status: 400 };
	}

	saveComanda(c);
	let ticket = generateTicket(c);
    return { data: ticket, status: 201 };
}

function saveComanda(c){
	c.id = newId();
    comandas.push(c);
}

function newId(){
	return "ORD-" + (comandas.length + 1);
}

function generateTicket(c){
	let ticket = {
		id: c.id,
		fecha: new Date().toISOString(),
		estado: "recibida",
		items: c.items,
		total: 0
	}

	ticket.items.forEach((item) => {
		item.precioUnitario = camisetasService.getPrecioBase(item.camisetaId),
		item.subtotal = item.precioUnitario * item.cantidad,
		ticket.total += item.subtotal
	});

	return ticket;
}


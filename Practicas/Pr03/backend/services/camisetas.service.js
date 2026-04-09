import { catalogo } from "../data/catalogo.js";

export function camisetaExists(id){
    return catalogo.some(c => c.id === id);
}

export function camisetaHasTalla(id, talla){
	let c = getById(id);
	return c.tallas.some(t => t === talla);
}

export function camisetaHasColor(id, color){
	let c = getById(id);
	return c.colores.some(c => c === color)
}

export function getPrecioBase(id){
	let c = getById(id);
	return c.precioBase;
}

export function getAll(){
    return catalogo;
}

export function getById(id){
    return catalogo.find(c => c.id === id);
}


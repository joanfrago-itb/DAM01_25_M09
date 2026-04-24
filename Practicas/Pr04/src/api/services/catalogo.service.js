import { camisetas } from '../data/store.js';
import { spawn } from 'child_process';
import path from 'path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export function listarCamisetas(query) {
  let result = [...camisetas];

  if (query.color) {
    result = result.filter(c => c.colores.includes(query.color));
  }

  if (query.talla) {
    result = result.filter(c => c.tallas.includes(query.talla));
  }

  if (query.q) {
    const q = query.q.toLowerCase();
    result = result.filter(c =>
      c.nombre.toLowerCase().includes(q) ||
      c.descripcion.toLowerCase().includes(q)
    );
  }

  return result;
}

export function generarCatalogoCompleto() {
  console.log('Generando catálogo completo... Esto puede tardar unos segundos.');

  return new Promise((resolve, reject) => {
    const child = spawn('node', [path.join(__dirname, '../process/catalogo-generator.js')]);

    let output = '';
    let error = '';

    child.stdout.on('data', chunk => {
      output += chunk.toString();
    });

    child.stderr.on('data', chunk => {
      error += chunk.toString();
    });

    child.on('close', code => {
      if (code !== 0) {
        return reject(new Error(error || 'Fallo generando catálogo completo'));
      }

      try {
        console.log('Catálogo completo generado.');
        resolve(JSON.parse(output));
      } catch {
        reject(new Error('Respuesta inválida del generador'));
      }
    });
  });
}


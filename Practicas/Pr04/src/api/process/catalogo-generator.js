import { camisetas } from '../data/store.js';

function heavyTextScore(text) {
  let acc = 0;
  for (let i = 0; i < 8000000; i++) {
    acc += (text.charCodeAt(i % text.length) || 1) * (i % 7);
  }
  return acc % 100;
}

const result = camisetas.map(item => ({
  ...item,
  resumen: `${item.nombre} · edición destacada`,
  puntuacion: heavyTextScore(item.nombre + item.descripcion),
  imagenOptimizada: `/img/${item.id}-optimized.webp`
}));

process.stdout.write(JSON.stringify(result));
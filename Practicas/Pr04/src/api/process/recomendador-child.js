import { camisetas, comandas } from '../data/store.js';

process.on('message', (msg) => {
  if (msg.type !== 'start') return;

  const scores = camisetas.slice(0, 20).map(c => {
    let score = 0;

    for (let i = 0; i < comandas.length * 40000; i++) {
      score += (c.id.charCodeAt(i % c.id.length) + i) % 13;
    }

    return {
      camisetaId: c.id,
      nombre: c.nombre,
      score
    };
  });

  process.send(scores.sort((a, b) => b.score - a.score).slice(0, 5));
});
import { fork } from 'child_process';

export function calcularRecomendaciones() {
  console.log('Calculando recomendaciones... Esto puede tardar unos segundos.');
  return new Promise((resolve, reject) => {

    const child = fork(
      new URL('../process/recomendador-child.js', import.meta.url)
    );

    const timeout = setTimeout(() => {
      child.kill();
      reject(new Error('El recomendador no respondió'));
    }, 4000);

    child.send({ type: 'start' });

    child.on('message', msg => {
      clearTimeout(timeout);
      resolve(msg);
    });

    child.on('error', err => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}


import { Worker } from 'worker_threads';
import { fileURLToPath } from 'url';

function fakePaymentSignature(items = []) {
  const raw = JSON.stringify(items) || '[]';
  let hash = 0;

  for (let i = 0; i < 3e7; i++) {
    hash = (hash + raw.charCodeAt(i % raw.length) * 31) % 1000000007;
  }

  return hash;
}

function procesarPagoSync(payload) {
  const items = payload.items || [];

  const total = items.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const signature = fakePaymentSignature(items);

  return {
    ok: true,
    estado: 'pagado',
    modo: 'sync',
    total: Number(total.toFixed(2)),
    firma: signature,
    orderId: `ORD-${Date.now()}`
  };
}

function procesarPagoWorker(payload) {
  return new Promise((resolve, reject) => {
    const workerPath = fileURLToPath(
      new URL('../workers/pagos.worker.js', import.meta.url)
    );

    const worker = new Worker(workerPath, {
      workerData: payload
    });

    const timeout = setTimeout(() => {
      worker.terminate();
      reject(new Error('La pasarela de pago no ha respondido a tiempo'));
    }, 5000);

    worker.on('message', (result) => {
      clearTimeout(timeout);
      resolve({
        ...result,
        modo: 'worker'
      });
    });

    worker.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}

export async function procesarPago(payload, modo = 'sync') {
  if (modo === 'worker') {
    console.log('Procesando pago en modo WORKER. Esto no bloqueará el event loop y es recomendable para cargas altas.');
    return procesarPagoWorker(payload);
  }

  console.warn('Procesando pago en modo SYNC. Esto bloqueará el event loop y no es recomendable para cargas altas.');
  return procesarPagoSync(payload);
}


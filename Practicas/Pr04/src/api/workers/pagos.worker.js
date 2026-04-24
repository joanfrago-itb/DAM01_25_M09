import { parentPort, workerData } from 'worker_threads';

function fakePaymentSignature(items) {
  let hash = 0;
  const raw = JSON.stringify(items);

  for (let i = 0; i < 3e7; i++) {
    hash = (hash + raw.charCodeAt(i % raw.length) * 31) % 1000000007;
  }

  return hash;
}

const total = (workerData.items || []).reduce(
  (acc, item) => acc + item.precio * item.cantidad,
  0
);

const signature = fakePaymentSignature(workerData.items || []);

parentPort.postMessage({
  ok: true,
  estado: 'pagado',
  total: Number(total.toFixed(2)),
  firma: signature,
  orderId: `ORD-${Date.now()}`
});



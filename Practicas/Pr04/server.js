import cluster from 'cluster';
import os from 'os';
import app from './src/app.js';

const PORT = 3000;
const numCPUs = os.cpus().length;

if (process.env.USE_CLUSTER === 'true' && cluster.isPrimary) {
  console.log(`Master ${process.pid} levantando ${numCPUs} workers`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} cayó. Reiniciando...`);
    cluster.fork();
  });
} else {
  app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT} (pid ${process.pid})`);
  });
}
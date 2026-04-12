import { workerData, parentPort } from "worker_threads";

const { numeros } = workerData;

const resultado = numeros.reduce((acc, n) => acc + n, 0);

parentPort.portMessage({resultado});

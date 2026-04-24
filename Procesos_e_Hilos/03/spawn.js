import {spawn} from 'child_process';

const procesoPing = spawn('ping', ['google.com']);
let contador = 0;

procesoPing.stdout.on('data', (pedacito) => {
    console.log(`Recibido: ${pedacito.toString()}`);
    contador += 1;

    if(contador >= 10){
        procesoPing.kill("SIGTERM");
    }
});

procesoPing.on('close', (codigo) => {
    console.log(`El proceso terminó con código ${codigo}`);
});

procesoPing.stderr.on('data', (data) => {
    console.error(`Error en el hijo: ${data}`);
});


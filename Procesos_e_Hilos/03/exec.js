import {exec} from 'child_process';

exec('ls -la', (error, stdout, stderr) => {
   if (error) {
	   console.error(`Error al ejecutar: ${error.message}`);
	   return;
   }
   if (stderr) {
	   console.error(`Avisos del sistema: ${stderr}`);
	   return;
   }
   console.log(`Resultado del comando:\n${stdout}`);
});


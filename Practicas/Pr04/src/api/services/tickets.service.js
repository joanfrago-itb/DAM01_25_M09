import { exec, spawn } from 'child_process';
import { fileURLToPath } from 'url';

export function generarTicketPdf(orderId) {
  const mode = process.env.PDF_MODE || 'spawn';

  // Convertimos URL → path real del sistema
  const scriptPath = fileURLToPath(
    new URL('../process/ticket-pdf.js', import.meta.url)
  );

  if (mode === 'exec') {
    return new Promise((resolve, reject) => {
      exec(`node "${scriptPath}" ${orderId}`, (err, stdout, stderr) => {
        if (err) return reject(new Error(stderr || err.message));
        resolve(stdout);
      });
    });
  }

  return new Promise((resolve, reject) => {
    const child = spawn('node', [scriptPath, orderId]);

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
        return reject(new Error(error || 'Error generando ticket'));
      }
      resolve(output);
    });

    child.on('error', err => {
      reject(err);
    });
  });
}
const orderId = process.argv[2] || 'SIN-ID';

let content = `TICKET ${orderId}\n`;
for (let i = 0; i < 5000; i++) {
  content += `Línea ${i} - detalle ampliado del pedido\n`;
}

process.stdout.write(content);
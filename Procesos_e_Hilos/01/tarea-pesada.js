//console.log("tarea pesada" + resultado);
process.stderr.write("Tarea pesada arrancada\n");
const lista = process.argv[2] ? JSON.parse(process.argv[2]) : [];
const resultado = lista.reduce((acc, n) => acc + n, 0);
process.stderr.write("resultado: " + resultado + "\n");
process.stdout.write(JSON.stringify({ resultado }));

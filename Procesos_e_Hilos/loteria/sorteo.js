process.stderr.write("Sorteo started...");

const userName = process.argv[2] ? JSON.parse(process.argv[2]) : "" ;
const result = false;

let i = 0;
while(i++ < 10_000_000_000);

process.stderr.write("Result: "+result+"\n");
process.stdout.write(JSON.stringify({result}));

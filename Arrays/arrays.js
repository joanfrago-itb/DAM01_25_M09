function ex1(){
	let notas = [3.4, 7.9, 8.0, 2.5, 5.6, 5.4, 9.0];

    // NOTA MEDIA
	let notaMedia = notas.reduce((total, nota) => total+nota, 0) / notas.length;
    console.log("Nota media -> " + notaMedia);

    // PRIMERA NOTA SUPERIOR A 5
    let primerAprobado = notas.find(nota => nota > 5);
    console.log("Primer aprobado -> " + primerAprobado);

    // NOTAS SOBRE 20
    let notas20 = notas.map(nota => nota*2);
    console.log("Notas sobre 20 -> " + notas20);
}

let coches = [
    ["seat","Codoba",1997,10000],
    ["Kia","Sorento",1994,1000],
    ["seat","Todelo",2000,10000],
    ["Fiat","Bravo",2010,10200],
    ["Fiat","500",2010,10000],
    ["Mercedes","Calse B",2001,39000],  
    ["seat","Ibiza",1993,10100],
    ["Alfa Romeo","Julieta",2002,10000],
    ["Alfa Romeo","159",2002,10400],
    ["Mercedes","Calse C",2001,1000],  
    ["Alfa Romeo","147",1990,10500],
    ["Fiat","Punto",1990,999],
    ["Citroen","Saxo",1980,10300],
    ["Renault","Superc 5",1980,12000],
    ["BWM","M3",2020,1000],
    ["Kia","Picanto",1990,1000],
    ["Alfa Romeo","spider",1970,14500],
    ["Mercedes","Calse A",1994,60100],  
    ["Mercedes","Calse D",2011,21221]  
];

function exCoches(){
    // Vehículos que:
    //      no sean ni 'Alfa Romeo' ni 'Kia'
    //      que tengan más de 20 años 
    let cochesv1 = coches.filter(coche => 
       coche[0] != "Alfa Romeo" && coche[0] != "Kia" && coche[2] < 2006
    );
    console.log(cochesv1);

    // Ordena el array por precio descendentemente.
    let cochesv2 = coches;
    cochesv2 = cochesv2.sort((a, b) => {
        return a[3]>b[3] ? -1:1;
    });
    console.log(cochesv2);

    // array con un 20% de rebaja al precio
    let cochesv3 = coches.map(coche => {
        coche[3] -= coche[3]*0.20;
        return coche;
    });
    console.log(cochesv3);
}

ex1();
exCoches();
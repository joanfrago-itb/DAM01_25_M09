function saludar(nombre, saludo="Hola"){
    return saludo + " " + nombre;
}

function calcular(num1, num2, operacion="+"){
    switch(operacion){
        case "+": return num1 + num2;
        case "-": return num1 - num2;
        case "*": return num1 * num2;
        case "/": return num1 / num2;
        default:  return -1;
    }
}

function calcularPromedio(){
    let resultat = 0;
    for(let x of arguments){
        resultat += x;
    }
    resultat /= arguments.length;
    return resultat;
}

function concatenarNombres(){
    let nombres = "";
    for(let nombre of arguments){
        nombres += nombre + ", "
    }
    nombres = nombres.substring(0,nombres.length-2);
    return nombres;
}

console.log(saludar("Joan"));
console.log(calcular(3, 2));
console.log(calcular(3, 2, "*"));
console.log(calcularPromedio(10, 8, 6, 5, 7, 9));
console.log(concatenarNombres("hola","hola","llll","hjdfis","jiogfd","543jkj"))

function sumarParells(numeros){
    let suma = 0;
    for(let x of numeros){
        if(x%2==0) suma += x;
    }
    return suma;
}


function filterWords(paraules){
    for(let i in paraules){
        if(paraules[i][0]=="Z") paraules.splice(i,1);
    }
    return paraules;
}

console.log(sumarParells([2,4,5,6,7,8,3,1,10,4]));

console.log(((alumne) => {
    let nom = alumne.pop();
    alumne.unshift(nom);

    let mitja = 0;
    for(let i=2; i<alumne.length; i++){
        mitja += parseInt(alumne[i]);
    }
    mitja /= alumne.length-2;
    alumne.push(mitja);
    return alumne;
})(["Rodriguez", "8", 9, '5',4, 'Clara']));

console.log(filterWords(["León", "Zebra", "Gacela"]));
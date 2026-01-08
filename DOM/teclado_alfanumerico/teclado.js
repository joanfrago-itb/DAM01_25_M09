let teclado = document.getElementById("teclado-alfabetico");

let asciiA = 65;
let asciiZ = 90;

let vocals = [65,69,73,79,85];

for(let i = asciiA; i<=asciiZ; i++){
    let tecla = document.createElement('div');
    let num = document.createElement('p');
    num.innerHTML = String.fromCharCode(i);

    let classe = "tecla";
    if(i)

    tecla.className = classe;
    tecla.appendChild(num);

    teclado.appendChild(tecla);
}
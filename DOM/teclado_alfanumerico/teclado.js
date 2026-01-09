function tecladoAlfanumerico(){
    let teclado = document.getElementById("teclado-alfabetico");
    for(let i = asciiA; i<=asciiZ; i++){
        createLletra(teclado, i);
    }
}

function tecladoNumerico(){
    for(let i = 1; i<10; i++){
        createTecla(i);
    }
    createTecla(0);
}

function createTecla(content){
    let tecla = document.createElement('div');
    let num = document.createElement('p');
    num.textContent = content;

    let classe = "tecla num";
    if((i+1)%2==0) classe += " parell"

    tecla.className = classe;
    tecla.appendChild(num);

    tecladoNumerico.appendChild(tecla);
}

function createLletra(content){
    let asciiA = 65;
    let asciiZ = 90;

    let vocals = [65,69,73,79,85];

    let tecla = document.createElement('div');
    let num = document.createElement('p');
    num.innerHTML = String.fromCharCode(content);

    let classe = "tecla";
    for(let j=0;j<vocals.length;j++){
        if(vocals[j] == i){
            classe += " vocal"
        }
    }

    tecla.className = classe;
    tecla.appendChild(num);

    teclado.appendChild(tecla);
}
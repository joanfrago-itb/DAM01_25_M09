let tablero = document.getElementById("tablero");

for(let i = 0; i<64; i++){
    let celda = document.createElement('div');
    let letra = document.createElement('p');
    if(i <= 16){
        letra.textContent = "O";
    }else if(i >= 49){
        letra.textContent = "X"
    }

    let classe = "celda";
    if((i+1)%2==0) classe += " numParell"

    celda.className = classe;
    celda.appendChild(letra);

    tablero.appendChild(letra);
}
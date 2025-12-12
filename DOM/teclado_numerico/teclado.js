let teclado = document.getElementById("teclado-numerico");

for(let i = 0; i<20; i++){
    let tecla = document.createElement('div');
    let num = document.createElement('p');
    num.innerHTML = `${i+1}`;

    let classe = "tecla";
    if((i+1)%2==0) classe += " numParell"

    tecla.className = classe;
    tecla.appendChild(num);

    teclado.appendChild(tecla);
}
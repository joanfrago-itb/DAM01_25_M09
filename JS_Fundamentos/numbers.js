function exercici1(){
    let resultat = document.getElementById("resultat-num-1");

    let num = numeroMesGran(2, 10);
    resultat.textContent = num;
}

function numeroMesGran(num1, num2){
    if(num1>num2) return num1;
    return num2;
}

function exercici2(){
    let resultat = document.getElementById("resultat-num-2");

    let num = multiplicarDosNumeros(4, 3);
    resultat.textContent = num;
}

function multiplicarDosNumeros(num1, num2){
    let resultat = 0;
    for(let i = 0; i<num1; i++){
        resultat += num2;
    }
    return resultat;
}

function exercici3(){
    let resultat = document.getElementById("resultat-num-3");

    let num = multiplicarTresNumeros(2, 4, 2);
    resultat.textContent = num;
}

function multiplicarTresNumeros(num1, num2, num3){
    let resultat = 0;
    resultat = multiplicarDosNumeros(num1, num2);
    resultat = multiplicarDosNumeros(num3, resultat);
    return resultat;
}

function exercici4(){
    let resultat = document.getElementById("resultat-num-4");

    let notaMitja = calcularMitjana(2.45, 4, 9.75);
    resultat.textContent = notaMitja;
}

function calcularMitjana(nota1, nota2, nota3){
    let resultat = nota1 + nota2 + nota3;
    resultat /= 3;

    resultat = resultat.toFixed(1);
    return resultat;
}

function exercici5(){
    let resultat = document.getElementById("resultat-num-5");

    for(let i=0; i<10000; i++){
        let sNum = i.toString();

        let sumaCubos = 0;
        for(let j=0; j<sNum.length; j++){
            let nNum = parseInt(sNum[j]);
            nNum = nNum * nNum * nNum;
            sumaCubos+=nNum;
        }

        if(sumaCubos == i){
            resultat.innerHTML += `<p>${i}</p>`;
        }
    }
}

function exercici6(){
    let resultat = document.getElementById("resultat-num-6");

    let cubo = cuboAlert(4);
    resultat.textContent = cubo
}

function cuboAlert(num){
    if(!Number.isInteger(num)){
        alert("El número no és un enter.");
        return false;
    }
    else{
        return num*num*num;
    }
}

exercici1();
exercici2();
exercici3();
exercici4();
exercici5();
exercici6();
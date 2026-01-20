function exercici1(){
    let resultat = document.getElementById("resultat-str-1");

    let novaCadena = separarVocalsDeConsonants("hola com estas");

    resultat.textContent = novaCadena;
}

function separarVocalsDeConsonants(cadena){
    let vocals = [65,69,73,79,85];

    let resultat = "";
    let resultatConsonants = "";

    for(let i=0; i<cadena.length; i++){
        if(vocals.includes(cadena.toUpperCase.charCodeAt(i))) resultat += cadena[i];
        else resultatConsonants += cadena[i];
    }

    resultat += resultatConsonants;
    return resultat;
}

exercici1();
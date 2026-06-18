console.log("Hola")
/*
if (true){
    var edad = 25;
}


if(true){
    let puntos = 100;
    console.log(puntos);
}

const PI = 3.1416;
pi = 3.14;

const user = {id : 1};
user.id = 2;


const miVariable = {
    nombre = "Jose",
    version = 2026
};


const tamano = v8.serialize (miVariable).length;

console.log( `El tamaño de la variable es: ${tamano} bytes`) 
*/

/*const readline = require("readline/promises")

const { stdin: input, stdout: output} = require("process");

const rl = readline.createInterface({input, output});

async function iniciar(){
    const nombre = await rl.question("Digite su nombre: ")
    if (validadDatos(nombre)) {
        console.log(`El nombre digitado es: ${nombre}`);
    }else{
        console.log("Lo que digitaste no son letras")
    }

    rl.close();
    
}

function validarDatos(nombre){
    const expresion = /^[a-zA-Z]+$/;
    const nombreValidado = expresion.test(nombre);
    if(nombreValidado){
        return true;
    }else{
        return false
    }
}

iniciar();1-12,,13-17,18
*/

let edad = 85;
let estado;

if (edad<=12 & edad>0 ){
    estado = "Niño";
} else if (edad>=13 & edad<=17){
    estado = "Joven";
} else if (edad>18){
    estado = "Adulto";
}

let edad = 85;


const categoria = edad >= 1 && edad <=12? "Niño": edad<= 17? "Joven":"Adulto";
console.log(categoría);






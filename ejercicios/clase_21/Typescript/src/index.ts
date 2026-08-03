console.log("Hola companera");
console.log("Hola companero");
console.log("Hola compa");

//Explicito
let nombre: string = "Hola bebe";


//Implicito
let nombreDos = "Shakira"


function saludar(nombre:string): void{
    console.log(`Hola ${nombre}`);
}

function sumar(a:number, b:number): number{
    return a+b;
}

function restar(a:number, b:number, c?:number): number{
    return a-b-(c||0);
}

console.log(restar(10, 5, 2));

import {Estudiante} from "./Estudiante";
import {Pato} from "./Pato";

let estudiante = new Estudiante(205550666, "Pepe", "Angulo", 22);
let pato = new Pato("Blanco", "Domestico","Cuaccuac", "Lucas");

estudiante.matricular();
pato.patoInfo();
pato.comer("insectos");
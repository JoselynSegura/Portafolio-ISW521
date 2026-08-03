"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Hola companera");
console.log("Hola companero");
console.log("Hola compa");
//Explicito
let nombre = "Hola bebe";
//Implicito
let nombreDos = "Shakira";
function saludar(nombre) {
    console.log(`Hola ${nombre}`);
}
function sumar(a, b) {
    return a + b;
}
function restar(a, b, c) {
    return a - b - (c || 0);
}
console.log(restar(10, 5, 2));
const Estudiante_1 = require("./Estudiante");
const Pato_1 = require("./Pato");
let estudiante = new Estudiante_1.Estudiante(205550666, "Pepe", "Angulo", 22);
let pato = new Pato_1.Pato("Blanco", "Domestico", "Cuaccuac", "Lucas");
estudiante.matricular();
pato.patoInfo();
pato.comer("insectos");
//# sourceMappingURL=index.js.map
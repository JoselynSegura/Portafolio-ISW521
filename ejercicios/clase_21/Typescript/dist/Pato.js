"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pato = void 0;
const Ave_1 = require("./Ave");
class Pato extends Ave_1.Ave {
    nombre;
    constructor(color, especie, sonido, nombre) {
        super(color, especie, sonido);
        this.nombre = nombre;
    }
    patoInfo() {
        console.log(`El nombre del pato es: ${this.nombre} especie: ${this.especie} color: ${this.color} sonido: ${this.sonido}`);
    }
}
exports.Pato = Pato;
//# sourceMappingURL=Pato.js.map
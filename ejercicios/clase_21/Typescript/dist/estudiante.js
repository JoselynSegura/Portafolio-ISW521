"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estudiante = void 0;
class Estudiante {
    cedula;
    nombre;
    primer_apellido;
    edad;
    constructor(cedula, nombre, primer_apellido, edad) {
        this.cedula = cedula;
        this.nombre = nombre;
        this.primer_apellido = primer_apellido;
        this.edad = edad;
    }
    matricular() {
        console.log(`La cedula es: ${this.cedula} nombre: ${this.nombre} apellido: ${this.primer_apellido} edad: ${this.edad}`);
    }
}
exports.Estudiante = Estudiante;
//# sourceMappingURL=Estudiante.js.map
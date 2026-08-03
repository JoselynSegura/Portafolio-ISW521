"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ave = void 0;
class Ave {
    color;
    especie;
    sonido;
    constructor(color, especie, sonido) {
        this.color = color;
        this.especie = especie;
        this.sonido = sonido;
    }
    comer(alimento) {
        console.log(`El ave está comiendo ${alimento}`);
    }
}
exports.Ave = Ave;
//# sourceMappingURL=Ave.js.map
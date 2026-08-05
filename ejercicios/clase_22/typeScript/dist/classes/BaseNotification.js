"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseNotification = void 0;
//base de una notificación
class BaseNotification {
    recipient;
    message;
    constructor(recipient, message) {
        this.recipient = recipient;
        this.message = message;
    }
    //log tiene todos los registros. Año, mes día
    logNotification(type) {
        console.log(`[Log - ${new Date().toISOString}] Iniciando envio de ${type} a ${this.recipient}`);
    }
}
exports.BaseNotification = BaseNotification;
//# sourceMappingURL=BaseNotification.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
class NotificationService {
    processNotification(notifications) {
        console.log("Analizando notificaciones por bloques\n\n");
        for (const notification of notifications) {
            notification.send();
        }
        console.log("Finalización del bloque de notificaciones\n\n");
    }
}
exports.NotificationService = NotificationService;
//# sourceMappingURL=NotificationService.js.map
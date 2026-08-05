import { INotification } from "../interfaces/INotification";

export class NotificationService{

    public processNotification(notifications: INotification[]): void {
        console.log("Analizando notificaciones por bloques\n\n");
        for(const notification of notifications){
            notification.send();
        }
        console.log("Finalización del bloque de notificaciones\n\n");
    }
}
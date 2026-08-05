import { BaseNotification } from "./BaseNotification";
export class SmsNotification extends BaseNotification{
    send(): void {
        this.logNotification("Sms");
        console.log(`Enviando sms del nuemero: ${this.recipient}`);
        console.log(`Mensaje: ${this.message}`);
    }
}
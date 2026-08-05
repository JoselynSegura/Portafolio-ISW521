import { INotification } from "./interfaces/INotification";
import { EmailNotification } from "./classes/EmailNotification";
import { SmsNotification } from "./classes/SmsNotification";
import { NotificationService } from "./services/NotificationService";


const email = new EmailNotification("prueba@gmail.com","Hola ISW-521","Prueba");
const sms = new SmsNotification ("+5066666666","Recibiendo pinn: 4563");
const queue: INotification[] = [email, sms];
const services = new NotificationService();

services.processNotification(queue);
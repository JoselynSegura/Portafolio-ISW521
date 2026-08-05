"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmailNotification_1 = require("./classes/EmailNotification");
const SmsNotification_1 = require("./classes/SmsNotification");
const NotificationService_1 = require("./services/NotificationService");
const email = new EmailNotification_1.EmailNotification("prueba@gmail.com", "Hola ISW-521", "Prueba");
const sms = new SmsNotification_1.SmsNotification("+5066666666", "Recibiendo pinn: 4563");
const queue = [email, sms];
const services = new NotificationService_1.NotificationService();
services.processNotification(queue);
//# sourceMappingURL=index.js.map
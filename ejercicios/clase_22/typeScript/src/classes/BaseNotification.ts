import { INotification } from "../interfaces/INotification";
//base de una notificación
export abstract class BaseNotification implements INotification {

    constructor(public readonly recipient:string, public readonly message:string){
    }
//log tiene todos los registros. Año, mes día
    protected logNotification(type:string):void{
        console.log(
            `[Log - ${new Date().toISOString}] Iniciando envio de ${type} a ${this.recipient}`
        );
    }
    abstract send():void;
}

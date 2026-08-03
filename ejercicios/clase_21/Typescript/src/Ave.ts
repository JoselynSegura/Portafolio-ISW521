export class Ave{
    color : string;
    especie : string;
    sonido : string;
    

    constructor(color:string, especie:string, sonido:string){
        this.color = color;
        this.especie =  especie;
        this.sonido =  sonido;
    }

    comer(alimento:string):void{
        console.log(`El ave está comiendo ${alimento}`);
    }

    

}
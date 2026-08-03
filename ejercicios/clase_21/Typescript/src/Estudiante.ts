export class Estudiante{

    cedula: number;
    nombre:string;
    primer_apellido:string;
    edad: number;
    


constructor(
    cedula:number, nombre:string, primer_apellido:string, edad:number
){
    this.cedula = cedula;
    this.nombre = nombre;
    this.primer_apellido = primer_apellido;
    this.edad = edad;
}

    matricular():void{
        console.log(`La cedula es: ${this.cedula} nombre: ${this.nombre} apellido: ${this.primer_apellido} edad: ${this.edad}`);
    }

}
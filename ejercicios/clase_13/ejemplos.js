/*function exterior() {
    const mensaje = "hola desde fuera";
    function interior() {
        console.log(mensaje); //visible por ámbito léxico
    }
    interior ();
}

exterior(); //"hola desde afuera"
*/

/*
const persona = {nombre: "pepe", edad: 50};
const {edad: anos = 21} = persona;
console.log(edad);
*/

/*function sumarTodo(...numeros){
    return numeros.reduce((acum, n) => acum + n, 0);
}

console.log(sumarTodo(1,2,3));
console.log(sumarTodo(5,10,15,20));
*/

//Signo ?? reacciona  a indifenido o null

/*
const descuento = 0;

console.log(descuento || 10);
console.log(descuento ?? 10);

const nombre = "";
console.log(nombre || "Invitado");
console.log(nombre ?? "invitado");

*/

class CuentaBancaria {
    constructor (saldoInicial){
        this._saldo = saldoInicial;
    }
    get saldo() {
        return this._saldo;
    }
    set saldo(valor){
        if (valor < 0) throw new Error("Saldo no puede  ser negativo");
    }
}

const cuenta = new CuentaBancaria(1000);
cuenta.saldo = 1500;
console.log(cuenta.saldo); 
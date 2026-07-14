/*
const numeros =[40,34,5,8,100,6];

console.log(numeros.sort((a,b) => a - b));

let arr = ["a","b","c"];
arr[7]="z";
console.log(arr);
*/

const precios = [100, 250, 80, 400];
const caros = [];
for (let i = 0; i < precios.length; i++) {
    if (precios[i] > 150) {
        caros.push(precios[i]);
    }
}
console.log(caros);

//el bucle filtra
//El método correcto declarativo es el filter:
//El bucle hace lo mismo que el filter, pero con menos código 
const caros2 = precios.filter(precio => precio > 150);
console.log(caros2);
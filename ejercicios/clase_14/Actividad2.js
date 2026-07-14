const estudiantes = [
    {nombre: "Ana", carnet: 2024001},
    {nombre: "Luis", carnet: 2024002},
];

//El dato de cada objeto se necesitan en el resultado es el nombre, por lo que se puede usar map para obtener un arreglo con los nombres de los estudiantes
//Un String se puede convertir en mayuscula con el método toUpperCase()
const nombres = estudiantes.map(e => `${e.nombre} (${e.carnet})`.toUpperCase());
console.log(nombres);
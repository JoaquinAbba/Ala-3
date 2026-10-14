import promptSync from "prompt-sync";
import { mostrarMenu, agregarTarea, buscarTareas, listaTareas } from "./funciones.js";
const prompt = promptSync();
const tareas = [];
const fechaActual = new Date();
const fecha = [
    fechaActual.getDate(),
    fechaActual.getMonth() + 1, //porq getmonth[0] = enero
    fechaActual.getFullYear()
];
let tareaABuscar = "";
let opcion = -1;
const nombre = prompt("Ingrese su nombre: ") ?? "Usuario";
console.log(`Hola ${nombre}, la fecha de hoy es: ${fecha[0]}/${fecha[1]}/${fecha[2]}`);
do {
    mostrarMenu();
    do {
        opcion = Number(prompt("Ingrese su opción: "));
        if (opcion !== 0 && opcion !== 1 && opcion !== 2 && opcion !== 3) {
            console.log("Opción no valida");
        }
    } while (opcion !== 0 && opcion !== 1 && opcion !== 2 && opcion !== 3);
    switch (opcion) {
        case 1:
            listaTareas(tareas, fecha);
            break;
        case 2:
            tareaABuscar = prompt("Ingrese el título de la tarea a buscar: ") ?? "";
            buscarTareas(tareaABuscar, tareas, fecha);
            break;
        case 3:
            agregarTarea(tareas, fecha);
            break;
    }
} while (opcion !== 0);
console.log("Fin del programa.");
//# sourceMappingURL=main.js.map
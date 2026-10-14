import promptSync from "prompt-sync";
import { ListaTareas } from "./Tarea";
import { pedirEntero, mostrarMenu, agregarTarea, buscarTareas, listaTareas } from "./Funciones";

const prompt = promptSync();

const lista = new ListaTareas();
const fechaActual = new Date();
const fecha = [
    fechaActual.getDate(),
    fechaActual.getMonth() + 1, // GETMONTH[0] = ENERO,  ENERO = 0, ENTONCES POR ESO ES + 1 
    fechaActual.getFullYear()
];

const nombre = prompt("Ingrese su nombre: ") ?? "Usuario";

console.log(`Hola ${nombre}, la fecha de hoy es: ${fecha[0]}/${fecha[1]}/${fecha[2]}`);

let opcion = -1;

do {
    mostrarMenu();

    opcion = pedirEntero("Ingrese su opción: ", 0, 3, "Opción no valida");

    switch (opcion) {
        case 1:
            listaTareas(lista, fecha);
            break;

        case 2:
            const tareaABuscar = prompt("Ingrese el título de la tarea a buscar: ") ?? "";
            buscarTareas(tareaABuscar, lista, fecha);
            break;

        case 3:
            agregarTarea(lista, fecha);
            break;
    }
} while (opcion !== 0);

console.log("Fin del programa.");
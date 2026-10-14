import promptSync from "prompt-sync";
import { Tarea, ListaTareas } from "./Tarea"; 

const prompt = promptSync();

//VERIFICA SI ES UN NUMERO ENTERO O NO
export function pedirEntero(mensaje: string, min: number, max: number, mensajeError: string): number {
    let valor = -1;

    do {
        valor = Number(prompt(mensaje));



        if (isNaN(valor) || valor % 1 !== 0 || valor < min || valor > max) { 
            console.log(mensajeError);
        }
    } while (isNaN(valor) || valor % 1 !== 0 || valor < min || valor > max);

    return valor;
}

//PREGUNTA S/N Y DEVUELVE TRUE SI RESPONDIO "S"
function pedirSiNo(mensaje: string): boolean {
    let respuesta = "";

    do {
        respuesta = (prompt(mensaje) ?? "").toLowerCase();

        if (respuesta !== "s" && respuesta !== "n") {
            console.log("Respuesta no válida.");
        }
    } while (respuesta !== "s" && respuesta !== "n");

    return respuesta === "s";
}


function pedirVto(tarea: Tarea) {
    const vto = [0, 0, 0];

    do {
        vto[0] = Number(prompt("Ingrese el dia: "));
        vto[1] = Number(prompt("Ingrese el mes del año: "));
        vto[2] = Number(prompt("Ingrese el año: "));

        tarea.setVto(vto);
    } while (
        tarea.getVto()[0] !== vto[0] ||
        tarea.getVto()[1] !== vto[1] ||
        tarea.getVto()[2] !== vto[2]
    );
}


//MENU
export function mostrarMenu() {
    console.log("¿Qué opción desea utilizar?");
    console.log("[1] Ver mis tareas");
    console.log("[2] Buscar una tarea");
    console.log("[3] Agregar una tarea");
    console.log("[0] Salir");
}


//SELECCION TAREA
function elegirYMostrarDetalle(tareas: Tarea[], fecha: number[]) {
    for (let i = 0; i < tareas.length; i++) {
        console.log(`[${i + 1}] ${tareas[i].getTitulo()}`);
    }

    const opcion = pedirEntero("\nSeleccione la tarea de la que desee ver su detalle, o en caso de querer regresar, presione 0: ", 0, tareas.length,  "Error: Selección no válida.");

    if (opcion === 0) {
        console.log("Volviendo al menú principal...");
        return;
    }

    detalleTarea(tareas[opcion - 1], fecha);
}


export function mostrarTodasTareas(filtro: number, lista: ListaTareas, fecha: number[]) {
    let tareas: Tarea[];

    
    if (filtro === -1) {
        tareas = lista.getTodas();
    } else {
        tareas = lista.filtrarPorEstado(filtro);
    }

    if (tareas.length === 0) {
        console.log("No hay tareas para mostrar.");
        return;
    }

    if (filtro === 1) {
        console.log("Tareas del estado: Pendiente");
    } else if (filtro === 2) {
        console.log("Tareas del estado: En curso");
    } else if (filtro === 3) {
        console.log("Tareas del estado: Terminadas");
    }

    elegirYMostrarDetalle(tareas, fecha);
}

export function detalleTarea(tarea: Tarea, fecha: number[]) {
    console.log("Detalles de la tarea seleccionada:");
    console.log(tarea.detalle());

    console.log("Desea editar la tarea? Presione 1 para editar, Presione 0 para volver ");
    const rta = pedirEntero("Opción:", 0, 1, "Error: Respuesta no válida.");

    if (rta === 1) {
        editarTarea(tarea, fecha);
    }
}


//EDITARTAREAS
export function editarTarea(tarea: Tarea, fecha: number[]) {
    let nuevoTitulo = "";
    let nuevaDescripcion = "";
    let nuevoEstado = "";
    let nuevaDificultad = "";
    let respuestaVto = "";

    console.log(`Está editando la tarea ${tarea.getTitulo()}`);
    console.log("- Si desea mantener los valores de un atributo, dejelo en blanco");
    console.log("- Si desea dejar en blanco un atributo, escriba un espacio");

    //TITULO (obligatorio: el setter no acepta un título vacío)
    do {
        nuevoTitulo = prompt("1. Ingrese el Titulo: ") ?? "";

        if (nuevoTitulo !== "") {
            tarea.setTitulo(nuevoTitulo);
        }
    } while (nuevoTitulo !== "" && tarea.getTitulo() !== nuevoTitulo);

    //DESCRIPCION
    do {
        nuevaDescripcion = prompt("2. Ingrese la descripción: ") ?? "";

        if (nuevaDescripcion === " ") {
            tarea.setDescripcion("");
        } else if (nuevaDescripcion !== "") {
            tarea.setDescripcion(nuevaDescripcion);
        }
    } while (nuevaDescripcion !== "" && nuevaDescripcion !== " " && tarea.getDescripcion() !== nuevaDescripcion);

    //ESTADO (obligatorio)
    do {
        nuevoEstado = prompt("3. Estado de la tarea ([1] Pendiente / [2] En curso / [3] Terminada): ") ?? "";

        if (nuevoEstado === " ") {
            console.log("Error: el estado es obligatorio.");
        } else if (nuevoEstado !== "") {
            tarea.setEstado(Number(nuevoEstado));
        }
    } while (nuevoEstado === " " || (nuevoEstado !== "" && tarea.getEstado() !== Number(nuevoEstado)));

    //DIFICULTAD (un espacio la deja sin definir)
    do {
        nuevaDificultad = prompt("4. Nivel de dificultad ([1] Facil / [2] Medio / [3] Dificil): ") ?? "";

        if (nuevaDificultad === " ") {
            tarea.setDificultad(0);
        } else if (nuevaDificultad !== "") {
            tarea.setDificultad(Number(nuevaDificultad));
        }
    } while (nuevaDificultad !== "" && nuevaDificultad !== " " && tarea.getDificultad() !== Number(nuevaDificultad));

    //FECHA DE VENCIMIENTO
    do {
        respuestaVto = prompt("5. Presione 1 si quiere cambiar la fecha de vencimiento: ") ?? "";

        if (respuestaVto === "1") {
            pedirVto(tarea);
        } else if (respuestaVto === " ") {
            tarea.setVto([0, 0, 0]);
        } else if (respuestaVto !== "") {
            console.log("Respuesta no válida.");
        }
    } while (respuestaVto !== "" && respuestaVto !== " " && respuestaVto !== "1");

    tarea.setUltimaEdicion(fecha);
    console.log("Tarea editada correctamente, volviendo al menú principal...");
}

export function agregarTarea(lista: ListaTareas, fecha: number[]) {

    const tarea = new Tarea(fecha);

    let titulo = "";
    let descripcion = "";
    let estado = 0;
    let dificultad = 0;

    console.log("Está creando una nueva tarea.");

    //TITULO
    do {
        titulo = prompt("1. Ingrese el Titulo: ") ?? "";
        tarea.setTitulo(titulo);
        
    } while (titulo === "" || tarea.getTitulo() !== titulo);

    //DESCRIPCIÓN
    if (pedirSiNo("2. ¿Desea ingresar una descripción? (s/n): ")) {
        do {
            descripcion = prompt("Ingrese la descripción: ") ?? "";

            if (descripcion.trim() === "") {
                console.log("Error: debe completar la descripción.");
            } else {
                tarea.setDescripcion(descripcion);
            }
        } while (descripcion.trim() === "" || tarea.getDescripcion() !== descripcion);
    }

    //ESTADO 
    do {
        estado = Number(prompt("3. Estado de la tarea ([1] Pendiente / [2] En curso / [3] Terminada): "));

        if (estado === 0) {
            estado = 1;
        }

        tarea.setEstado(estado);
    } while (tarea.getEstado() !== estado);

    //FECHA DE VENCIMIENTO
    if (pedirSiNo("4. ¿Desea ingresar la fecha de vencimiento? (s/n): ")) {
        pedirVto(tarea);
    }

    //DIFICULTAD
    if (pedirSiNo("5. ¿Desea agregarle un nivel de dificultad? (s/n): ")) {
        do {
            dificultad = Number(prompt("Los niveles de dificultad son: [1] Facil / [2] Medio / [3] Dificil \nSeleccione su dificultad: "));

            if (dificultad === 0) {
                console.log("Error: seleccione 1, 2 o 3.");
            } else {
                tarea.setDificultad(dificultad);
            }
        } while (dificultad === 0 || tarea.getDificultad() !== dificultad);
    }

    lista.agregar(tarea);

    console.log("Tarea creada con éxito, redirigiendo al menú principal...");
}


export function buscarTareas(busqueda: string, lista: ListaTareas, fecha: number[]) {
    const resultados = lista.buscarPorTitulo(busqueda);

    if (resultados.length === 0) {
        console.log("No se encontraron tareas con ese título.");
        return;
    }

    elegirYMostrarDetalle(resultados, fecha);
}


export function listaTareas(lista: ListaTareas, fecha: number[]) {
    console.log("¿Qué tareas desea ver?");
    console.log("[1] Todas\n[2] Pendientes\n[3] En curso\n[4] Terminadas\n[0] Volver");

    const opcion = pedirEntero("Opción: ", 0, 4, "Error: Opción no válida.");

    switch (opcion) {
        case 1:
            mostrarTodasTareas(-1, lista, fecha);
            break;
        case 2:
            mostrarTodasTareas(1, lista, fecha);
            break;
        case 3:
            mostrarTodasTareas(2, lista, fecha);
            break;
        case 4:
            mostrarTodasTareas(3, lista, fecha);
            break;
        case 0:
            console.log("Volviendo al menú principal...");
            break;
    }
}
import promptSync from "prompt-sync";
const prompt = promptSync();
export function mostrarMenu() {
    console.log("¿Qué opción desea utilizar?");
    console.log("[1] Ver mis tareas");
    console.log("[2] Buscar una tarea");
    console.log("[3] Agregar una tarea");
    console.log("[0] Salir");
}
export function mostrarTodasTareas(filtro, tareas, fecha) {
    let tareasAMostrar;
    let opcionTarea = -1;
    //TODAS
    if (filtro === -1) {
        tareasAMostrar = tareas;
    }
    else {
        tareasAMostrar = tareas.filter((t) => t.estado === filtro);
    }
    if (tareasAMostrar.length === 0) {
        console.log("No hay tareas para mostrar.");
        return;
    }
    //POR ESTADO
    if (filtro === 1) {
        console.log("Tareas del estado: Pendiente");
    }
    else if (filtro === 2) {
        console.log("Tareas del estado: En curso");
    }
    else if (filtro === 3) {
        console.log("Tareas del estado: Terminadas");
    }
    for (let i = 0; i < tareasAMostrar.length; i++) {
        console.log(`[${i + 1}] ${tareasAMostrar[i].titulo}`);
    }
    console.log("\nSeleccione la tarea de la que desee ver su detalle, o en caso de querer regresar, presione 0:");
    do {
        opcionTarea = Number(prompt("Opción: "));
        if (opcionTarea < 0 || opcionTarea > tareasAMostrar.length || isNaN(opcionTarea)) {
            console.log("Error: Selección no válida.");
        }
        else if (opcionTarea === 0) {
            console.log("Volviendo al menú principal...");
            return;
        }
        else {
            const tareaElegida = tareasAMostrar[opcionTarea - 1];
            const indiceReal = tareas.indexOf(tareaElegida);
            detalleTarea(indiceReal, tareas, fecha);
        }
    } while (opcionTarea < 0 || opcionTarea > tareasAMostrar.length || isNaN(opcionTarea));
}
export function detalleTarea(i, tareas, fecha) {
    const tareaActual = tareas[i];
    console.log("Detalles de la tarea seleccionada:");
    console.log(`${tareaActual.titulo}`);
    console.log(`${tareaActual.descripcion}`);
    //ESTADO
    if (tareaActual.estado === 1) {
        console.log("Estado:   Pendiente");
    }
    else if (tareaActual.estado === 2) {
        console.log("Estado:   En curso");
    }
    else if (tareaActual.estado === 3) {
        console.log("Estado:   Terminado");
    }
    //DIFICULTAD
    if (tareaActual.dificultad === 1 || tareaActual.dificultad === 0) {
        console.log("Dificultad:   ★☆☆");
    }
    else if (tareaActual.dificultad === 2) {
        console.log("Dificultad:   ★★☆");
    }
    else if (tareaActual.dificultad === 3) {
        console.log("Dificultad:   ★★★");
    }
    console.log(`Creación:         ${tareaActual.creacion[0]}/${tareaActual.creacion[1]}/${tareaActual.creacion[2]}`);
    console.log(`Ultima edición:   ${tareaActual.ultimaEdicion[0]}/${tareaActual.ultimaEdicion[1]}/${tareaActual.ultimaEdicion[2]}`);
    console.log(`Vencimiento:      ${tareaActual.vto[0]}/${tareaActual.vto[1]}/${tareaActual.vto[2]}`);
    let rta = -1;
    console.log("Desea editar la tarea? Presione 1 para editar, Presione 0 para volver ");
    do {
        rta = Number(prompt("Opción:"));
        if (rta !== 0 && rta !== 1) {
            console.log("Error: Respuesta no válida.");
        }
        if (rta === 0) {
            return;
        }
    } while (rta !== 0 && rta !== 1);
    editarTarea(i, tareas, fecha);
}
export function editarTarea(i, tareas, fecha) {
    const tareaActual = tareas[i];
    let nuevoTitulo = "";
    let nuevaDescripcion = "";
    let nuevoEstado = "";
    let nuevaDificultad = "";
    let nuevoVto = [0, 0, 0];
    let respuestaVto = "";
    console.log(`Está editando la tarea ${tareaActual.titulo}`);
    console.log("- Si desea mantener los valores de un atributo, dejelo en blanco");
    console.log("- Si desea dejar en blanco un atributo, escriba un espacio");
    //TITULO
    do {
        nuevoTitulo = prompt("1. Ingrese el Titulo: ") ?? "";
        if (nuevoTitulo === " ") {
            console.log("Error: El titulo es obligatorio.");
        }
        if (nuevoTitulo.length > 100) {
            console.log("Error: el título debe ser más corto.");
        }
    } while (nuevoTitulo === " " || nuevoTitulo.length > 100);
    //DESCRIPCION
    do {
        nuevaDescripcion = prompt("2. Ingrese la descripción: ") ?? "";
        if (nuevaDescripcion.length > 500) {
            console.log("Error: la descripción debe ser más corta.");
        }
    } while (nuevaDescripcion.length > 500);
    //ESTADO
    do {
        nuevoEstado = prompt("3. Estado de la tarea ([1] Pendiente / [2] En curso / [3] Terminada: ") ?? "";
        if (nuevoEstado === " ") {
            console.log("Error: el estado es obligatorio.");
        }
        else if (nuevoEstado !== "1" && nuevoEstado !== "2" && nuevoEstado !== "3" && nuevoEstado !== "") {
            console.log("Error: Respuesta no válida.");
        }
    } while (nuevoEstado !== "1" && nuevoEstado !== "2" && nuevoEstado !== "3" && nuevoEstado !== "");
    //DIFICULTAD
    do {
        nuevaDificultad = prompt("4. Nivel de dificultad ([1] Facil / [2] Medio / [3] Dificil): ") ?? "";
        if (nuevaDificultad === " ") {
            console.log("Error: la dificultad es obligatoria.");
        }
        else if (nuevaDificultad !== "1" && nuevaDificultad !== "2" && nuevaDificultad !== "3" && nuevaDificultad !== "") {
            console.log("Error: Respuesta no válida.");
        }
    } while (nuevaDificultad !== "1" && nuevaDificultad !== "2" && nuevaDificultad !== "3" && nuevaDificultad !== " " && nuevaDificultad !== "");
    //FECHA VTO
    do {
        respuestaVto = prompt("5. Presione 1 si quiere cambiar la fecha de vencimiento: ") ?? "";
        if (respuestaVto === "1") {
            do {
                nuevoVto[0] = Number(prompt("Ingrese el dia: "));
                if (nuevoVto[0] < 1 || nuevoVto[0] > 31) {
                    console.log("No es un día válido (1-31).");
                }
            } while (nuevoVto[0] < 1 || nuevoVto[0] > 31);
            do {
                nuevoVto[1] = Number(prompt("Ingrese el mes del año: "));
                if (nuevoVto[1] < 1 || nuevoVto[1] > 12) {
                    console.log("No es un mes válido (1-12).");
                }
            } while (nuevoVto[1] < 1 || nuevoVto[1] > 12);
            do {
                nuevoVto[2] = Number(prompt("Ingrese el año: "));
                if (nuevoVto[2] < 2026 || nuevoVto[2] > 2030) {
                    console.log("No es un año válido (2026-2030).");
                }
            } while (nuevoVto[2] < 2026 || nuevoVto[2] > 2030);
        }
        else if (respuestaVto === " ") {
            nuevoVto = [0, 0, 0];
        }
        else if (respuestaVto === "") {
            // nada
        }
        else {
            console.log("Respuesta no válida.");
        }
    } while (respuestaVto !== "" && respuestaVto !== " " && respuestaVto !== "1");
    //CAMBIO DE TAREAS 
    if (nuevoTitulo !== "") {
        tareaActual.titulo = nuevoTitulo;
    }
    if (nuevaDescripcion !== "") {
        tareaActual.descripcion = nuevaDescripcion;
    }
    if (nuevoEstado !== "") {
        tareaActual.estado = Number(nuevoEstado);
    }
    if (nuevaDificultad !== "") {
        tareaActual.dificultad = Number(nuevaDificultad);
    }
    if (respuestaVto !== "") {
        tareaActual.vto = nuevoVto;
    }
    tareaActual.ultimaEdicion = [...fecha]; //esto es para que se cree el array con la fecha del momento y no se modifique la original.
    console.log("Tarea editada correctamente, volviendo al menú principal...");
}
export function agregarTarea(tareas, fecha) {
    let titulo = "";
    let descripcion = "";
    let respuestaDescripcion = "";
    let estado = 0;
    let vto = [0, 0, 0];
    let respuestaVto = "";
    let dificultad = 0;
    let respuestaDificultad = "";
    console.log("Está creando una nueva tarea.");
    //TITULO
    do {
        titulo = prompt("1. Ingrese el Titulo: ") ?? "";
        if (titulo.trim() === "") {
            console.log("El titulo no puede estar vacío.");
        }
        else if (titulo.length > 100) {
            console.log("Error: el título debe ser más corto.");
        }
    } while (titulo.trim() === "" || titulo.length > 100);
    //DESCRIPCIÓN
    do {
        respuestaDescripcion = prompt("2. ¿Desea ingresar una descripción? (s/n): ") ?? "";
        if (respuestaDescripcion === "s" || respuestaDescripcion === "S") {
            do {
                descripcion = prompt("Ingrese la descripción: ") ?? "";
                if (descripcion.length > 500) {
                    console.log("Error: la descripción debe ser más corta.");
                }
                if (descripcion.length <= 0) {
                    console.log("Error: debe completar la descripción.");
                }
            } while (descripcion.length <= 0 || descripcion.length > 500);
        }
        else if (respuestaDescripcion === "n" || respuestaDescripcion === "N") {
            descripcion = "";
        }
        else {
            console.log("Respuesta no válida.");
        }
    } while (respuestaDescripcion !== "s" && respuestaDescripcion !== "S" && respuestaDescripcion !== "n" && respuestaDescripcion !== "N");
    //ESTADO
    do {
        estado = Number(prompt("3. Estado de la tarea ([1] Pendiente / [2] En curso / [3] Terminada:"));
    } while (estado !== 0 && estado !== 1 && estado !== 2 && estado !== 3);
    if (estado === 0) {
        estado = 1;
    }
    //FECHA VENCIMIENTO
    do {
        respuestaVto = prompt("4. ¿Desea ingresar la fecha de vencimiento? (s/n): ") ?? "";
        if (respuestaVto === "s" || respuestaVto === "S") {
            do {
                vto[0] = Number(prompt("Ingrese el dia: "));
                if (vto[0] < 1 || vto[0] > 31) {
                    console.log("No es un día válido (1-31).");
                }
            } while (vto[0] < 1 || vto[0] > 31);
            do {
                vto[1] = Number(prompt("Ingrese el mes del año: "));
                if (vto[1] < 1 || vto[1] > 12) {
                    console.log("No es un mes válido (1-12).");
                }
            } while (vto[1] < 1 || vto[1] > 12);
            do {
                vto[2] = Number(prompt("Ingrese el año: "));
                if (vto[2] < 2026 || vto[2] > 2030) {
                    console.log("No es un año válido (2026-2030).");
                }
            } while (vto[2] < 2026 || vto[2] > 2030);
        }
        else if (respuestaVto === "n" || respuestaVto === "N") {
            vto = [0, 0, 0];
        }
        else {
            console.log("Respuesta no válida.");
        }
    } while (respuestaVto !== "s" && respuestaVto !== "S" && respuestaVto !== "n" && respuestaVto !== "N");
    //DIFICULTAD
    do {
        respuestaDificultad = prompt("5. ¿Desea agregarle un nivel de dificultad? (s/n): ") ?? "";
        if (respuestaDificultad === "s" || respuestaDificultad === "S") {
            do {
                dificultad = Number(prompt("Los niveles de dificultad son: [1] Facil / [2] Medio / [3] Dificil \nSeleccione su dificultad: "));
                if (dificultad < 1 || dificultad > 3 || isNaN(dificultad)) {
                    console.log("Respuesta no válida.");
                }
            } while (dificultad < 1 || dificultad > 3 || isNaN(dificultad));
        }
        else if (respuestaDificultad === "n" || respuestaDificultad === "N") {
            dificultad = 0;
        }
        else {
            console.log("Respuesta no válida.");
        }
    } while (respuestaDificultad !== "s" && respuestaDificultad !== "S" && respuestaDificultad !== "n" && respuestaDificultad !== "N");
    tareas.push({
        titulo,
        descripcion,
        estado,
        creacion: [...fecha],
        ultimaEdicion: [...fecha],
        vto,
        dificultad,
    });
    console.log("Tarea creada con éxito, redirigiendo al menú principal...");
}
export function buscarTareas(busqueda, tareas, fecha) {
    const resultados = tareas.filter((t) => t.titulo.includes(busqueda));
    if (resultados.length === 0) {
        console.log("No se encontraron tareas con ese título.");
        return;
    }
    for (let i = 0; i < resultados.length; i++) {
        console.log(`[${i + 1}] ${resultados[i].titulo}`);
    }
    let opcionTarea = -1;
    do {
        opcionTarea = Number(prompt("\nSeleccione la tarea de la que desee ver su detalle, o en caso de querer regresar, presione 0: "));
        if (opcionTarea < 0 || opcionTarea > resultados.length || isNaN(opcionTarea)) {
            console.log("Error: Selección no válida.");
        }
        else if (opcionTarea === 0) {
            console.log("Volviendo al menú principal...");
            return;
        }
        else {
            const tareaElegida = resultados[opcionTarea - 1];
            const indiceReal = tareas.indexOf(tareaElegida);
            detalleTarea(indiceReal, tareas, fecha);
        }
    } while (opcionTarea < 0 || opcionTarea > resultados.length || isNaN(opcionTarea));
}
export function listaTareas(tareas, fecha) {
    let opcion = -1;
    console.log("¿Qué tareas desea ver?");
    console.log("[1] Todas\n[2] Pendientes\n[3] En curso\n[4] Terminadas\n[0] Volver");
    do {
        opcion = Number(prompt("Opción: "));
        if (opcion < 0 || opcion > 4 || isNaN(opcion)) {
            console.log("Error: Opción no válida.");
        }
    } while (opcion < 0 || opcion > 4 || isNaN(opcion));
    switch (opcion) {
        case 1:
            mostrarTodasTareas(-1, tareas, fecha);
            break;
        case 2:
            mostrarTodasTareas(1, tareas, fecha);
            break;
        case 3:
            mostrarTodasTareas(2, tareas, fecha);
            break;
        case 4:
            mostrarTodasTareas(3, tareas, fecha);
            break;
        case 0:
            console.log("Volviendo al menú principal...");
            break;
    }
}
//# sourceMappingURL=funciones.js.map
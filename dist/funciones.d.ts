export interface Tarea {
    titulo: string;
    descripcion: string;
    estado: number;
    creacion: number[];
    ultimaEdicion: number[];
    vto: number[];
    dificultad: number;
}
export declare function mostrarMenu(): void;
export declare function mostrarTodasTareas(filtro: number, tareas: Tarea[], fecha: number[]): void;
export declare function detalleTarea(i: number, tareas: Tarea[], fecha: number[]): void;
export declare function editarTarea(i: number, tareas: Tarea[], fecha: number[]): void;
export declare function agregarTarea(tareas: Tarea[], fecha: number[]): void;
export declare function buscarTareas(busqueda: string, tareas: Tarea[], fecha: number[]): void;
export declare function listaTareas(tareas: Tarea[], fecha: number[]): void;
//# sourceMappingURL=funciones.d.ts.map
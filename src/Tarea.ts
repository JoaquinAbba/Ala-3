export class Tarea {
    
    private titulo = "";
    private descripcion = "";
    private estado = 1;
    private creacion: number[] = [0, 0, 0];
    private ultimaEdicion: number[] = [0, 0, 0];
    private vto: number[] = [0, 0, 0];
    private dificultad = 0;


    constructor(fechaCreacion: number[]) {
        this.creacion = [...fechaCreacion];
        this.ultimaEdicion = [...fechaCreacion];
    }

    
//GETTERS
    getTitulo(): string {
        return this.titulo;
    }

    getDescripcion(): string {
        return this.descripcion;
    }

    getEstado(): number {
        return this.estado;
    }

    getDificultad(): number {
        return this.dificultad;
    }

    getCreacion(): number[] {
        return [...this.creacion];
    }

    getUltimaEdicion(): number[] {
        return [...this.ultimaEdicion];
    }

    getVto(): number[] {
        return [...this.vto];
    }

    getEstadoTexto(): string {
        if (this.estado === 1) {
            return "Pendiente";
        }
        if (this.estado === 2) {
            return "En curso";
        }
        return "Terminado";
    }

    getDificultadTexto(): string {
        if (this.dificultad === 2) {
            return "★★☆";
        }
        if (this.dificultad === 3) {
            return "★★★";
        }
        return "★☆☆"; 
    }

//SETTERS
    setTitulo(titulo: string): void {
        if (titulo.trim() === "") {
            console.log("Error: el título no puede estar vacío.");
        } else if (titulo.length > 100) {
            console.log("Error: el título debe ser más corto (máximo 100 caracteres).");
        } else {
            this.titulo = titulo;
        }
    }

    setDescripcion(descripcion: string): void {
        if (descripcion.length > 500) {
            console.log("Error: la descripción debe ser más corta (máximo 500 caracteres).");
        } else {
            this.descripcion = descripcion;
        }
    }

    setEstado(estado: number): void {
        if (estado !== 1 && estado !== 2 && estado !== 3) {
            console.log("Error: el estado debe ser 1 (Pendiente), 2 (En curso) o 3 (Terminada).");
        } else {
            this.estado = estado;
        }
    }

    setDificultad(dificultad: number): void {
        // 0 significa "sin definir"
        if (isNaN(dificultad) || dificultad < 0 || dificultad > 3) {
            console.log("Error: la dificultad debe ser 0 (sin definir), 1, 2 o 3.");
        } else {
            this.dificultad = dificultad;
        }
    }

    setVto(vto: number[]): void {
        
        if (vto[0] === 0 && vto[1] === 0 && vto[2] === 0) {
            this.vto = [0, 0, 0];
        } else if (isNaN(vto[0]) || vto[0] < 1 || vto[0] > 31) {
            console.log("Error: no es un día válido (1-31).");
        } else if (isNaN(vto[1]) || vto[1] < 1 || vto[1] > 12) {
            console.log("Error: no es un mes válido (1-12).");
        } else if (isNaN(vto[2]) || vto[2] < 2026 || vto[2] > 2030) {
            console.log("Error: no es un año válido (2026-2030).");
        } else {
            this.vto = [...vto];
        }
    }

    setUltimaEdicion(fecha: number[]): void {
        this.ultimaEdicion = [...fecha];
    }


    

    detalle(): string {
        return this.titulo + "\n" + this.descripcion  + "\n" + `Estado:   ${this.getEstadoTexto()}`  + "\n" + `Dificultad:   ${this.getDificultadTexto()}`  + "\n" + `Creación:         ${this.creacion[0]}/${this.creacion[1]}/${this.creacion[2]}`  + "\n" + `Ultima edición:   ${this.ultimaEdicion[0]}/${this.ultimaEdicion[1]}/${this.ultimaEdicion[2]}`  + "\n" + `Vencimiento:      ${this.vto[0]}/${this.vto[1]}/${this.vto[2]}`
    
    }
}


export class ListaTareas {
    private tareas: Tarea[] = [];

    agregar(tarea: Tarea): void {
        this.tareas.push(tarea);
    }

    getTodas(): Tarea[] {
        return [...this.tareas];
    }

    filtrarPorEstado(estado: number): Tarea[] {
        return this.tareas.filter((t) => t.getEstado() === estado);
    }

    buscarPorTitulo(busqueda: string): Tarea[] {
        const busquedaMinuscula = busqueda.toLowerCase(); //ES PARA PASAR TODO A MINUSCULAS (MAYUS->MINUS)
        return this.tareas.filter((t) => t.getTitulo().toLowerCase().includes(busquedaMinuscula));
    }
}
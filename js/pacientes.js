class Paciente {
    constructor(nombre, edad, raza, especie, tutor,servicio,id=crypto.randomUUID() ) {
        this.id=id;
        this.nombre = nombre;
        this.edad = edad;
        this.raza = raza;
        this.especie = especie;
        this.tutor = tutor;
        this.servicio= servicio;
        this.historial = "sin historial medico";
    }

    actualizarHistorial(nuevoRegistro) {
        this.historial = nuevoRegistro
    }
}

const paciente1 = new Paciente("Curcuma", 7, "mestizo", "perro", "Nancy");
const paciente2 = new Paciente("Curky", 5, "chihuahua", "perro", "Lucas");
const paciente3 = new Paciente("Manuelita", 80, "tortuga", "reptil", "Barbara");
const paciente4 = new Paciente("Poly", 4, "mestizo", "gato", "Nancy");
const paciente5 = new Paciente("Luna", 3, "mestizo", "perro", "Lucas");

const pacienteDeMuestra = [paciente1, paciente2, paciente3, paciente4, paciente5];
function obtenerPaciente(){
    
try {  const pacienteStorage = localStorage.getItem(`datosPaciente`)
    return pacienteStorage ? JSON.parse(pacienteStorage): pacienteDeMuestra;
}catch(error){console.log("Error al leer datosPaciente de LocalStorage: " + error)
    return pacienteDeMuestra

}finally{console.log("Inicializacion de lista de pacientes completa.")}

}

function guardarPaciente(lista){
    const PacienteJson = JSON.stringify(lista);
    localStorage.setItem(`datosPaciente`,PacienteJson);
}
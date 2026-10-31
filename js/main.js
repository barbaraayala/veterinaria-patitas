const contenedorPaciente = document.getElementById("contenedorPaciente");
const formPaciente= document.getElementById("formPaciente");
const mensajeRegistro= document.getElementById("mensajeRegistro");
const inputBuscar= document.getElementById("inputBuscar");
const btnLimpiarStorage= document.getElementById("btnLimpiarStorage");
const selectServicio= document.getElementById("selectServicio"); 

let listaDePacientes = obtenerPaciente();

function vaciarStorage(){

    localStorage.removeItem("datosPaciente");
    listaDePacientes=[]
    mostrarPacientes(listaDePacientes)
}


function mostrarPacientes(lista) {

    contenedorPaciente.innerHTML = "";

    lista.forEach((paciente) => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("card")
        const {nombre, edad, raza, especie, tutor,servicio, historial, id}=paciente
        tarjeta.innerHTML = `<h3>${nombre}</h3>
                             <p>Edad: ${edad}</p>
                             <p>Raza:${raza}</p>
                             <p>Especie: ${especie}</p>
                             <p>Tutor: ${tutor}</p>
                             <p>Servicio: ${servicio? servicio:"Consulta general"}</p>
                             <p class="historial">Historial: ${historial? historial : "Sin historial médico"}</p>
                             <input type="text" class="input-historial" placeholder="Nuevo diagnóstico">
                             <button class="btn-historial btn">Modificar Historial</button>
                             <button class="btn-eliminar btn"> Eliminar Paciente </button>
                             `
        const btn= tarjeta.querySelector(".btn-historial");
        const btnEliminar=tarjeta.querySelector(".btn-eliminar")
        const inputHistorial = tarjeta.querySelector(".input-historial");
        const parrafoHistorial = tarjeta.querySelector(".historial");

        btnEliminar.addEventListener("click",()=>{


            listaDePacientes=listaDePacientes.filter(p=>p.id !== id);

            guardarPaciente(listaDePacientes);

            mostrarPacientes(listaDePacientes);

        })

        btn.addEventListener("click",()=>{
            const textoHistorial=inputHistorial.value.trim();

            if(textoHistorial!==""){
                paciente.historial = textoHistorial;
                parrafoHistorial.textContent=`Historial: ${textoHistorial}`;
                inputHistorial.value="";
            }

            guardarPaciente(listaDePacientes);
        })
        
        contenedorPaciente.appendChild(tarjeta);
    })

}
mostrarPacientes(listaDePacientes);

async function cargarServicio(){

    try{
        const respuesta = await fetch ("../data/servicios.json");

        if (!respuesta.ok){
            throw new Error("No se pudo cargar el archivo servicos");
        }
        const servicios=await respuesta.json();
        servicios.forEach((item)=>{

            const opcion =document.createElement("option");
            opcion.value= item.nombre;
            opcion.textContent=`${item.nombre} ($${item.precio})`;
            selectServicio.appendChild(opcion);

        });
    }catch (error){
        console.log("error al obtener servicios:", error);
        Toastify({
            text:"No se pudo cargar los servicios disponibles",
            duration:3000,
            style:{
                 background: "linear-gradient(to right, #bcf5ee, #f1a4bb)",
                 color:"#262929"
            }
        }).showToast();
    } finally{
        console.log("Proceso de carga de servicio finalizado")
    }
}
cargarServicio();

formPaciente.addEventListener("submit",(e)=>{
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const edad= Number(document.getElementById("edad").value);
    const raza = document.getElementById("raza").value.trim();
    const especie= document.getElementById("especie").value.trim();
    const tutor= document.getElementById("tutor").value.trim();
    const servicio= selectServicio.value;

    const nuevoPaciente = new Paciente (nombre,edad,raza,especie ,tutor,servicio );
    listaDePacientes.push(nuevoPaciente);
       guardarPaciente(listaDePacientes);

            Toastify({
            text:`${nuevoPaciente.nombre} fue agregado con exito `,
            duration:4000,
            gravity:"top",
            position:"center",
            style:{
                background:"linear-gradient(to right, #E0FCFF, #FFE0E0)",
                color:"#26292B"
            }
        }).showToast(); 
      

    

    mostrarPacientes(listaDePacientes);
     formPaciente.reset();

});

inputBuscar.addEventListener("input", ()=>{
    const textoInput = inputBuscar.value.toLowerCase().trim();

    const pacienteFiltrado =listaDePacientes.filter(({nombre, tutor})=>{
        const datos =`${nombre} ${tutor}`.toLowerCase();
        return datos.includes(textoInput);
    });
    pacienteFiltrado.length>0 ? mostrarPacientes(pacienteFiltrado):
    (contenedorPaciente.innerHTML="<p> No se encontro coincidencia. </p>");
});

btnLimpiarStorage.addEventListener("click", () => {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Se eliminarán todos los pacientes registrados.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, vaciar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            vaciarStorage();
        }
    });
});



setTimeout(() => {
    Toastify({
        text: `📋 Tenés ${listaDePacientes.length} pacientes registrados en el sistema`,
        duration: 4000,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(to right, #bcf5ee, #f1a4bb)",
            color:"#262929"
        }
    }).showToast();
}, 2000);
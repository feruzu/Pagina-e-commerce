//----------------Validacion de formulario---------------//



// Variables
const botonEnviar = document.querySelector('#boton-enviar');
const formulario = document.querySelector('.formulario');

// Variables para campos
const nombre = document.querySelector('#nombre');
const tel= document.querySelector('#tel');
const correo = document.querySelector('#correo');
const mensaje = document.querySelector('#mensaje');
const er = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;



eventListeners();
function eventListeners() {
    // Cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);


    // Campos del formulario
    nombre.addEventListener('input', validarFormulario);
    tel.addEventListener('input', validarFormulario);
    correo.addEventListener('input', validarFormulario);
    mensaje.addEventListener('keyup', validarFormulario);


    // Enviar email
    formulario.addEventListener('submit', enviarEmail);
}


// Funciones
function iniciarApp() {
    botonEnviar.disabled = true;
    botonEnviar.classList.add('boton-enviar');
}


// Valida el Formulario
function validarFormulario(e) {

    
    if(e.target.value.length > 0) {

        // Elimina los errores
        const error = document.querySelector('.error');
        if(error){
            error.remove();
        }

        e.target.classList.remove('error')
        e.target.classList.add('correcto');
        
    }else{
        e.target.classList.remove('correcto');
        e.target.classList.add('vacio');
        botonEnviar.classList.remove('boton-habilitado');
        

        mostrarError('Todos los campos son obligatorios');
    }

    if(e.target.type === 'email'){
        if(er.test(e.target.value )){
            const error = document.querySelector('.error');
            if(error){
                error.remove();
            }
            e.target.classList.remove('error');
            e.target.classList.add('correcto');
        }else{
            e.target.classList.remove('correcto');
            e.target.classList.add('vacio');
            mostrarError('Email no válido')
        }
    }


    if(er.test(correo.value) && nombre.value !== '' && mensaje.value !== '' && tel.value !== '') {
        console.log('Pasaste la validacion');
        botonEnviar.disabled = false;
        botonEnviar.classList.add('boton-habilitado'); 
    }  

}

 function mostrarError(mensaje) {
     const mensajeError = document.createElement('p');
     mensajeError.textContent = mensaje;
     mensajeError.classList.add('error');

     const errores = document.querySelectorAll('.error');
     if(errores.length === 0){
         formulario.appendChild(mensajeError);
     }

   
}

// Enviar email
function enviarEmail(e) {
    e.preventDefault();

    // Mostrar load 
    const load = document.querySelector('#load');
    load.style.display = 'block';

    // Ocultar el load y mostrar el mensaje
    setTimeout(() => {
        load.style.display = 'none';


    // Msj envio correctamente    
    const parrafo = document.createElement('p');
    parrafo.textContent = 'Mensaje enviado correctamente';
    
        
    const form = document.querySelector('.contenedor-campos');

    
        setTimeout( () => {
            parrafo.remove();
            resetearFormulario();
            
        }, 4000);
    form.after(parrafo, load);
    }, 3000 );
}


function resetearFormulario() {
    formulario.reset();
    eliminarBordes();    
}

 function eliminarBordes() {
    nombre.classList.remove('correcto', 'vacio');
    tel.classList.remove('correcto', 'vacio');
    correo.classList.remove('correcto', 'vacio');
    mensaje.classList.remove('correcto', 'vacio');
    botonEnviar.disabled = true;
    botonEnviar.classList.remove('boton-habilitado', 'vacio');
    
   
}
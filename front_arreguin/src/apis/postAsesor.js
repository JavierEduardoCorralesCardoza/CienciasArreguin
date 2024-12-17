import API_URL from '../utils/config.js';

function postAsesor(event) {

    const data = {
        correo_asesor: event.target.asesorCorreo.value,
        contrasena_asesor: event.target.asesorContraseña.value,
        nombre_asesor: event.target.asesorNombre.value,
        imagen_asesor: event.target.asesorFoto.value,
    };
    
    fetch(`${API_URL}/asesores`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

export default postAsesor;
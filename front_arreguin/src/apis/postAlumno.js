import API_URL from '../utils/config.js';

function postAlumno(event) {

    const data = {
        correo_alumno: event.target.alumnmoCorreo.value,
        contrasena_alumno: event.target.alumnmoContraseña.value,
        nombre_alumno: event.target.alumnmoNombre.value,
        imagen_alumno: event.target.alumnmoFoto.value,
    };
    
    fetch(`${API_URL}/alumnos`, {
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

export default postAlumno;
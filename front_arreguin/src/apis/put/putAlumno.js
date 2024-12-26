import API_URL from '../../utils/config.js';

function putAlumno(event, id) {

    const data = {
        correoAlumno: event.target.alumnmoCorreo.value,
        contrasenaAlumno: event.target.alumnmoContraseña.value,
        nombreAlumno: event.target.alumnmoNombre.value,
        imagenAlumno: event.target.alumnmoFoto.value,
    };
    
    fetch(`${API_URL}/alumnos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

export default putAlumno;
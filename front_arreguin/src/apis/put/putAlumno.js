import API_URL from '../../utils/config.js';

function putAlumno(event, id) {

    const data = {
        correoAlumno: event.target.correoAlumno.value,
        contrasenaAlumno: event.target.correoAlumno.value,
        nombreAlumno: event.target.correoAlumno.value,
        imagenAlumno: event.target.correoAlumno.value,
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
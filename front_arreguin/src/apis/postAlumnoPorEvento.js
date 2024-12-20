import API_URL from '../utils/config.js';

function postAlumnoPorEvento(event) {

    const data = {
        resultadoAlumnoPorEvento: event.target.alumnmoPorEventoResultado.value,
        idAlumnoEvento: event.target.alumnoEventoId.value,
        idEventoAlumno: event.target.eventoAlumnoId.value,
    };
    
    fetch(`${API_URL}/alumno_por_evento`, {
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

export default postAlumnoPorEvento;
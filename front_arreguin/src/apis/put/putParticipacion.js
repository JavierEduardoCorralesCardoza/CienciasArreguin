import API_URL from "../../utils/config";

function putParticipacion(event, id) {
    
    const data = {
        idAlumnoParticipacion: { idAlumno: event.target.idAlumnoParticipacion.value},
        idAsesorParticipacion: { idAsesor: event.target.idAsesorParticipacion.value},
        idEventoParticipacion: { idEvento: event.target.idEventoParticipacion.value},
        idProyectoParticipacion: { idProyecto: event.target.idProyectoParticipacion.value},
        idApoyoAlumnoParticipacion: { idApoyo: event.target.idApoyoAlumnoParticipacion.value},
        idApoyoAsesorParticipacion: { idApoyo: event.target.idApoyoAsesorParticipacion.value}
    };
    
    fetch(`${API_URL}/participaciones/${id}`, {
        method: 'PUT',
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

export default putParticipacion;
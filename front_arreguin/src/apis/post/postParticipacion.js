import API_URL from "../../utils/config";

function postParticipacion(event) {

    const data = {
        idAlumnoParticipacion: { idAlumno: event.target.alumnoParticipacionId.value},
        idAsesorParticipacion: { idAsesor: event.target.asesorParticipacionId.value},
        idEventoParticipacion: { idEvento: event.target.eventoParticipacionId.value},
        idProyectoParticipacion: { idProyecto: event.target.proyectoParticipacionId.value},
        idApoyoAlumnoParticipacion: { idApoyo: event.target.apoyoAlumnoParticipacionId.value},
        idApoyoAsesorParticipacion: { idApoyo: event.target.apoyoAsesorParticipacionId.value},
    };
    
    fetch(`${API_URL}/participaciones`, {
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

export default postParticipacion;
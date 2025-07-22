import API_URL from "../../utils/config";
import apiService from "../apiService.js";

async function putParticipacion(event, id) {

    const data = {
        idAlumnoParticipacion: { idAlumno: event.target.idAlumnoParticipacion.value},
        idAsesorParticipacion: { idAsesor: event.target.idAsesorParticipacion.value},
        idEventoParticipacion: { idEvento: event.target.idEventoParticipacion.value},
        idProyectoParticipacion: { idProyecto: event.target.idProyectoParticipacion.value},
        idApoyoAlumnoParticipacion: { idApoyo: event.target.idApoyoAlumnoParticipacion.value},
        idApoyoAsesorParticipacion: { idApoyo: event.target.idApoyoAsesorParticipacion.value}
    };

    try {
        const response = await apiService.put(`/participaciones/${id}`, data);
        return response;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export default putParticipacion;
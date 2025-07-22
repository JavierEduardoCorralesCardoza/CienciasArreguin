import apiService from "../apiService.js";

async function putAlumno(event, id) {

    const data = {
        correoAlumno: event.target.correoAlumno.value,
        contrasenaAlumno: event.target.correoAlumno.value,
        nombreAlumno: event.target.correoAlumno.value,
        imagenAlumno: event.target.correoAlumno.value,
    };

    try {
        const response = await apiService.put(`/alumnos/${id}`, data);
        return response;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export default putAlumno;
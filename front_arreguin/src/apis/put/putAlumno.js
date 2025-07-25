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
        
        // Mostrar alert específico para errores de correo duplicado
        if (error.type === 'VALIDATION_ERROR' || error.status === 400) {
            alert(error.message || 'Error: El correo ya está en uso');
        } else if (error.type === 'NETWORK_ERROR') {
            alert('Error de conexión. Verifique su conexión a internet.');
        } else {
            alert('Error al actualizar el asesor: ' + error.message);
        }
        
        throw error;
    }
}

export default putAlumno;
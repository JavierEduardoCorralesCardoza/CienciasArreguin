import apiService from '../apiService.js';

async function postAlumno(event) {

    try {
        const data = {
            correoAlumno: event.target.alumnmoCorreo.value,
            contrasenaAlumno: event.target.alumnmoContraseña.value,
            nombreAlumno: event.target.alumnmoNombre.value,
            imagenAlumno: event.target.alumnmoFoto.value,
        };

        const response = await apiService.post('/alumnos', data);
        return response;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export default postAlumno;
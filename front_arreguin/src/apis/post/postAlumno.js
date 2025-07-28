import apiService from '../apiService.js';

async function postAlumno(event) {
    
    const fileInput = event.target.alumnmoFoto;
    const file = fileInput?.files?.[0] ?? null;

    const formData = new FormData();
    formData.append('correoAlumno', event.target.alumnmoCorreo.value);
    formData.append('contrasenaAlumno', event.target.alumnmoContraseña.value);
    formData.append('nombreAlumno', event.target.alumnmoNombre.value);
    
    if (file) {
        formData.append('image', file);
    }

    try {
        const response = await apiService.request('/alumnos', {
            method: 'POST',
            body: formData,
            auth: true,
            isFormData: true
        });
        return response;
    } catch (error) {
        console.error('Error al crear alumno:', error);
        throw new Error(`Error al crear el alumno: ${error.message || 'Error desconocido'}`);
    }
}

export default postAlumno;
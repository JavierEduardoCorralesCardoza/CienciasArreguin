import apiService from '../apiService.js';

async function postAlumno(event) {
    const fileInput = event.target.alumnmoFoto;
    const file = fileInput?.files?.[0] ?? null;
    console.log('Archivo seleccionado:', file);

    let imagenAlumno = null;

    if (file) {
        try {
            const formData = new FormData();
            formData.append('image', file);
            
            const imageResponse = await apiService.request('/alumnos/image', {
                method: 'POST',
                body: formData,
                auth: true,
                isFormData: true // Ensure proper headers are set
            });

            if (!imageResponse || !imageResponse.fileName) {
                throw new Error('No se recibió un nombre de archivo válido del servidor');
            }

            console.log('Imagen subida exitosamente:', imageResponse);
            imagenAlumno = imageResponse.fileName;
        } catch (error) {
            console.error('Error al subir la imagen:', error);
            throw new Error(`Error al subir la imagen: ${error.message || 'Error desconocido'}`);
        }
    }

    // Prepare student data
    const data = {
        correoAlumno: event.target.alumnmoCorreo.value,
        contrasenaAlumno: event.target.alumnmoContraseña.value,
        nombreAlumno: event.target.alumnmoNombre.value,
        imagenAlumno: imagenAlumno
    };

    try {
        const response = await apiService.post('/alumnos', data);
        return response;
    } catch (error) {
        console.error('Error al crear alumno:', error);
        throw new Error(`Error al crear el alumno: ${error.message || 'Error desconocido'}`);
    }
}

export default postAlumno;
import apiService from "../apiService.js";

async function postAsesor(event) {

    const fileInput = event.target.asesorFoto;
    const file = fileInput?.files?.[0] ?? null;
    console.log('Archivo seleccionado:', file);

    let imagenAsesor = null;

    if (file) {
        try {
            const formData = new FormData();
            formData.append('image', file);
            
            const imageResponse = await apiService.request('/asesores/image', {
                method: 'POST',
                body: formData,
                auth: true,
                isFormData: true // Ensure proper headers are set
            });

            if (!imageResponse || !imageResponse.fileName) {
                throw new Error('No se recibió un nombre de archivo válido del servidor');
            }

            console.log('Imagen subida exitosamente:', imageResponse);
            imagenAsesor = imageResponse.fileName;
        } catch (error) {
            console.error('Error al subir la imagen:', error);
            throw new Error(`Error al subir la imagen: ${error.message || 'Error desconocido'}`);
        }
    }

    const data = {
        correoAsesor: event.target.asesorCorreo.value,
        contrasenaAsesor: event.target.asesorContraseña.value,
        nombreAsesor: event.target.asesorNombre.value,
        imagenAsesor: imagenAsesor,
        rolAsesor: "asesor"
    };

    try {
        const response = await apiService.post('/asesores', data);
        console.log('Asesor creado exitosamente:', response);
        return response;
    } catch (error) {
        console.error('Error al crear asesor:', error);
        throw error;
    }
}

export default postAsesor;